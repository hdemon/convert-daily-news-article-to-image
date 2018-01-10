const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.rarejob.com/dna/');
  await page.screenshot({ path: 'example.png' });
  await page.click('main > article > header > h1 > a')
  await page.waitForSelector('body[class~="single-post"]')
  await page.evaluate(() => {
    const sidebar = document.querySelector('#sidebar1')
    const footer = document.querySelector('.footer')
    const header = document.querySelector('#container')
    const font_size_box = document.querySelector('.fsz_box')
    sidebar.parentNode.removeChild(sidebar)
    footer.parentNode.removeChild(footer)
    header.parentNode.removeChild(header)
    font_size_box.parentNode.removeChild(font_size_box)
  })

  await page.screenshot({ path: 'example.png',  fullPage: true });

  await browser.close();
})();