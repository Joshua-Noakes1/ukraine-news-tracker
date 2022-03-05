const lcl = require("cli-color"),
    pageScraper = require("./pageScraper");

async function scrapeAll(browserInstance, url, screenshot) {
    let browser;
    try {
        browser = await browserInstance;
        await pageScraper.scraper(browser, url, screenshot);

    } catch (err) {
        console.log(lcl.red("[Browser - Error]"), "Could not resolve the browser instance");
        if (process.env.dev == "true") console.log(err);
    }
}

module.exports = (browserInstance, url, screenshot) => scrapeAll(browserInstance, url, screenshot);