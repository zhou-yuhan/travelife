FROM node:20-alpine

WORKDIR /app

# Dependency
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# Travelife app
COPY . .

CMD [ "yarn", "start" ]