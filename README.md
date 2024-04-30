# Astro and TailwindCSS Portfolio

This portfolio is a showcase of a project built with **Astro** and **TailwindCSS**, leveraging the latest web development technologies.

![portfolio-gif](https://github.com/LiamMarega/astro-portolio/assets/86364396/febef1cf-175b-44e2-9f5a-f90506c3e749)
**Live Preview**: [Liam Marega's Portfolio](https://www.liammarega.com/)


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
