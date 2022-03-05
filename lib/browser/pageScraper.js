const lcl = require('cli-color'),
    path = require('path'),
    Url = require('url-parse'),
    {
        v4: uuidv4
    } = require('uuid');

async function scraper(browser, url) {
    // get url
    let pageUrl = new Url(url);
    let uuid = uuidv4();
    let time = new Date().getTime();

    // launch page and set viewport
    let page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });

    // goto url
    console.log(lcl.blue("[Browser - Info]"), `Navigating to "${pageUrl.hostname}"...`);
    await page.goto(url);
    await autoScroll(page);

    // take screen shot and save to screenshots folder
    console.log(lcl.blue("[Browser - Info]"), `Navigated to "${pageUrl.hostname}"..., taking screenshot...`);
    await page.screenshot({
        path: path.join(__dirname, `../../screenshots/${uuid}-${pageUrl.hostname}-${time}.png`),
        fullPage: true
    });

    // close page and return to browser
    console.log(lcl.green("[Browser - Success]"), `Saved screenshot to ${`screenshots/${uuid}-${pageUrl.hostname}-${time}.png`}, closing page...`);
    await page.close();
}

// auto scroll
async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 150;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = {
    scraper
};