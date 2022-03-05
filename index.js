require('dotenv').config();
const lcl = require('cli-color'),
    path = require('path'),
    browserObject = require('./lib/browser/browser'),
    scraperController = require('./lib/browser/pageController'),
    asw = require('./lib/asw'),
    CronJob = require('cron').CronJob,
    {
        readJSON: read
    } = require('./lib/readwrite');


async function main() {
    // Start the browser and create a browser instance
    let browserInstance = await browserObject.startBrowser();

    // load in list of sites
    let sites = await read(path.join(__dirname, 'data', 'sites.json'), true);

    // kill if cant load sites
    if (sites.success !== true) {
        console.log(lcl.red("[FS - Error]"), "Failed to load sites.json");
        return process.exit(1);
    }

    // loop through sites and take screenshots
    await asw(sites.sites, async (site, index, array) => {
        console.log(lcl.blue("[Cron - Info]"), `Navigating to site ${index + 1}/${array.length} - ${site.name}`);
        await scraperController(browserInstance, site.url); // goto site
    });

    // close browser
    console.log(lcl.green("[Browser - Success]"), "Closing browser...");
    await browserInstance.close();
}

if (process.env.devTest !== "true") {
    // setup cron for every 30 minutes
    let job = new CronJob('0 */30 * * * *', async function () {
        console.log(lcl.blue("[Cron - Info]"), "Cron has passed, taking screenshots");
        await main(); // start the main function
    }, null, true, process.env.TZ);

    console.log(lcl.blue("[Cron - Info]"), "Cron has started, waiting for every 30 minutes");
    job.start();
} else {
    // start the main function
    main();
}