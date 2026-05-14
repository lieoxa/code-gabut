# 🎨 Code Gabut

> A creative coding and UI experimentation sandbox built with Next.js, featuring complex 3D animations, interactive components, and sleek aesthetics.

This project is a playground for exploring modern web development techniques, focusing on high-performance animations, premium UI design (dark-magenta aesthetic), and integrating advanced libraries like Three.js and GSAP within a Next.js environment.

## ✨ Key Features & Components

The project includes several highly interactive and visually stunning components:

*   **StaggeredMenu:** A dynamic, animated menu with staggered reveals using Framer Motion/GSAP.
*   **FlowingMenu:** An interactive, smooth-flowing navigation system.
*   **CardSwap:** A sleek card transition and swapping interface.
*   **GridScan:** An advanced 3D scanning animation built with Three.js and `@react-three/postprocessing`.
*   **ProfileCard:** A custom-styled, aesthetically pleasing user profile card.
*   **TextType & Animations:** Various text effects and micro-interactions.
*   **Facial Recognition (Experimental):** Integration with `face-api.js` for creative interactions.

## 🛠️ Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/), Radix UI, Shadcn UI
*   **3D & WebGL:** [Three.js](https://threejs.org/), React Three Fiber, React Three Postprocessing, OGL
*   **Animations:** [GSAP](https://gsap.com/), Framer Motion, tw-animate-css
*   **Icons:** Lucide React, React Icons
*   **Language:** TypeScript

## 🚀 Getting Started

First, ensure you have Node.js installed. Then, clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 📂 Project Structure

*   `app/`: Next.js App Router pages and global styles (`globals.css`).
*   `app/components/`: The core of the project containing all custom animated and interactive UI components (StaggeredMenu, GridScan, FlowingMenu, etc.).
*   `lib/`: Utility functions and helper classes.
*   `public/`: Static assets.

## 💡 Inspiration

This project draws inspiration from modern awwwards-winning websites, utilizing components inspired by [React Bits](https://reactbits.dev/) and focusing on a premium, highly interactive user experience.
