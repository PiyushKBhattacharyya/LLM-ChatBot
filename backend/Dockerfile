# Use Node.js 19
FROM node:19-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for nodemon)
RUN npm install --legacy-peer-deps

# Expose the backend port
EXPOSE 3000

# Start the server with nodemon
CMD ["npm", "run", "start"]
