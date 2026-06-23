const CDP_HOST = 'http://localhost:9222'
const PAGE_URL = 'http://localhost:3001/contact'

async function main() {
  const newTabRes = await fetch(`${CDP_HOST}/json/new?about:blank`, { method: 'PUT' })
  const tab = await newTabRes.json()
  const ws = new WebSocket(tab.webSocketDebuggerUrl)

  const pending = new Map()
  let id = 0
  const consoleMessages = []
  const exceptions = []
  let loadFired = false

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = ++id
      pending.set(msgId, resolve)
      ws.send(JSON.stringify({ id: msgId, method, params }))
    })
  }

  await new Promise((resolve) => { ws.onopen = resolve })

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data)
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result)
      pending.delete(msg.id)
      return
    }
    if (msg.method === 'Runtime.consoleAPICalled') {
      const text = msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ')
      consoleMessages.push(`[${msg.params.type}] ${text}`)
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      const ex = msg.params.exceptionDetails
      exceptions.push(`${ex.text}: ${ex.exception?.description ?? ''}`)
    }
    if (msg.method === 'Page.loadEventFired') {
      loadFired = true
    }
  }

  await send('Runtime.enable')
  await send('Page.enable')
  await send('Page.navigate', { url: PAGE_URL })

  const start = Date.now()
  while (!loadFired && Date.now() - start < 60000) {
    await new Promise((r) => setTimeout(r, 500))
  }
  console.log('load fired:', loadFired, 'after', Date.now() - start, 'ms')

  // give Vue time to hydrate after load
  await new Promise((r) => setTimeout(r, 4000))

  const evalResult = await send('Runtime.evaluate', {
    expression: `
      JSON.stringify({
        title: document.title,
        greyDivs: Array.from(document.querySelectorAll('.bg-\\\\(--background-gray\\\\)')).length,
        telInputPresent: !!document.querySelector('.vue-tel-input'),
        leafletContainer: !!document.querySelector('.leaflet-container'),
        selectTriggerCount: document.querySelectorAll('[data-slot="select-trigger"]').length,
        bodyChildCount: document.body.children.length
      })
    `,
    returnByValue: true
  })

  console.log('--- EVAL RESULT ---')
  console.log(evalResult.result.value)

  const clickResult = await send('Runtime.evaluate', {
    expression: `
      (function() {
        const trigger = document.querySelector('[data-slot="select-trigger"]');
        if (!trigger) return 'NO_TRIGGER_FOUND';
        trigger.click();
        return 'clicked';
      })()
    `,
    returnByValue: true
  })
  console.log('--- CLICK RESULT ---', clickResult.result.value)

  await new Promise((r) => setTimeout(r, 1000))

  const afterClick = await send('Runtime.evaluate', {
    expression: `
      JSON.stringify({
        selectContentVisible: !!document.querySelector('[data-slot="select-content"]'),
        ariaExpanded: document.querySelector('[data-slot="select-trigger"]')?.getAttribute('aria-expanded'),
        itemCount: document.querySelectorAll('[data-slot="select-item"]').length
      })
    `,
    returnByValue: true
  })
  console.log('--- AFTER CLICK ---')
  console.log(afterClick.result.value)

  // test file picker click (just check listener doesn't throw)
  const dropzoneCheck = await send('Runtime.evaluate', {
    expression: `
      (function() {
        const dz = document.querySelector('input[type=file]');
        return dz ? 'file input present' : 'NO FILE INPUT';
      })()
    `,
    returnByValue: true
  })
  console.log('--- FILE INPUT CHECK ---', dropzoneCheck.result.value)

  console.log('--- CONSOLE MESSAGES ---')
  console.log(consoleMessages.join('\n'))
  console.log('--- EXCEPTIONS ---')
  console.log(exceptions.join('\n') || '(none)')

  ws.close()
  process.exit(0)
}

main().catch((e) => { console.error('SCRIPT ERROR', e); process.exit(1) })
