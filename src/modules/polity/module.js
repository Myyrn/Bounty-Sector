import { politySvc } from './derive.js'
import { step5 } from './step.js'
export const polityModule = { id: 'polity', derive: politySvc, steps: { 5: step5 },
  // engine hooks (stubs until cell action choice / gating domains are specified in code)
  gateHolders: () => [], stanceFns: () => ({ selfInterest: () => 1, modifier: () => 1 }), entitlementLoss: () => {}, decideCellActions: () => [] }
