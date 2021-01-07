require "graphql"
require_relative "./mutations/create_news"

class MutationType < GraphQL::Schema::Object
  field :createNews, mutation: Mutations::CreateNews
end
