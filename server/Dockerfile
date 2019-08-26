FROM mhart/alpine-node:10.15.2
COPY . ./
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]