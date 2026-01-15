# Build Stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_ANIME_PROVIDER

# Set environment variables for build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_ANIME_PROVIDER=${VITE_ANIME_PROVIDER}

# Build the application
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Custom Nginx config to handle React Router and CORS
RUN echo 'server { \
    listen 80; \
    server_name _; \
    \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json; \
    \
    # Handle React Router - all routes go to index.html \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Cache static assets \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
