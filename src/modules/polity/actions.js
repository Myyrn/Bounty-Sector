// polity/actions.js — first action types, enough to drive the demo through the real Action pipeline.
const entryKey = e => JSON.stringify(e.scope)
export function registerPolityActions(reg) {
  reg.register({ id: 'setTaxLaw', module: 'polity', class: 'event', gateDomain: () => 'taxLaw', defaultVisibility: 'public',
    validate: (ctx, a) => (a.params && typeof a.params.market === 'number' && typeof a.params.wealth === 'number' ? { ok: true } : { ok: false, reasons: ['market and wealth rates required'] }),
    costs: () => [],
    apply: (ctx, a) => { const country = a.actor.country, law = (ctx.state.polity.law[country] ??= { rights: {}, duties: {}, requisitions: [] })
      const scope = a.params.scope ?? { kind: 'empire' }, list = (law.duties.Taxation ??= []).filter(e => entryKey(e) !== JSON.stringify(scope))
      list.push({ scope, value: { market: a.params.market, wealth: a.params.wealth }, declaredTurn: ctx.state.meta.turn }); law.duties.Taxation = list } })
  reg.register({ id: 'setControlAllocation', module: 'administration', class: 'dial', gateDomain: () => 'administration', defaultVisibility: 'public',
    validate: (ctx, a) => (Array.isArray(a.params?.entries) ? { ok: true } : { ok: false, reasons: ['entries required'] }), costs: () => [],
    apply: (ctx, a) => { ctx.state.admin.governments[a.actor.country].controlDial = { entries: a.params.entries } } })
  reg.register({ id: 'setSpendingDial', module: 'polity', class: 'dial', gateDomain: () => null, defaultVisibility: 'public',
    validate: (ctx, a) => (Array.isArray(a.params?.entries) ? { ok: true } : { ok: false, reasons: ['entries required'] }), costs: () => [],
    apply: (ctx, a) => { ctx.state.admin.governments[a.actor.country].spendingDial = { entries: a.params.entries, reserve: a.params.reserve ?? 0, sink: a.params.sink ?? 'keep' } } })
  reg.register({ id: 'placeRequisition', module: 'polity', class: 'event', gateDomain: () => 'market', defaultVisibility: 'public',
    validate: (ctx, a) => (a.params?.good ? { ok: true } : { ok: false, reasons: ['good required'] }), costs: () => [],
    apply: (ctx, a) => { const law = ctx.state.polity.law[a.actor.country]; law.requisitions = [...law.requisitions.filter(r => r.target.good !== a.params.good),
      ...(a.params.amount > 0 ? [{ scope: a.params.scope ?? { kind: 'empire' }, target: { good: a.params.good }, amount: a.params.amount, unit: 'fraction', since: ctx.state.meta.turn }] : [])] } })
}
