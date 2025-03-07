# Use official Node.js 19 image
FROM node:19-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose the port Vite runs on (5173)
EXPOSE 5173

# Start the development server with --host to make it accessible
CMD ["npm", "run", "dev", "--", "--host"]
