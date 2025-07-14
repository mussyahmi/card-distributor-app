FROM node:20.19-alpine

# Set working directory
WORKDIR /app

# Install required packages (optional but helpful for node-gyp builds)
RUN apk add --no-cache python3 make g++

# Copy package.json and lock file first (for Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port Vite runs on
EXPOSE 5173

# Run dev server
CMD ["npm", "run", "dev"]
