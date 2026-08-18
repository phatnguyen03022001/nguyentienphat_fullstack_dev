# Nguyen Tien Phat — Portfolio

A personal portfolio for **Nguyen Tien Phat**, a full-stack developer based in Ho Chi Minh City.

The site focuses on three things:

- Clear and friendly communication
- Real project evidence
- A clean and maintainable frontend

## What is included

- Selected project work and case-study summaries
- About, experience and education
- Skills and tools
- GitHub, LinkedIn and CV links
- Email contact flow
- Light and dark themes
- Responsive layout
- Keyboard-friendly navigation
- Reduced-motion support

## Featured repositories

- **Muse Portfolio** ([production](https://muse-portfolio-seven.vercel.app/)) — reusable Next.js model portfolio with managed content, inquiry flow and owner-only admin. The source repository is private and available on request.
- [Elite Drive](https://github.com/phatnguyen03022001/elite-drive-demo-version) — full-stack car-rental marketplace with renter, owner and admin workflows.
- [Spackie Question](https://github.com/phatnguyen03022001/spackie-question) — realtime chat application API with authentication, Pusher events and view-once image messages.

## Tech stack

- React 19
- Vite 8
- React Icons
- CSS with a small design system

## Project structure

```text
src/
├── App.jsx          # Page composition and interaction
├── data.js          # Profile, projects and skills
├── styles.css       # Design system and responsive styles
├── main.jsx         # React entry point
├── files/           # Current CV
└── images/          # Project and profile images
```

## Run locally

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

## Deployment

The project is deployed through Vercel from the `main` branch. Release verification should be tied to the deployed commit before a change is considered production-ready.

## Design principles

### Keep it clear

The site should be easy to understand without advanced technical language.

### Show real work

Project claims should connect to a live demo, source code, private-source disclosure or a clear project explanation.

### Use motion with a reason

Animation should support navigation and feedback. It should not distract from the content.

### Build for everyone

The UI supports keyboard focus, readable contrast, responsive layouts and reduced motion.

### Avoid unnecessary complexity

This is a portfolio, not a product platform. The code should stay small, direct and easy to maintain.
