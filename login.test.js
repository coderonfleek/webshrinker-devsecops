const puppeteer = require('puppeteer');

/* let browser;

beforeEach(async () => {
  browser = await puppeteer.launch();
});

afterEach(async () => {
  await browser.close();
}); */

test("Check for XSS attack on email field", async () => {

  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
  
    await page.goto('http://localhost:5000');

    await page.type('#userEmail', '<input type="file" />');
    await page.type('#userPassword', 'password');
    await page.click('#submitButton');

    let emailContainer = await page.$('#infoDisplay')
    let value = await emailContainer.evaluate(el => el.textContent);
    
    expect(value.length).toBeGreaterThan(0);
  } finally {
    await browser.close();
  }
  
  
}, 120000);

/* const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5000');
    await driver.findElement(By.id('userEmail')).sendKeys('fik4christ@yahoo.com');
    await driver.findElement(By.id('userPassword')).sendKeys('fikayo');

    

    //Submit
    await driver.findElement(By.id('submitButton')).click();

    const emailText = await driver.findElement(By.id('infoDisplay')).getText();

    console.log(emailText);
    console.log(emailText.length);

  } finally {
    await driver.quit();
  }
})(); */