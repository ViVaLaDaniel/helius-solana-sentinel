const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const videoDir = path.join(__dirname, 'public', 'demo');
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  const context = await browser.newContext({
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: 720 }
    }
  });

  const page = await context.newPage();
  
  console.log('Navigating to app...');
  await page.goto('https://helius-solana-sentinel-isk7vag5e-vivaladaniels-projects.vercel.app');
  
  console.log('Waiting for load...');
  await page.waitForTimeout(3000);
  
  console.log('Typing address...');
  await page.fill('input', 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
  await page.waitForTimeout(1000);
  
  console.log('Pressing Enter...');
  await page.keyboard.press('Enter');
  
  console.log('Waiting for results...');
  try {
    await page.waitForSelector('text=ITEMS', { timeout: 20000 });
  } catch(e) {
    console.log('Timeout waiting for ITEMS text, continuing...');
  }
  await page.waitForTimeout(3000);
  
  console.log('Scrolling to show results...');
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(2000);
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(2000);
  
  await page.mouse.wheel(0, -800);
  await page.waitForTimeout(2000);

  const videoPath = await page.video().path();
  await context.close();
  await browser.close();

  const targetPath = path.join(videoDir, 'demo.webm');
  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
  fs.renameSync(videoPath, targetPath);

  console.log('Video saved to', targetPath);
})();
