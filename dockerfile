# https://stackoverflow.com/a/71073989
FROM node:current-buster-slim
WORKDIR /app

# Install dependencies for puppeteer
RUN \
    apt-get update -yqq \
    && apt-get upgrade -yqq \
    && apt-get install -yqq gconf-service libasound2 libatk1.0-0 libcairo2 libcups2 libfontconfig1 libgdk-pixbuf2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libxss1 fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils \
    && apt-get install -yqq chromium \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean -yqq

# Copy Files
COPY . .

# Install dependencies
RUN npm install --ignore-scripts
# Start app
CMD ["npm", "start"]