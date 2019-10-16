FROM node:slim

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "/index.js"]
