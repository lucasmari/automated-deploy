#!/bin/bash

docker-compose -f docker-compose.ci.yml up --exit-code-from ruby;
docker-compose down