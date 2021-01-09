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

    news = [
      {
        title: "Easter Egg 1",
        body: "Amazing new easter egg found!!!",
      },
      {
        title: "Easter Egg 2",
        body: "An unbelievable easter egg was hiding in plain sight!",
      },
      {
        title: "Easter Egg 3",
        body: "Wow, something incredible was discovered!!!",
      },
    ]

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

    News.create!(news)
    Games.create!(games)
  end

  post "/graphql" do
    result = ApplicationSchema.execute(
      params[:query],
      variables: params[:variables],
      context: { current_user: nil },
    )
    json result
  end
end
