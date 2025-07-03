# Stage 1 - Build
FROM node:lts-alpine as builder
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2 - Production
FROM node:lts-alpine as final
WORKDIR /app
COPY --from=builder /app ./
ENV PORT=3000
EXPOSE 3000
CMD ["yarn", "start"]
