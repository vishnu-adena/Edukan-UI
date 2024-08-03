# Stage 1: Build the application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy built assets from the build stage
COPY --from=build /app/ ./

# Install production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
