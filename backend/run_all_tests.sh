#!/bin/bash

docker-compose up -d;
bundle exec rspec;
docker-compose down