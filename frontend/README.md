# Place Finder Frontend

React and TypeScript frontend for the Place Finder application.

The application uses Google Place Autocomplete to search for locations, displays selected places on Google Maps, stores search history through Redux Toolkit, and allows users to save places as favourites through a Spring Boot REST API.

## Features

- Google Place Autocomplete
- Google Maps location display
- Advanced map marker
- Place name, address, latitude, longitude and Google Place ID
- Search history stored in Redux
- Re-select places from search history
- Clear search history
- Save places as favourites
- Remove saved favourites
- Load persisted favourites from the backend
- Responsive Material UI interface
- Loading and error handling
- Friendly backend-unavailable messages

## Technologies

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- Redux Thunk through `createAsyncThunk`
- Material UI
- Axios
- Google Maps JavaScript API
- Google Places API

## React Patterns Demonstrated

- Functional components
- React Hooks
- Custom Hooks
- Typed Redux Hooks
- Feature-based project structure
- ES6+ syntax
- Asynchronous Redux middleware
- Separation of UI, API and state logic

## Project Structure

```text
src
├── app
│   ├── hooks.ts
│   └── store.ts
├── features
│   ├── favourites
│   │   ├── components
│   │   ├── favouriteApi.ts
│   │   ├── favouritesSlice.ts
│   │   └── favouriteTypes.ts
│   └── places
│       ├── components
│       ├── hooks
│       ├── placeSelectors.ts
│       ├── placesSlice.ts
│       └── placeTypes.ts
├── pages
├── shared
├── App.tsx
└── main.tsx
```

## Prerequisites

- Node.js 20 or later
- npm
- Google Cloud project
- Google Maps JavaScript API enabled
- Places API (New) enabled
- Running Place Finder backend on port `8080`

## Environment Configuration

Copy the example environment file:

```bash
copy .env.example .env
```

Add your values:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_GOOGLE_MAP_ID=DEMO_MAP_ID
VITE_API_BASE_URL=http://localhost:8080/api
```

Do not commit the actual `.env` file.

Restrict the Google API key to the required Google APIs and allowed website origins.

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Main Redux State

The application uses two Redux features:

```text
places
├── selectedPlace
├── searchHistory
├── mapCenter
└── mapZoom

favourites
├── items
├── fetchStatus
├── saveStatus
├── deleteStatus
└── error
```

Redux Toolkit's `createAsyncThunk` is used to load, save and delete favourite places through the backend API.

## Backend API

The frontend expects:

```text
GET    /api/favourites
POST   /api/favourites
DELETE /api/favourites/place/{placeId}
```

Default backend URL:

```text
http://localhost:8080/api
```

## Notes

Search history is stored in Redux memory and resets when the page is refreshed.

Favourite places are persisted in Microsoft SQL Server through the Spring Boot backend.