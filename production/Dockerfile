FROM --platform=linux/amd64 nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 8080
