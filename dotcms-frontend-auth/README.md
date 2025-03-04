# Next.js DotCMS Authentication Demo

This project demonstrates a simple authentication flow using Next.js and DotCMS's authentication API. It includes a login page, protected dashboard, and integration with the dotCMS Demo Site.

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Access to demo.dotcms.com instance

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important Notes

### DotCMS Demo Instance

This application is configured to work with the demo.dotcms.com instance. For testing purposes, you can use the following credentials:

- Username: bill@dotcms.com
- Password: bill@dotcms.com

⚠️ **Important**: Before using any other credentials, ensure that:
- The user exists in the demo.dotcms.com instance
- The user has appropriate permissions
- You can create new users through the dotCMS admin interface if needed

### Features

- Login authentication using dotCMS API
- Protected dashboard route
- Secure cookie-based session management
- Automatic redirects for authenticated/unauthenticated users

### Project Structure

```
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── login/
│   │           └── route.ts    # Login API endpoint
│   ├── dashboard/
│   │   └── page.tsx           # Protected dashboard page
│   └── page.tsx               # Login page
├── components/
│   ├── login-form.tsx         # Login form component
│   └── logout-button.tsx      # Logout button component
```

## Security Considerations

- Authentication tokens are stored in HTTP-only cookies
- Secure cookie settings are automatically enabled in production
- CSRF protection is implemented through SameSite cookie attributes
- All API routes are protected against unauthorized access

## Development

To modify the dotCMS instance URL or other configurations, update the API endpoint in `app/api/auth/login/route.ts`.

## Production Deployment

When deploying to production:

1. Ensure you're using the correct dotCMS instance URL
2. Set the appropriate environment variables if needed
3. The application will automatically enable secure cookies in production environment

## Contributing

Feel free to submit issues and enhancement requests.
