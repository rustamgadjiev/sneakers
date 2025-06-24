FROM node:alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:1.27.5
COPY --from=build /app/dist /var/www/dist
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]