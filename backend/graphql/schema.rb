require "graphql"
require_relative "./types/query"

class ApplicationSchema < GraphQL::Schema
  query QueryType
end
