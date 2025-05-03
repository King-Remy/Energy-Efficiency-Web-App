# pull official base image
FROM node:20.17.0-alpine AS builder

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .

RUN npm install 
# add app
COPY . .

RUN npm run build

FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html

