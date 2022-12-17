FROM node:current-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Generate prisma client
# RUN npx prisma generate

EXPOSE 3001
# CMD [ "node", "app.js" ]
CMD ["bin/startup.sh"]
