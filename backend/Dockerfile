FROM php:7.3.33-cli-alpine

# Set working directory
WORKDIR /var/www/html

# Copy backend code into container
COPY . .

# Expose port for the PHP built-in server
EXPOSE 8000

# Start PHP built-in server
CMD ["php", "-S", "0.0.0.0:8000"]
