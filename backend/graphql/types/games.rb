require "graphql"
require_relative "base_object"

class Types::Games < Types::BaseObject
  description "Games item"

  field :id, ID, null: false
  field :name, String, null: false
end
