# Hotel Price Web Scraper

## Overview
This project is a web scraper built using Playwright and TypeScript. The scraper searches hotel listings for a given city and extracts hotel information such as hotel name, rating, price, and booking website.

The implementation is configured for:
- 5-night stay
- 2 adults
- 1 infant (age below 2 years)
- Future travel dates within the calendar year

The scraper identifies the highest-rated hotel and returns its pricing information from the booking website.

---

## Tech Stack
- Node.js
- TypeScript
- Playwright

---

## Features
- Searches hotels by city
- Supports future 5-night stay
- Configured for 2 adults and 1 infant
- Extracts:
  - Hotel Name
  - Rating
  - Price
  - Website Information
- Identifies highest-rated hotel
- Handles missing data gracefully

---

## Project Structure

```bash
hotel-scraper/
│
├── .github/
├── tests/
│   └── scraper.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
