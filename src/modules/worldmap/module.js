// worldmap/module.js — read services other modules use through ctx.derive.worldmap.*
import { parseCellKey } from '../../kernel/ids.js'
import { neighbors, parseId } from './hex.js'
const sum = a => a.reduce((s, x) => s + x, 0)
export const worldmapModule = { id: 'worldmap', derive: {
  regionProvinces: (ctx, region) => Object.entries(ctx.state.world.regionSnapshot.assignment).filter(([, r]) => r === region).map(([p]) => p).sort(),
  regionOwner: (ctx, region) => { const p = ctx.derive.worldmap.regionProvinces(region)[0]; return p ? ctx.state.world.provinces[p].owner : null },
  presence: (ctx, p, nation) => ctx.state.nations.presence[p]?.[nation] ?? 0,
  cellProvShare: (ctx, key, p) => {                            // labour/population spreads over the Region's provinces by presence share (confirmed)
    const { nation, region } = parseCellKey(key), ps = ctx.derive.worldmap.regionProvinces(region)
    const tot = sum(ps.map(q => ctx.derive.worldmap.presence(q, nation)))
    return tot ? ctx.derive.worldmap.presence(p, nation) / tot : (ps.includes(p) ? 1 / ps.length : 0)
  },
  neighbors: (ctx, p) => { const { x, y } = parseId(p), g = ctx.state.world.grid
    return neighbors(x, y, g.w, g.h).map(n => `p:${n.x},${n.y}`).filter(q => ctx.state.world.provinces[q]) },
} }
