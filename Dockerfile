FROM node:20-alpine

# Create app directory
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn

# Copy the rest of the application
COPY . ./

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["yarn", "start"]