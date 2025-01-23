# dotCMS API Demo

A React application demonstrating key dotCMS REST APIs for content management.

## Features

- Create content types with custom fields
- Create and publish content
- View created content list
- Integration with dotCMS Story Block field

## Prerequisites

- Node.js 18+
- npm
- Access to a dotCMS instance (demo or self-hosted)

## Setup

1. Clone the repository:
```bash
git clone git@github.com:dotCMS/examples.git
cd dotcms-api-demo
```

2. Install dependencies:
```bash
npm install
```

3. Configure the dotCMS API endpoint in `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://demo.dotcms.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
  ├── components/
  │   ├── Navigation.jsx
  │   ├── CreateContentType.jsx
  │   └── CreateContent.jsx
  ├── App.jsx
  └── main.jsx
```

## API Endpoints Used

- `POST /api/v1/contenttype` - Create new content types
- `PUT /api/v1/workflow/actions/default/fire/PUBLISH` - Create and publish content
- Content retrieval is handled through the content listing component

## Technologies Used

- React 18
- React Router
- Tailwind CSS
- Vite
- dotCMS REST APIs

## License

MIT
