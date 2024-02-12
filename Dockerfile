FROM nginx:latest
LABEL authors="mrchupatek"
WORKDIR /app
COPY . /app
COPY nginx.conf /etc/nginx/nginx.conf