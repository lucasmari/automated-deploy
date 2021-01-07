require "graphql"
require_relative "./types/news"

class QueryType < Types::BaseObject
  description "The query root of this schema"

  field :news, [Types::News], null: false do
    description "Get all news"
  end

  def news
    News.all
  end
end
