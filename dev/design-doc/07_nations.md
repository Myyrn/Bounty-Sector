# [Game Title TBD] — Design Document
## Module: Nations

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: Nations

*Note: this section covers core cultural/demographic mechanics and sympathy. The full Nation trait/mentality vocabulary (occupation bonuses, temperament axis, etc.) is deliberately deferred — see Open Questions.*

### Purpose
Nations is the cultural/ethnic layer that sits on top of Countries' territory and population, distinct from statehood. A Nation is a people — not a place, not a government — and it can live across many provinces and many Countries simultaneously. Nations is the primary mechanical bridge into Internal Politics' Identity/Autonomy and Solidarity needs, and it supplies the "Tradition/Mentality" inputs that bias a Country's decision-making.

### Core Concepts

**Nation**
A cultural/ethnic people, defined by shared language, culture, religion, and tradition. Carries (or will carry, once the trait system is designed) a mentality profile that feeds Internal Politics' decision-weight multiplier and, per this discussion, a **reaction temperament** — see below.

**Population Presence**
Each province holds a per-Nation population share. A Nation's presence in a province need not be a majority — diaspora and minority presence are both tracked the same way, just at lower shares.

**Emergent Cores (no pre-set homeland)**
A Nation's core(s) are not assigned at world-gen — they are computed from where its population is most populous and concentrated. This means:
- A Nation can have **multiple cores** simultaneously.
- Cores can **drift, strengthen, weaken, or fade** over time as population shifts through migration, growth, colonization, or assimilation — there is no fixed "homeland" fact anywhere in the data model, only a snapshot of current demographic reality.
- A large Nation split into population centers under two different Countries produces an emergent **"divided nation"** scenario — a natural soft-power flashpoint (kin-state politics, unification pressure, rival claims to represent the Nation) without needing to be hand-designed.
- **Influence radiates outward from cores and decays with distance.** A Nation is strongest (most resistant to assimilation, most locally dominant) near its core(s), and progressively weaker/more assimilable further away.

**Titular Nation — a ruler's declaration, not a demographic fact**
Most Countries will have a titular Nation, but *which* Nation holds that status is a deliberate policy choice made by the ruler, not automatically the numeric majority. Declaring a Nation titular:
- **Benefits** that Nation directly — full/boosted Identity, Status, and (once designed) favorable standing in the Government Triangle's actor structure.
- **Costs** every other Nation present a hit to Identity/Autonomy, proportional to how large/concentrated they are — which drags down overall Solidarity. Declaring a minority titular over an actual majority is a legitimate but genuinely risky strategic bet, not a free pick.
- This status can be **changed** by the ruler over time, with the above trade-offs recalculated accordingly — it's live policy, not a fixed trait.

**Sympathy**
A Nation's sympathy toward a Country it has presence in is computed, not stored as an independent free number, from:
- **Base need-satisfaction read** — how well that Country currently satisfies Identity/Autonomy and Solidarity for that Nation's population specifically (disaggregated from Internal Politics' need math).
- **Standing modifiers** — a running tally of bonuses/maluses added or removed by specific events (granted autonomy, broken promises, suppression, accommodation policies, etc.), rather than a replayable history log. Presumed to decay over time absent reinforcement.

A Nation present in multiple Countries holds **independent sympathy readings per Country** — each computed purely from that Country's own treatment of its local share of the Nation.

**Reaction Temperament**
How strongly a Nation reacts to good or bad treatment is a trait of that Nation's profile — some Nations are passive/slow to react even to real grievances, others are passionate/aggressive and swing hard on comparatively small provocations. This is explicitly **independent of distance from core** — a distant, small diaspora belonging to a passionate Nation can still react strongly; distance affects whether a population *stays distinct*, not how loudly it reacts once something happens to it.

**Assimilation**
Population presence drifts over time between Nations, through two channels:
- **Passive drift** — background function of local sympathy, distance from nearest core (weaker pull = faster drift), and the relative cultural weight of the locally dominant Nation.
- **Active policy** — Country-level levers (suppression vs. accommodation, cultural funding, language policy) that accelerate, slow, or reverse the passive drift. Suppression is not a free lever — it carries a direct cost to Identity/Autonomy (and therefore sympathy and Solidarity) for the affected Nation, a real trade-off rather than a dominant strategy.

**Statehood Pathway**
A stateless Nation (no Country where it holds titular status) that accumulates sufficient concentrated population, low sympathy, and internal pressure can pursue a formation pathway — autonomy first, then independence — feeding directly into Countries' lifecycle mechanics (Formation via secession).

### Player Interactions
- View population/Nation distribution across territory (political vs. cultural map lenses, tying back to World Map's stated lens system).
- Declare or change a Country's titular Nation.
- Set assimilation policy (suppress vs. accommodate) toward specific minority Nations.
- Invest in soft-power tools toward co-nationals abroad, once a Nation has a recognized core state (kin-state politics — mechanics likely live partly in Diplomacy).
- Pursue or respond to a stateless Nation's statehood pathway (as the Nation's sympathizer or as the Country losing territory/legitimacy).

### Systems & Rules (sketch, to refine later)
- Exact core-strength formula (population count × concentration/share) and how influence decay-with-distance is calculated.
- Exact assimilation drift formula and how strongly active policy shifts it.
- Standing-modifier decay rate for sympathy.
- Whether co-titular status (two Nations jointly titular) is supported, or exactly one titular Nation per Country — open per the discussion.

### Dependencies
- **World Map** — provinces are the substrate for population presence and core computation.
- **Countries** — titular Nation is a Country-level declared policy; statehood pathway feeds Countries' lifecycle (Formation/secession); Government Triangle position likely interacts with how easily titular status can be declared/changed (deferred).
- **Internal Politics** — Identity/Autonomy and Solidarity need math is owned there; Nations supplies the per-Nation disaggregation and the Tradition/Mentality decision-weight inputs.
- **Diplomacy** — kin-state soft-power tools (protecting/promoting co-nationals abroad) are a Diplomacy-executed, Nations-motivated action.
- **Characters** — Archmages and other notable figures may themselves belong to specific Nations, tying Characters' identity to this module (not yet designed).

### Open Questions
- Can a Country have co-titular status for two Nations, or exactly one titular Nation at a time?
- Full Nation trait/mentality vocabulary — occupation bonuses, reaction temperament's exact scale, and other cultural-profile axes — deliberately deferred to a dedicated discussion.
- How Government Triangle position interacts with titular-status declaration (ease/legitimacy of the ruler's choice) — deferred until Internal Politics' actor model is designed.
- Exact mechanics of the kin-state soft-power toolkit (what a core state can actually do on behalf of co-nationals elsewhere) — likely belongs partly to Diplomacy's future design session.

---

