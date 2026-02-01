# Bitkay Blog

Personal blog of Elias García - Fullstack Developer & Frontend Specialist

"Coding with LoFi. Simple. Intentional. Software."

## 🚀 Tech Stack

- **Framework**: Astro 5.16.15
- **Styling**: TailwindCSS 4.x with dark mode support
- **Typography**: TailwindCSS Typography plugin
- **RSS**: Astro RSS integration
- **Code Formatting**: Prettier with Astro plugin

## 📁 Project Structure

```text
/
├── public/                 # Static assets
├── src/
│   ├── components/        # Astro & Preact components
│   ├── layouts/          # Page layouts
│   ├── pages/           # Routes & markdown posts
│   │   ├── posts/       # Blog posts
│   │   └── tags/        # Tag pages
│   ├── styles/          # Global CSS
│   ├── scripts/         # Client-side JavaScript
│   └── data/           # Site data & config
├── astro.config.mjs     # Astro configuration
└── package.json        # Dependencies & scripts
```

## 🧞 Commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Install dependencies                             |
| `pnpm dev`             | Start local dev server at `localhost:4321`       |
| `pnpm build`           | Build production site to `./dist/`               |
| `pnpm preview`         | Preview build locally before deploying           |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 🌟 Features

- **Blog System**: Markdown-based blog posts with RSS feed
- **Tag System**: Categorize posts with tags
- **Dark Mode**: Automatic dark/light theme switching
- **Responsive Design**: Mobile-first design with TailwindCSS
- **SEO Optimized**: Built-in Astro SEO features
- **Fast Loading**: Astro's island architecture for optimal performance

## 📝 Content

Blog posts are written in Markdown and stored in `src/pages/posts/`. Each post should include frontmatter with metadata like title, date, tags, and description.

## 🚀 Deployment

Currently deployed at: <https://bitkay-blog.netlify.app>

## 👤 About

Fullstack Developer with experience in:

- Web Components & TypeScript
- JavaScript/Node.js
- React/NextJS/Astro
- PHP & MySQL
- MongoDB

Currently working at BBVA México as a Frontend Developer.
