#!/usr/bin/env node
// Takes the review page's picture: node docs/briefs/iconography/shoot.js  (needs puppeteer-core and Chrome; NODE_PATH may
// point at another checkout's node_modules). Writes first-batch.png beside the page.
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer-core');
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => fs.existsSync(p));
(async () => {
  const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  const file = path.join(__dirname, 'first-batch.html');
  await page.goto('file:///' + file.replace(/\\/g, '/'), { waitUntil: 'load' });
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'first-batch.png'), fullPage: true });
  const rows = await page.$$eval('#rows tr', (t) => t.length);
  console.log(`first-batch.png: ${rows} rows${errors.length ? '; errors: ' + errors.join(' | ') : ''}`);
  await browser.close();
})();
