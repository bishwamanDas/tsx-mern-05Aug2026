# Star Wars Character App (MERN Stack Assignment)

Welcome to the Star Wars Character Explorer! This application is built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**, designed with a modern glassmorphism aesthetic tailored to the Star Wars universe.

## 🚀 Features

- **Pagination & Listing**: Browse through the complete Star Wars character database seamlessly.
- **Dynamic Character Cards**: Each character card dynamically receives a color gradient based on their species. Images are populated from Picsum with a consistent seed based on the character's name to provide a stable but varied visual experience.
- **Detailed Modal Views**: Click on any character to view deep lore, including height, mass, birth year, total films, and dynamically loaded homeworld information (terrain, climate, population).
- **Search Capabilities (Brownie Point)**: Instantly filter characters by name using the debounced search bar.
- **JWT Authentication (Brownie Point)**: Protected dashboard requiring authentication (mocked via a Next.js API route). Enter any username and password to enter the Jedi Archives.
- **Integration Tests (Brownie Point)**: Comprehensive e2e test suite using Playwright to ensure the modal opens with the correct character information.

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Framer Motion (for micro-animations)
- **State Management**: Zustand (for API caching & Auth state)
- **HTTP Client**: Axios
- **Testing**: Playwright

## 📦 Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Running Tests

To run the integration tests using Playwright:

```bash
npx playwright test
```

## 📸 Screenshots

*(Add your screenshots here before final submission)*

- `Login Screen`
- `Main Dashboard`
- `Character Detail Modal`
