require "graphql"
require_relative "base_object"

module Types
  class Games < BaseObject
    description "Games item"

    field :id, ID, null: false
    field :name, String, null: false
  end
end
