# https://stackoverflow.com/a/71073989
FROM node:slim
WORKDIR /app

# Install dependencies for puppeteer
RUN \
    apt-get update -yqq \
    && apt-get upgrade -yqq \
    && apt-get install -y wget gnupg ca-certificates procps libxss1 \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64,aarch64,armhf] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean -yqq

# Copy Files
COPY . .

# Install dependencies
RUN \
    npm ci && \
    chmod -R o+rwx node_modules/puppeteer/.local-chromium
# Start app
CMD ["npm", "start"]