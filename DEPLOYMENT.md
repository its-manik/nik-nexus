# Deployment Guide

This guide covers deploying the Block Explorer Interface to various environments.

## Building for Production

1. Create a production build:
```bash
npm run build
```

This will create a `dist` directory with optimized static assets.

## Environment Variables

Create a `.env` file in the project root:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# API Configuration
VITE_API_BASE_URL=/api
VITE_API_VERSION=v1

# Optional Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=false
```

## Deployment Options

### 1. Netlify (Recommended)

1. Connect your repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

3. Add environment variables in Netlify dashboard

4. Configure redirects in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Docker

1. Build the Docker image:
```bash
docker build -t block-explorer .
```

2. Run the container:
```bash
docker run -p 8080:80 block-explorer
```

### 3. Static Hosting

The built application can be served from any static hosting service:

1. Upload the contents of the `dist` directory
2. Configure URL rewriting for SPA support
3. Set up SSL certificate
4. Configure CORS headers if needed

## Production Considerations

### Performance

- Enable gzip compression
- Configure caching headers:
  ```nginx
  # Nginx example
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, no-transform";
  }
  ```

### Security

1. Configure security headers:
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
```

2. Enable HTTPS
3. Set up CSP headers
4. Configure CORS properly

### Monitoring

1. Set up error tracking (e.g., Sentry)
2. Configure performance monitoring
3. Set up uptime monitoring
4. Enable logging

## CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Troubleshooting

### Common Issues

1. **404 errors on page refresh**
   - Configure URL rewriting for SPA
   - Check server configuration

2. **API connection issues**
   - Verify API URL configuration
   - Check CORS settings
   - Validate SSL certificates

3. **Performance issues**
   - Enable code splitting
   - Optimize asset loading
   - Configure proper caching

### Health Checks

1. Monitor key metrics:
   - Page load time
   - API response times
   - Error rates
   - Resource usage

2. Set up alerts for:
   - High error rates
   - Slow response times
   - Resource exhaustion

## Support

For deployment issues:
1. Check the [troubleshooting guide](#troubleshooting)
2. Review server logs
3. Open an issue on GitHub
4. Contact the development team