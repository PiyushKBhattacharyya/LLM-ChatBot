# Use Node.js 19 Alpine for a lightweight image
FROM node:19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies (including devDependencies for nodemon)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the server with npm
CMD ["npm", "run", "start"]
