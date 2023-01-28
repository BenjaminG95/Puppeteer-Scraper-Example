import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    // go to the desired website
    await page.goto('https://randomwordgenerator.com/');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    // close cookies
    await page.click('body > div.fc-consent-root > div.fc-dialog-container > div.fc-dialog.fc-choice-dialog > div.fc-footer-buttons-container > div.fc-footer-buttons > button.fc-button.fc-cta-consent.fc-primary-button > p');

    // set the input value
    await page.evaluate(() => {
        document.querySelector('#qty').value = 10;
    });

    // Wait and click on the letters radio
    const letterButtonSelector = '#word_length';
    await page.waitForSelector(letterButtonSelector);
    await page.click(letterButtonSelector);

    // Wait and click on the generator button
    const generatorWordsSelector = '#options > div:nth-child(4) > div > input.btn.btn-primary';
    await page.waitForSelector(generatorWordsSelector);
    await page.click(generatorWordsSelector);

    // wait the word list and retrieve it
    const resultSelector = '#result';
    await page.waitForSelector(resultSelector);

    const listOfWords = await page.evaluate((resultSelector) => {
        const results = [];

        document.querySelector(resultSelector).querySelectorAll('li').forEach((e) => {
            results.push(e.innerText);
        });

        return results;
    }, resultSelector);

    // close browser
    // await browser.close();

    console.log(listOfWords);
    return listOfWords;
})();