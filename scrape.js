const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.rarejob.com/dna/');
  await page.screenshot({ path: 'example.png' });
  await page.click('main > article > header > h1 > a')
  // await page.waitForSelector('body[class~="single-post"]')
  await page.waitForSelector('#fontL')
  await page.evaluate(() => {
    const sidebar = document.querySelector('#sidebar1')
    const footer = document.querySelector('.footer')
    const header = document.querySelector('#container')
    sidebar.parentNode.removeChild(sidebar)
    footer.parentNode.removeChild(footer)
    header.parentNode.removeChild(header)
  })

  await page.screenshot({ path: 'example.png',  fullPage: true });

  await browser.close();
})();