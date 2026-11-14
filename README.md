# Astro, TailwindCSS and GSAP Portfolio

This portfolio is a showcase of a project built with **Astro** and **TailwindCSS**, leveraging the latest web development technologies.

![portfolio-gif](https://github.com/LiamMarega/astro-portolio/assets/86364396/febef1cf-175b-44e2-9f5a-f90506c3e749)
[Live Preview](https://www.liammarega.com/)

## 🚀 Project Structure

The folder structure follows a modular pattern to facilitate scalability and maintenance:

```text
├── public/                  # Static resources like images
├── src/
│   ├── components/          # Astro/React/Vue/Svelte/Preact components
│   │   ├── About/           # 'About' section
│   │   ├── Contact/         # Contact section
│   │   ├── UI/              # User interface components
│   │   └── Work/            # Featured works and projects
│   ├── layouts/             # Layout templates
│   ├── pages/               # Site pages, each exposed as a route
│   └── utils/               # Utility functions and helpers
└── package.json             # Dependency management and scripts
```

## 🧞 Commands

The commands to interact with the project are:

| Command                   | Action                                           |
| ------------------------- | ------------------------------------------------ |
| `npm install`             | Install dependencies                             |
| `npm run dev`             | Start the development server at `localhost:4321` |
| `npm run build`           | Build your site for production in `./dist/`      |
| `npm run preview`         | Preview your build locally                       |
| `npm run astro ...`       | CLI commands like `astro add`, `astro check`     |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📦 Dependencies

The project utilizes the following key dependencies:

- `@astrojs/check`: Verification tool for Astro
- `@astrojs/tailwind`: TailwindCSS integration with Astro
- `astro`: Build framework
- `gsap`: Animation library
- `tailwindcss`: CSS framework
- `typescript`: JavaScript superset

To get started with this portfolio, clone the repository and follow the provided commands. Enjoy creating and customizing your portfolio! 🚀

## Responsive Design Features

This project has been optimized for responsiveness across multiple devices:

- **Mobile-first approach**: All components are designed to work on small screens first, then enhanced for larger viewports
- **Responsive Typography**: Text scales appropriately based on screen size
- **Adaptive Layouts**: Components change layout and positioning based on available space
- **Performance Optimized**: Images and animations are conditionally loaded/displayed for better performance
- **Touch-friendly**: Interactive elements are properly sized for touch devices

## Component Structure

The website uses a modular component structure for maintainability:

- `components/ui/`: Reusable UI components
  - `Container.astro`: Responsive container with consistent padding
  - `ResponsiveImage.astro`: Optimized image component with proper loading strategies
  - `Navbar.astro`: Responsive navigation with mobile menu
  - `InfoBox.astro`: Information display with responsive positioning
  - `CursorFollow.astro`: Custom cursor for desktop devices
  - `SquareBackground.astro`: Responsive grid background with device-specific optimizations
  - `NoiseBackground.astro`: Subtle texture overlay

## Technologies Used

- **Astro**: Fast, modern static site generator
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **GSAP**: Animation library for smooth, performant animations
- **Lenis**: Smooth scrolling library

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Responsive Breakpoints

The site uses the following responsive breakpoints:

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 768px (md)
- **Desktop**: 768px - 1024px (lg)
- **Large Desktop**: > 1024px (xl+)

## Performance Considerations

- Large grid backgrounds are conditionally rendered based on device
- Animations are simplified on mobile devices
- Images use appropriate loading strategies (lazy loading for below-fold content)
- CSS animations are preferred over JavaScript when possible
