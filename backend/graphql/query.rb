require "graphql"
require_relative "./types/news"
require_relative "./types/game"
require_relative "./types/user"
require_relative "./resolvers/news_search"

class QueryType < Types::BaseObject
  field :news, [Types::News], null: false, resolver: Resolvers::NewsSearch
  field :games, [Types::Game], null: false
  field :users, [Types::User], null: false

  def news
    News.all
  end

  def games
    Game.all
  end

  def users
    User.all
  end
end
