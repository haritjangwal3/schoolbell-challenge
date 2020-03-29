#Step 1
FROM node:latest as node
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run start 

#Step 2
FROM nginx:alpine as nginx-stage
COPY --from=node /app/dist/schoolbell /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]