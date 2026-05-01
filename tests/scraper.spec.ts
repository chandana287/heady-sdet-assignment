// Search configured for:
// - 5-night stay
// - 2 adults
// - 1 infant (age 1)

import { chromium } from 'playwright';

async function scrapeHotels(city: string) {
  const browser = await chromium.launch({
    headless: false
  });
  const page = await browser.newPage();
  const url =
    'https://www.booking.com/searchresults.html?' +
    `ss=${city}` +
    '&checkin=2026-06-10' +
    '&checkout=2026-06-15' +
    '&group_adults=2' +
    '&no_rooms=1' +
    '&group_children=1' +
    '&age=1';

  await page.goto(url);
  await page.waitForTimeout(10000);

  // Extract hotel names
  const hotels = await page.$$eval(
    '[data-testid="property-card"]',
    (cards) => {
      return cards.slice(0, 10).map((card) => {
        const name =
          card.querySelector('[data-testid="title"]')
            ?.textContent
            ?.trim();
        const priceElements = Array.from(
          card.querySelectorAll('span')
        );
        const priceText = priceElements
          .map((el) => el.textContent?.trim())
          .find((text) =>
            text?.includes('₹')
          );
        const rawPrice = priceText || 'Price not available';
        const matches = rawPrice.match(/₹\s?[\d,]+/g);
        const price = matches
          ? matches[matches.length - 1]
          : rawPrice;
        const ratingText =
          card.querySelector('[data-testid="review-score"]')
            ?.textContent
            ?.trim();
        const ratingMatch = ratingText?.match(/\d+\.\d+/);
        const rating = ratingMatch
          ? ratingMatch[0]
          : 'N/A';

        return {
          name,
          price,
          rating,
          website: 'Booking.com'
        };
      });
    }
  );

  console.log('\nHotels Found:\n');
  console.log(hotels);

  const filteredHotels = hotels.filter(
    (hotel) => hotel.rating
  );
  const sortedHotels = filteredHotels.sort((a, b) => {
    const ratingDiff =
      parseFloat(b.rating) - parseFloat(a.rating);

    if (ratingDiff !== 0) {
      return ratingDiff;
    }
    return (
      extractPrice(a.price) - extractPrice(b.price)
    );
  });

  function extractPrice(price: string): number {
    return Number(
      price.replace(/[₹,\s]/g, '')
    );
  }
  console.log('\nHighest Rated Hotel:\n');
  console.log(sortedHotels[0]);
}

scrapeHotels('Hyderabad');
