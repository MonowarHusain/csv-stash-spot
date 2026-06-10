import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text(), msg.location().url);
    } else {
      console.log('CONSOLE:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });

  await page.goto('http://localhost:5173/auth', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  const html = await page.content();
  if (html.includes("This page didn't load")) {
    console.log("APP CRASHED! ErrorComponent is visible.");
  } else {
    console.log("App loaded normally.");
  }
  await browser.close();
})();
