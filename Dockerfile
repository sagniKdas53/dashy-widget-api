FROM node:current-alpine3.17

ARG host
ARG port
ARG protocol
ARG interval
ARG base_url
ARG hide_ports
ARG chart_data_points
ARG chart_callback

WORKDIR /

COPY index.js chart.js test.html package.json \
    webpack.config.js favicon.ico style.css /

RUN npm install && \
    npx webpack --mode production && \
    rm -rf node_modules/ && \
    sed -i 's@__BASE_URL__@'"$base_url"'@' test.html

EXPOSE 64567

CMD [ "node", "index.js" ]