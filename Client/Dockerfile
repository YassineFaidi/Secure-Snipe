# Step 1: Build the app
FROM node:22.11.0-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app (use npm run build here for production)
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy the build files from the build step
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
