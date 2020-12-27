require "graphql"
require_relative "base_object"

class Types::News < Types::BaseObject
  description "News item"

  field :id, ID, null: false
  field :title, String, null: false
  field :body, String, null: false
end
