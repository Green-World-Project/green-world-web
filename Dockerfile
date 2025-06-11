# Use Node base image
FROM node:20-slim

# Set working directory inside the container
WORKDIR /app

# Copy the rest of the app files
COPY . .

# Install TypeScript globally (optional if already in your deps)
RUN npm install -g ts-node typescript

# Install dependencies
RUN npm install

# Expose Vite's default dev server port
EXPOSE 5173

# Start the development server (hot reload)
CMD ["npm", "run", "dev"]
