# #==================== Building Stage ================================================ 
# # Create the image based on the official Node 8.9.0 image from Dockerhub
# FROM node:11.13.0-alpine as node
# # Create a directory where our app will be placed. This might not be necessary
# RUN mkdir -p /nuxt-app
# # Change directory so that our commands run inside this new directory
# WORKDIR /nuxt-app
# # Copy dependency definitions
# COPY package.json /nuxt-app
# # Install dependencies using npm
# RUN npm install yarn
# # Get all the code needed to run the app
# COPY . /nuxt-app
# # Expose the port the app runs in
# EXPOSE 3000
# #Build the app
# # RUN yarn generate
# #==================== Setting up stage ==================== 
# # Create image based on the official nginx - Alpine image
# FROM nginx:1.13.7-alpine
# COPY --from=node /nuxt-app/dist/ /usr/share/nginx/html
# COPY ./nginx-nuxt-app.conf /etc/nginx/conf.d/default.conf
# Stage 1 - build
FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn generate

# Stage 2 - production
FROM nginx:stable-alpine as final
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]