require "mongo"
require "sinatra"
require "sinatra/reloader" if development?

class Application < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  get "/api" do
    "Yay"
  end

  get "/api/db" do
    client = Mongo::Client.new(["mongo:27017"], :database => "test")
  end
end
