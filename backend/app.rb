require "sinatra"
require "sinatra/reloader" if development?

class Application < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
  end

  get "/api" do
    "Yay"
  end
end
