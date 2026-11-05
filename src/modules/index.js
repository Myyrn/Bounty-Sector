import { worldmapModule } from './worldmap/module.js'
import { administrationModule } from './administration/module.js'
import { economicsModule } from './economics/module.js'
import { polityModule } from './polity/module.js'
import { ActionRegistry } from '../engine/engine.js'
import { registerPolityActions } from './polity/actions.js'
export const createModules = () => [worldmapModule, administrationModule, economicsModule, polityModule]
export function createRegistry() { const r = new ActionRegistry(); registerPolityActions(r); return r }
