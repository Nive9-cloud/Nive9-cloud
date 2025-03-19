const { chromium } = require('playwright');

async function main() {
    // Replace with your actual website URL
    const url = "https://hiring.idenhq.com/challenge";

    console.log("🚀 Launching browser...");
    const browser = await chromium.launch({ headless: false }); // Headless false to see the browser
    const context = await browser.newContext({ storageState: 'session.json' });
    const page = await context.newPage();

    try {
        console.log(`🌐 Navigating to: ${url}`);
        await page.goto(url, { waitUntil: 'load', timeout: 180000 });
        console.log("✅ Page loaded successfully.");

        // Ensure 'Open Options' button is visible
        console.log("🔍 Waiting for 'Open Options' button...");
        await page.waitForSelector('button:has-text("Open Options")', { timeout: 90000 });
        console.log("✅ Found 'Open Options' button.");

        // Click the 'Open Options' button
        await page.click('button:has-text("Open Options")');
        console.log("👉 Clicked 'Open Options'.");

        // Wait for inventory or next step to load
        await page.waitForTimeout(5000); // Let dynamic content load
        console.log("⏳ Waiting for content to load...");

        // Output the page content for debugging
        console.log(await page.content());

    } catch (error) {
        console.error("❌ Error during execution:", error);
    } finally {
        console.log("🛑 Keeping browser open for debugging...");
        await page.waitForTimeout(300000); // Keep the browser open for 5 minutes
        await browser.close();
        console.log("👋 Browser closed.");
    }
}

main();
