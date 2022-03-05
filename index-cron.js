require('dotenv').config();
const lcl = require('cli-color'),
    puppeteer = require('puppeteer-extra'),
    StealthPlugin = require('puppeteer-extra-plugin-stealth'),
    CronJob = require('cron').CronJob;
puppeteer.use(StealthPlugin());

// Browser Functions
let browser;
let page;

// var job = new CronJob('0 */30 * * * *', async function () {
//     console.log(lcl.blue("[Cron - Info]"), "Cron has passed, Logging sites");


// }, null, true, process.env.TZ);
// job.start();