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
  end

  helpers do
    Mongoid.purge!

    news = [
      {
        title: "Easter egg 1",
        body: "New easter egg found!",
      },
      {
        title: "Easter egg 2",
        body: "Unbelievable easter egg hiding in plain sight!",
      },
    ]

    News.create!(news)
  end

  post "/api/graphql" do
    result = ApplicationSchema.execute(
      params[:query],
      variables: params[:variables],
      context: { current_user: nil },
    )
    json result
  end
end
