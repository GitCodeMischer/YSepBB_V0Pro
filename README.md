# YSeppBB - Personal Balance Beam

This is a modern cryptocurrency staking platform interface built with Next.js and Tailwind CSS. It replicates the UI shown in the provided design reference.

## Features

- Dark-themed UI optimized for cryptocurrency staking
- Responsive design that works on desktop and mobile devices
- Interactive components including charts for asset performance
- Detailed staking information display

## Technologies Used

- Next.js 15
- React 19
- Tailwind CSS
- Recharts for data visualization
- React Icons for all icons

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `components/` - Contains all UI components
  - `Layout.jsx` - Main layout component that includes Header and Sidebar
  - `Header.jsx` - Top navigation bar with user profile and actions
  - `Sidebar.jsx` - Left sidebar with navigation
  - `Dashboard.jsx` - Main content area with staking overview
  - `StakingCard.jsx` - Card component for individual staking assets
  - `StakeDetails.jsx` - Detailed view for a specific staking position
  - `LiquidStaking.jsx` - Information about liquid staking portfolio

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [Recharts Documentation](https://recharts.org)

## Deployment

This project can be easily deployed on Vercel, the platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## PWA Support

This application is now fully compatible with Progressive Web App (PWA) standards. This means users can install the app on their devices and access it even when offline.

### PWA Features

- **Installable**: Users can install the app on their home screen
- **Offline Support**: Basic functionality works even without an internet connection
- **Update Notifications**: Users are notified when a new version is available
- **Responsive Design**: Works well on all device sizes

### PWA Files

- `public/manifest.json`: Defines app metadata for installation
- `public/sw.js`: Service worker for offline caching
- `public/sw-register.js`: Registers the service worker
- `public/offline.html`: Fallback page shown when offline
- `public/icons/`: Directory containing app icons

### Icon Requirements

To fully complete the PWA setup, replace the placeholder icon files with actual icons in the following sizes:

- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512
