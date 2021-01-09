require "graphql"
require_relative "./mutations/create_news"

class MutationType < Types::BaseObject
  field :createNews, mutation: Mutations::CreateNews
end
