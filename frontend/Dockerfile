FROM node:alpine
WORKDIR /home/react/app
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]