require "mongoid"
require "sinatra"
require "sinatra/reloader" if development?
Dir["./models/*"].each { |file| require file }

Mongoid.load!(File.join(File.dirname(__FILE__), "config", "mongoid.yml"))

class Application < Sinatra::Base
  configure :development do
    register Sinatra::Reloader
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

  get "/api/news" do
    News.all.to_json
  end

  post "/api/news" do
    news = News.create!(params[:news])
    news.to_json
  end

  get "/api/news/:news_id" do |news_id|
    news = News.find(news_id)
    news.attributes.merge(
      comments: news.comments,
    ).to_json
  end

  post "/api/news/:news_id/comments" do |news_id|
    news = News.find(news_id)
    comment = news.comments.create!(params[:comment])
    {}.to_json
  end
end
