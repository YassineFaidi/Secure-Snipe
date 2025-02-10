# Backend Dockerfile
FROM node:22.11.0-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the backend code
COPY . .

# Expose the port your backend will run on (e.g., 3000)
EXPOSE 3000

# Command to start your backend (adjust accordingly)
CMD ["npm", "start"]
