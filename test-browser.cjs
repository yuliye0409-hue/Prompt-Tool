const { chromium } = require(process.env.PLAYWRIGHT_PATH || "C:/Users/19708/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({channel:"chrome", headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1400,height:900}});
    await page.goto("about:blank");
    await page.setContent(`<style>img{width:240px;height:300px;position:absolute;top:80px}#a{left:50px}#b{left:400px}</style><img id="a" src="https://example.com/a.png"><img id="b" src="https://example.com/b.png">`);
    await page.evaluate(() => {
      const original = Element.prototype.attachShadow;
      Element.prototype.attachShadow = function(options) { return original.call(this,{...options,mode:"open"}); };
      window.chrome = {runtime:{sendMessage(m,cb){cb({ok:true,settings:{apiKey:"test"}})}},storage:{local:{get:async()=>({})},onChanged:{addListener(){}}}};
      window.openCount = 0;
      const animate = Element.prototype.animate;
      Element.prototype.animate = function(...args) { if(this.id==="ips-hover-host" && args[0][0].opacity===0) window.openCount++; return animate.apply(this,args); };
    });
    await page.addScriptTag({path:`${__dirname}/image-hover.js`});
    const panel = page.locator("#ips-hover-host");
    await page.mouse.move(180,220); await page.waitForTimeout(950);
    assert(await panel.isVisible());
    await page.mouse.move(175,230); await page.waitForTimeout(300);
    assert.equal(await page.evaluate(()=>window.openCount),1);
    await page.mouse.move(520,220); await page.waitForTimeout(950);
    assert(await panel.isVisible()); assert.equal(await page.evaluate(()=>window.openCount),1);
    await panel.locator("#generate").hover(); await page.waitForTimeout(1500);
    assert(await panel.isVisible());
    await page.mouse.move(1300,850); await page.waitForTimeout(1400);
    assert.equal(await panel.isVisible(),false);
    await page.mouse.move(180,220); await page.waitForTimeout(950);
    assert(await panel.isVisible());
    await panel.locator("#close").click(); await page.waitForTimeout(300);
    assert.equal(await panel.isVisible(),false);
    assert(await panel.locator("#generate").count());
    console.log("PASS browser: open, same-image stability, image switch without replay, panel interaction, one-second close, reopen, explicit close");
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
