# Use Node base image
FROM node:20-slim

# Set working directory inside the container
WORKDIR /app

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose Vite's default dev server port
EXPOSE 5173

# Start the development server (hot reload)
CMD ["npm", "run", "dev"]
