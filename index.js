const browserObject = require('./lib/browser');
const scraperController = require('./lib/pageController');

async function main() {
    //Start the browser and create a browser instance
    let browserInstance = await browserObject.startBrowser();

    // Pass the browser instance to the scraper controller
    await scraperController(browserInstance, 'https://www.bbc.co.uk/news/live/world-europe-60532634/'); // bbc news
    await scraperController(browserInstance, 'https://ukraine.liveuamap.com/'); // uamap

    await browserInstance.close();
}

main();