require "jwt"
require "mongoid"
require "rack/contrib"
require "sinatra"
require "sinatra/json"
require "sinatra/reloader" if development?
require "vault"
require_relative "./graphql/schema"
Dir["./graphql/types/*"].each { |file| require file }
Dir["./models/*"].each { |file| require file }

Mongoid.load!(File.join(File.dirname(__FILE__), "config", "mongoid.yml"))

class Application < Sinatra::Base
  configure :development do
    register Sinatra::Reloader

    use Rack::JSONBodyParser

    enable :logging
  end

  helpers do
    # Repopulate MongoDB
    Mongoid.purge!

    games = [
      {
        name: "Portal 2",
      },
      {
        name: "No Man's Sky",
      },
      {
        name: "The Stanley Parable",
      },
      {
        name: "Papers, Please",
      },
    ]

    Game.create!(games)

    # Authenticate and configure Vault
    # Vault.auth.token(ENV["VAULT_TOKEN"])

    Vault.configure do |config|
      config.address = ENV["VAULT_ADDR"]
      config.token = ENV["VAULT_TOKEN"]
      config.ssl_verify = false
    end
  end

  post "/graphql" do
    query = params[:query]
    variables = params[:variables]
    context = {
      current_user: current_user,
    }
    result = ApplicationSchema.execute(query, variables: variables, context: context)
    json result
  rescue => e
    raise e unless Sinatra::Base.development?
    handle_error_in_development e
  end

  private

  def current_user
    return if env["HTTP_AUTHORIZATION"].empty?

    Vault.with_retries(Vault::HTTPConnectionError) do
      read_secret = Vault.logical.read("secret")
      puts read_secret.data
    end

    auth_header = env["HTTP_AUTHORIZATION"]
    token = auth_header.split(" ").last

    begin
      decoded_token = JWT.decode(token, "secret", true, algorithm: "HS256")
    rescue JWT::DecodeError
      halt 401, { "Content-Type" => "text/plain" }, "A token must be passed."
    rescue JWT::ExpiredSignature
      halt 403, { "Content-Type" => "text/plain" }, "The token has expired."
    rescue JWT::InvalidIssuerError
      halt 403, { "Content-Type" => "text/plain" }, "The token does not have a valid issuer."
    rescue JWT::InvalidIatError
      halt 403, { "Content-Type" => "text/plain" }, 'The token does not have a valid "issued at" time.'
    end

    user_id = decoded_token[0].gsub("user-id:", "")

    user = User.find(user_id)
    user.nil? ? halt(500, json({ user_not_found: true })) : user
  end

  def handle_error_in_development(e)
    logger.error e.message
    logger.error e.backtrace.join("\n")

    halt 500, json({ error: { message: e.message, backtrace: e.backtrace } })
  end
end
