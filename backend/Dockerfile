# Use Node.js 19
FROM node:19-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies for nodemon)
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set the environment file
COPY .env .env

# Expose the backend port
EXPOSE 5000

# Start the server with nodemon
CMD ["sh", "-c", "export $(cat .env | xargs) && npm start"]
