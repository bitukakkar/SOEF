FROM node:12.18.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH

# install app dependencies
COPY package.json ./

RUN npm install react-scripts@3.4.1 -g --silent

RUN yarn install

# add app
COPY . ./
EXPOSE 3000

# start app
CMD ["yarn", "start"]
