require "graphql"
require_relative "./types/news"
require_relative "./types/games"
require_relative "./types/user"

class QueryType < Types::BaseObject
  field :news, [Types::News], null: false
  field :games, [Types::Games], null: false
  field :users, [Types::User], null: false

  def news
    News.all
  end

  def games
    Games.all
  end

  def users
    User.all
  end
end
