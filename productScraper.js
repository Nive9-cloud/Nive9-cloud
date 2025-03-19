const { chromium } = require('playwright');

async function main() {

    const url = "https://hiring.idenhq.com/challenge";

    console.log("Launching browser...");
    const browser = await chromium.launch({ headless: false }); 
    const context = await browser.newContext({ storageState: 'session.json' });
    const page = await context.newPage();

    try {
        console.log(`🌐 Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'load', timeout: 180000 });
        console.log("Page loaded successfully.");

       
        console.log("🔍 Waiting for 'Open Options' button...");
        await page.waitForSelector('button:has-text("Open Options")', { timeout: 90000 });
        console.log("Found 'Open Options' button.");

        await page.click('button:has-text("Open Options")');
        console.log("Clicked 'Open Options'.");

        
        await page.waitForTimeout(5000);
        console.log("Waiting for content to load...");

        
        console.log(await page.content());

    } catch (error) {
        console.error("Error during execution:", error);
    } finally {
        console.log("Keeping browser open for debugging...");
        await page.waitForTimeout(300000); 
        await browser.close();
        console.log("Browser closed.");
    }
}

main();
