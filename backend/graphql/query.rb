require "graphql"
require_relative "./types/news"
require_relative "./types/games"

class QueryType < Types::BaseObject
  field :news, [Types::News], null: false
  field :games, [Types::Games], null: false

  def news
    News.all
  end

  def games
    Games.all
  end
end
