FROM ubuntu:latest

# Update package lists and install curl and Node.js
RUN apt-get update && \
  apt-get install -y curl && \
  curl -fsSL https://deb.nodesource.com/setup_20.x | sh - && \
  apt-get install -y nodejs

# Install project dependencies
RUN apt install -y npm

# Set the working directory
WORKDIR /home/projects/nextjs/todo-app

# Set env arguments
ARG NEXT_PUBLIC_APPWRITE_ENDPOINT

ARG NEXT_PUBLIC_APPWRITE_PROJECT_ID

ARG NEXT_PUBLIC_APPWRITE_DATABASE_ID

ARG NEXT_PUBLIC_APPWRITE_COLLECTION_ID

# Copy project files
COPY . .

ARG PORT=3000

# Install project dependencies
RUN npm install

# Expose port 3000
EXPOSE $PORT

RUN npm run lint

# Run the application
CMD ["npm", "run", "dev"]
