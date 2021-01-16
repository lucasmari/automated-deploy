require "jwt"
require "mongoid"
require "rack/contrib"
require "sinatra"
require "sinatra/json"
require "sinatra/reloader" if development?
require "./graphql/schema"
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

    Games.create!(games)
  end

  post "/graphql" do
    variables = params[:variables]
    query = params[:query]
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
    return unless !env["HTTP_AUTHORIZATION"].empty?

    auth_header = env["HTTP_AUTHORIZATION"]
    hashed_token = auth_header.split(" ").last

    begin
      token = JWT.decode(hashed_token, "secret", true, algorithm: "HS256")
    rescue JWT::DecodeError
      [401, { "Content-Type" => "text/plain" }, ["A token must be passed."]]
    rescue JWT::ExpiredSignature
      [403, { "Content-Type" => "text/plain" }, ["The token has expired."]]
    rescue JWT::InvalidIssuerError
      [403, { "Content-Type" => "text/plain" }, ["The token does not have a valid issuer."]]
    rescue JWT::InvalidIatError
      [403, { "Content-Type" => "text/plain" }, ['The token does not have a valid "issued at" time.']]
    end

    user_id = token[0].gsub("user-id:", "")
    User.find(user_id)
  end

  def handle_error_in_development(e)
    # ...
  end
end
