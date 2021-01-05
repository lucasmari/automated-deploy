FROM ruby
WORKDIR /home/sinatra/app
RUN bundle config --global frozen 1
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
EXPOSE 4000
CMD ["bundle", "exec", "puma", "-C", "puma.rb"]