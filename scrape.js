const launchChrome = require('@serverless-chrome/lambda')
const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');

exports.execute = async () => {
  let slsChrome;
  let browser;
  let page;
  let price;

  try {
    slsChrome = await launchChrome({
      flags: [
        '--headless',
        // '--hide-scrollbars',
        // '--enable-logging',
        // '--ignore-certificate-errors',
        // '--disable-setuid-sandbox',
      ],
    })
    browser = await puppeteer.connect({
      browserWSEndpoint: (await CDP.Version()).webSocketDebuggerUrl
    })
    page = await browser.newPage();
    await page.goto('https://www.jaccs.co.jp/Service?_TRANID=JALG00001_00M');
    await page.type('#validatie-login-id', process.argv[2] || process.env.JACCS_ID);
    await page.type('#validatie-login-password', process.argv[3] || process.env.JACCS_PASSWORD);
    await page.click('#submit_login');
    await page.waitForSelector('#contents > div.three-colum > div.nav-section.nav-title > div > dl:nth-child(1) > dd:nth-child(4) > a');
    await page.click('#contents > div.three-colum > div.nav-section.nav-title > div > dl:nth-child(1) > dd:nth-child(4) > a');
    await page.waitForSelector('.point-table:nth-of-type(2) .fwNml');

    const string = await page.evaluate(() => {
      return document.querySelector('.point-table:nth-of-type(2) .fwNml').innerText
    });
    price = Number(string.slice(0, -1).replace(/\,/g, ''))
    // await browser.close()
  } catch (e) {
    console.error(e)
    return e
  } finally {
    if (page) {
      await page.close();
    }

    if (browser) {
      await browser.disconnect();
    }

    if (slsChrome) {
      await slsChrome.kill();
    }
    return price
  }
};
