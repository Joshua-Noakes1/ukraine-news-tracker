const lcl = require("cli-color"),
    puppeteer = require("puppeteer-extra"),
    StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function startBrowser() {
    let browser;
    try {
        console.log(lcl.blue("[Browser - Info]"), "Opening the browser......");
        browser = await puppeteer.launch({
            // headless: false,
            args: ["--disable-setuid-sandbox", "--use-fake-ui-for-media-stream", "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4691.0 Safari/537.36"],
            "ignoreHTTPSErrors": true
        });
    } catch (err) {
        console.log(lcl.red("[Browser - Error]"), "Could not create a browser instance");
        if (process.env.DEV == "true") console.log(err);
    }
    return browser;
}

module.exports = {
    startBrowser
};