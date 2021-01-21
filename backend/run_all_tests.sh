#!/bin/bash

# Script for running all tests

docker-compose up -d; 
bundle exec rspec; 
docker-compose down