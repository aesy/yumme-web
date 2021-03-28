FROM node:14-alpine AS build

ARG YUMME_SERVER
RUN test -n "$YUMME_SERVER"

# Git is required by npm to be able to clone github dependencies
RUN apk add --no-cache git
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN YUMME_SERVER=$YUMME_SERVER npm run build

FROM httpd:2.4-alpine
WORKDIR /app
COPY --from=build /app/build/ /usr/local/apache2/htdocs/
COPY docker/.htaccess /usr/local/apache2/htdocs/
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf
