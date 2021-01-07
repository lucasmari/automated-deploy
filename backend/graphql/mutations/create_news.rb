require "graphql"
require_relative "base_mutation"

class Mutations::CreateNews < Mutations::BaseMutation
  description "Creates a news"

  argument :title, String, required: true
  argument :body, String, required: true

  field :success, Boolean, null: false
  field :errors, [String], null: false

  def resolve(title:, body:)
    news = News.new(
      title: title,
      body: body,
    )

    if news.save
      {
        success: true,
        errors: [],
      }
    else
      {
        success: false,
        errors: news.errors.full_messages,
      }
    end
  end
end
