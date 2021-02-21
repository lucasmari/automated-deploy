#!/bin/bash

docker-compose up -d;
bundle exec rspec --default-path spec/integration;
docker-compose down