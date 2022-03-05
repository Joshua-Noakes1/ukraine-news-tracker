const lcl = require('cli-color'),
    {v4: uuidv4} = require('uuid'),
    Url = require('url-parse');

async function scraper(browser, url, screenshot) {
    let page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    console.log(lcl.blue("[Browser - Info]"), `Navigating to "${url}"...`);
    await page.goto(url);
    console.log(lcl.blue("[Browser - Info]"), `Navigated to "${url}"..., taking screenshot...`);
    await autoScroll(page);

    var url = new Url(url);

    await page.screenshot({
        path: `${uuidv4()}-${url.hostname}.png`,
        fullPage: true
    });
    console.log(lcl.green("[Browser - Success]"), `Screenshot taken, closing page...`);
    page.close();
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 150;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
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