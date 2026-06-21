import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 700 } })
const logs = []
page.on('console', (msg) => { if (msg.type() === 'error') logs.push(msg.text()) })
page.on('pageerror', (err) => logs.push(String(err)))

await page.goto('http://localhost:3005', { waitUntil: 'load', timeout: 60000 })
await page.waitForTimeout(3000)

const acceptBtn = page.getByRole('button', { name: 'Accepter', exact: true })
for (let i = 0; i < 5; i++) {
  await acceptBtn.click({ force: true, timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(500)
  if (await page.locator('.cookieControl__Bar').count() === 0) break
}

await page.waitForTimeout(500)
await page.screenshot({ path: 'screenshot-before.png' })

const trigger = page.getByRole('button', { name: /FR|EN/ })
console.log('trigger count:', await trigger.count())
await trigger.click({ timeout: 5000 })
await page.waitForTimeout(600)
await page.screenshot({ path: 'screenshot-after.png' })

console.log('dropdown content count:', await page.locator('[data-slot="dropdown-menu-content"]').count())
console.log('logs:', logs)
await browser.close()
