# Show Rating App - Frontend (Next.js)

A Next.js frontend for a TV show rating application with user authentication and rating features.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Features

- User authentication with WeChat OAuth
- Browse TV shows
- View show details with episodes
- Rate episodes (1-5 stars)
- View and rate actors for each episode
- Responsive design
- Persistent authentication state

## Project Structure

```
nextjs-xrqmy/
├── app/
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page (show list)
│   ├── login/
│   │   └── page.js         # Login page
│   ├── auth/
│   │   └── callback/       # OAuth callback handler
│   └── shows/
│       └── [id]/
│           └── page.js     # Show detail page
├── components/
│   ├── Navbar.js           # Navigation bar
│   └── StarRating.js       # Star rating component
└── lib/
    ├── api.js              # Axios instance with auth
    └── store.js            # Zustand store for auth state
```

## Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Configure API endpoint:**
   
   Update `lib/api.js` if your backend is not running on `http://localhost:8000`

3. **Run the development server:**
   ```bash
   yarn dev
   ```

The app will be available at `http://localhost:3000`

## Key Components

### StarRating
Reusable star rating component with hover effects and click handling.

### Navbar
Navigation bar with authentication state and user profile display.

### API Client
Axios instance configured with JWT token interceptor for authenticated requests.

### Auth Store
Zustand store managing user authentication state and token persistence.

## Pages

- **/** - Home page displaying all TV shows
- **/shows/[id]** - Show detail page with episodes and actors
- **/login** - WeChat OAuth login page
- **/auth/callback** - OAuth callback handler

## Development

To add new dependencies:

```bash
yarn add package-name
```

## Environment Variables

Create a `.env.local` file if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Build for Production

```bash
yarn build
yarn start
```
