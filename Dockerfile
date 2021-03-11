FROM  is.jd.com/o2athena/ubuntu-nvm-multimedia

ENV TIMEZONE=Asia/Shanghai
ENV NODE_PATH=/usr/lib/node_modules
ENV PUPPETEER_DOWNLOAD_HOST=https://storage.googleapis.com.cnpmjs.org

# 复制仓库到 /app
# node_modules/* 和 /web/* 不会复制
WORKDIR /app

COPY . .

# 安装 puppeteer 依赖
RUN apt-get update && \
    apt-get install -y libgbm-dev && \
    apt-get install gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y && \
    apt-get install -y fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf --no-install-recommends

RUN ln -snf /usr/share/zoneinfo/$TIMEZONE /etc/localtime \
  && echo $TIMEZONE > /etc/timezone \
  && apt-get update \
  && apt-get install -y tzdata
  
# 安装依赖
RUN . $NVM_DIR/nvm.sh \
  && nvm install 13 \
  && nvm use 13 \
  && npm install --production --registry=http://registry.m.jd.com

ENTRYPOINT . $NVM_DIR/nvm.sh \
  && nvm use 13 \
  && chmod +x /app/start.sh \
  && /app/start.sh \
  && sleep 9999d
