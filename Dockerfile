FROM node:12.18.0

ENV ROOTPATH=/home/node

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

USER node

WORKDIR $ROOTPATH

COPY package.json npm-shrinkwrap.json $ROOTPATH/

RUN npm install 

EXPOSE 5000

COPY . $ROOTPATH/
