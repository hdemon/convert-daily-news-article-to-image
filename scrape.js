const launchChrome = require('@serverless-chrome/lambda')
const CDP = require('chrome-remote-interface');
const puppeteer = require('puppeteer');

exports.handler = async (event, context, callback) => {
  const slsChrome = await launchChrome({
    flags: ['--headless']
  })
  const browser = await puppeteer.connect({
    browserWSEndpoint: (await CDP.Version()).webSocketDebuggerUrl
  })
  const page = await browser.newPage();
  await page.goto('https://www.jaccs.co.jp/Service?_TRANID=JALG00001_00M');
  await page.type('#validatie-login-id', process.argv[2] || process.env.JACCS_ID);
  await page.type('#validatie-login-password', process.argv[3] || process.env.JACCS_PASSWORD);
  await page.click('#submit_login');
  await page.waitForSelector('#contents > div.three-colum > div.nav-section.nav-title > div > dl:nth-child(1) > dd:nth-child(4) > a');
  await page.click('#contents > div.three-colum > div.nav-section.nav-title > div > dl:nth-child(1) > dd:nth-child(4) > a');
  await page.waitForSelector('.point-table.mb20 .fwNml');

  const string = await page.evaluate(() => {
    return document.querySelector('.point-table.mb20 .fwNml').innerText
  });
  const price = Number(string.slice(0, -1).replace(/\,/g, ''))
  await browser.close()
  return price
};
