// ui/debugShell.js — minimal launchable shell. Reads ONLY through EngineClient; holds no game state.
import { readPackage } from '../data/loaders/readPackage.js'
import { EngineClient } from '../client/engineClient.js'
const $ = id => document.getElementById(id), fmt = (x, d = 2) => (typeof x === 'number' ? x.toFixed(d) : x)
const params = new URLSearchParams(location.search), scn = params.get('scenario') ?? 'demo'
const readJson = async url => { const r = await fetch(url); if (!r.ok) throw new Error(`${url}: ${r.status}`); return r.json() }
const client = new EngineClient(); let map, cells = [], selected = null, queued = []
const LENSES = { Terrain: 'terrain', Owner: 'owner', Subsistence: 'subsistence', Grievance: 'grievance', Population: 'population' }
const TERRAIN = { Mountain: '#8d8d8d', Hill: '#b59b6a', Desert: '#e3cf8f', Steppe: '#c9c27a', Grassland: '#8fbf6a', Wetland: '#6fa88f', Jungle: '#3f8f4f', Arctic: '#e8f0f4', Taiga: '#5f7f5f' }
async function boot() {
  const pkg = await readPackage(readJson, `scenarios/${scn}`), ruleset = await readJson('data/ruleset.json')
  await client.init(pkg, ruleset); $('scn').textContent = pkg.manifest.name
  const cs = pkg.countries.countries; for (const [id, c] of Object.entries(cs)) $('country').add(new Option(c.name, id)); $('country').value = pkg.scenario.playerCountry
  for (const k of Object.keys(LENSES)) $('lens').add(new Option(k, k)); $('lens').value = 'Owner'
  for (const g of Object.keys(ruleset.goods).filter(g => ['raw', 'semi'].includes(ruleset.goods[g].tier))) $('reqgood').add(new Option(g, g))
  $('reqgood').value = 'Grain'
  for (const id of ['country', 'lens']) $(id).onchange = refresh
  $('end').onclick = async () => { await run(1) }; $('run10').onclick = async () => { await run(10) }
  $('qtax').onclick = () => queue({ actor: { kind: 'government', country: $('country').value }, type: 'setTaxLaw', params: { market: +$('taxm').value, wealth: +$('taxw').value } })
  $('qreq').onclick = () => queue({ actor: { kind: 'government', country: $('country').value }, type: 'placeRequisition', params: { good: $('reqgood').value, amount: +$('reqamt').value } })
  $('qctl').onclick = () => queue({ actor: { kind: 'government', country: $('country').value }, type: 'setControlAllocation', params: { entries: [{ target: { kind: 'empire' }, floor: 0, priority: 1, surplusWeight: 1 }] } })
  $('clear').onclick = async () => { await client.clearOrders(); queued = []; renderOrders() }
  $('map').onclick = e => pick(e); await refresh()
}
async function queue(o) { await client.submit(o); queued.push(o); renderOrders() }
const renderOrders = () => { $('orders').textContent = queued.length ? queued.map(o => `${o.actor.country}: ${o.type} ${JSON.stringify(o.params).slice(0, 60)}`).join('\n') : 'no orders queued'; $('orders').style.whiteSpace = 'pre-wrap' }
async function run(n) { $('status').textContent = 'resolving…'; let rep
  for (let i = 0; i < n; i++) { rep = (await client.endTurn()).report; queued = [] }
  $('report').textContent = `executed ${rep.executed.length}, rejected ${rep.rejected.length}${rep.rejected.length ? ' (' + rep.rejected.map(r => r.type + ': ' + r.reasons.join(',')).join('; ') + ')' : ''}, refused ${rep.refused.length}`
  renderOrders(); $('status').textContent = ''; await refresh() }
async function refresh() {
  const c = $('country').value; map = await client.query('map'); cells = await client.query('cells'); const st = client.snapshotMeta(); $('turn').textContent = st.turn
  drawMap(); const gov = await client.query('government', { country: c }), law = await client.query('law', { country: c })
  const tax = (law.duties.Taxation ?? []).map(e => `${e.scope.kind}: market ${e.value.market}, wealth ${e.value.wealth}`).join('; ') || 'none'
  $('gov').innerHTML = `Ledger <b>${fmt(gov.ledger, 0)}</b> · upkeep unmet ${fmt(gov.upkeepFraction)}<br>Tax law: ${tax}<br>Requisitions: ${(law.requisitions ?? []).map(r => r.target.good + ' ' + r.amount).join(', ') || 'none'}<br>Inventory: ${Object.entries(gov.inventory ?? {}).map(([g, q]) => g + ' ' + Math.round(q)).join(', ') || '—'}`
  const mine = cells.filter(x => map.provinces[Object.keys(map.regions).find(p => map.regions[p] === x.key.split('|')[2])]?.owner === c)
  $('cells').innerHTML = '<tr><th>cell</th><th>pop</th><th>wealth</th><th>subs</th><th>grievance</th><th>compl.</th><th>rung</th></tr>' + mine.map(x => `<tr><td>${x.key}</td><td>${x.population}</td><td>${x.wealth}</td><td>${fmt(x.satisfaction.subsistence)}</td><td>${fmt(x.grievance.subsistence ?? 0)}</td><td>${fmt(x.compliance.total)}</td><td>${x.rung}</td></tr>`).join('')
  const h = await client.query('history'); $('hist').innerHTML = '<tr><th>turn</th><th>subsistence</th><th>grievance</th><th>ledger</th><th>Q</th></tr>' + h.slice(-12).map(s => { const v = s.countries[c]; return `<tr><td>${s.turn}</td><td>${fmt(v.subsistence)}</td><td>${fmt(v.grievance)}</td><td>${fmt(v.ledger, 0)}</td><td>${v.questions}</td></tr>` }).join('')
  if (selected) showProv(selected) }
function geometry() { const g = map.grid, s = 22, w = Math.sqrt(3) * s; return { s, w, W: Math.ceil(w * (g.w + 0.5)) + 4, H: Math.ceil(s * (1.5 * g.h + 0.5)) + 4, ctr: (x, y) => [w * (x + 0.5 * (y & 1)) + w / 2 + 2, s * 1.5 * y + s + 2] } }
function lerpColor(t) { const a = [60, 140, 80], b = [200, 60, 40], m = a.map((v, i) => Math.round(v + (b[i] - v) * t)); return `rgb(${m})` }
function provValue(p, kind) { const rid = map.regions[p]; const cs = cells.filter(x => x.key.split('|')[2] === rid), pop = cs.reduce((s, x) => s + x.population, 0) || 1
  if (kind === 'subsistence') return 1 - cs.reduce((s, x) => s + x.satisfaction.subsistence * x.population, 0) / pop
  if (kind === 'grievance') return cs.reduce((s, x) => s + (x.grievance.subsistence ?? 0) * x.population, 0) / pop
  return map.provinces[p].population / 500 }
function drawMap() { const cv = $('map'), g = geometry(), ctx = cv.getContext('2d'), lens = LENSES[$('lens').value]; cv.width = g.W; cv.height = g.H; ctx.clearRect(0, 0, g.W, g.H)
  for (const [id, h] of Object.entries(map.hexes)) { const [cx, cy] = g.ctr(h.x, h.y), p = map.provinces[`p:${h.x},${h.y}`]
    let col = h.surface === 'sea' ? '#3a6ea5' : h.surface === 'lake' ? '#6fa8dc' : lens === 'terrain' ? TERRAIN[p.terrain] : lens === 'owner' ? map.countries[p.owner].color : lerpColor(Math.min(1, provValue(`p:${h.x},${h.y}`, lens)))
    ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 180 * (60 * i - 30); ctx.lineTo(cx + g.s * Math.cos(a), cy + g.s * Math.sin(a)) } ctx.closePath()
    ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = (selected === `p:${h.x},${h.y}`) ? '#fff' : 'rgba(0,0,0,.25)'; ctx.lineWidth = selected === `p:${h.x},${h.y}` ? 3 : 1; ctx.stroke() }
  for (const e of Object.values(map.edges)) { const A = e.a.slice(2).split(',').map(Number), B = e.b.slice(2).split(',').map(Number), [ax, ay] = g.ctr(...A), [bx, by] = g.ctr(...B)
    ctx.strokeStyle = e.type === 'river' ? '#1d5fa8' : '#222'; ctx.lineWidth = 3; ctx.setLineDash(e.type === 'mountain_pass' ? [4, 3] : []); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke(); ctx.setLineDash([]) } }
function pick(e) { const cv = $('map'), r = cv.getBoundingClientRect(), g = geometry(), mx = (e.clientX - r.left) * cv.width / r.width, my = (e.clientY - r.top) * cv.height / r.height; let best = null, bd = 1e9
  for (const h of Object.values(map.hexes)) { const [cx, cy] = g.ctr(h.x, h.y), d = (cx - mx) ** 2 + (cy - my) ** 2; if (d < bd) { bd = d; best = h } }
  if (best && map.provinces[`p:${best.x},${best.y}`]) { selected = `p:${best.x},${best.y}`; drawMap(); showProv(selected) } }
function showProv(id) { const p = map.provinces[id], rid = map.regions[id]
  $('prov').innerHTML = `<b>${id}</b> · ${p.terrain} · forest ${p.forestation}% · ${p.habitability} · water ${p.waterSource}<br>owner ${map.countries[p.owner].name} · region ${rid} · population ${p.population} · infra ${p.infrastructureLevel} / trade ${p.tradeInfrastructureLevel}` }
boot().catch(e => { $('status').textContent = 'error: ' + e.message; console.error(e) })
