# [Game Title TBD] — Design Document
## Module: World Map

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: World Map

### Purpose
World Map is the physical and geographic substrate of the game. It answers "where is everything, what does the land support, and how connected is it" — independent of who owns or claims it. Every other module (Countries, Nations, Economics, War) reads from World Map but does not own its data.

### Core Concepts

**Province**
The base spatial unit of the game. Target scale: ~5000 provinces at world-gen, with the number tunable during development. At game start, most provinces are **unsettled wasteland** — the map is sparse, not saturated with established states.

Each province carries:
- **Terrain/climate profile** — temperature, aridity, fertility, forestation, wetland character, and similar axes. This is a real stat, not flavor: it determines both habitability difficulty and what the province is economically good for once settled (shared data source with Economics).
- **Habitability state** — a spectrum from *Wasteland* (unclaimed, unsettled) → *Claimed/Frontier* (a country has a claim but no real population yet) → *Settled* (populated, produces economy and culture).
- **Cataclysm status** — an overlay independent of terrain quality. A province can be climatically excellent but uninhabitable due to a magical or technological cataclysm (blight, industrial disaster, etc.).
- **Resources** — whatever raw inputs the province can yield once settled (feeds Economics).
- **Adjacency** — neighboring provinces, for movement, trade flow, and contiguity logic.

**Cataclysms**
A dynamic threat layer, not fixed world-gen dressing:
- Some cataclysms are **pregenerated**, reflecting the world's history before the game starts (scars from a past magical war, an old industrial collapse, etc.).
- New cataclysms can **arise dynamically during play** — including being manually invoked as a tool of war (e.g., deploying a weapon that renders land uninhabitable). This makes cataclysm-causing acts a potential severe diplomatic/military escalation, not just a map feature.
- Cataclysms presumably have their own lifecycle — onset, spread/intensification, and possible reclamation/cleansing through investment — though the depth of that simulation is still open (see Open Questions).

**Borders**
Likely a first-class concept derived from province ownership/control, rather than purely incidental — border regions matter for trade, diplomacy, and (later) territorial disputes.

**Trade & connectivity geography**
Strategic geography (route nodes, chokepoints) framed around trade and influence flow rather than invasion paths, fitting the soft-power emphasis.

### Player Interactions
- Explore/survey unsettled provinces to evaluate habitability and resource potential.
- Direct settlement/colonization effort toward claimed provinces (this is the early-game "expansion" loop — racing to settle useful land rather than fighting over land already in use).
- Invest in reclaiming cataclysm-affected land (long-term, high-cost).
- (Later, wartime) potentially trigger cataclysms as an extreme and consequence-laden act.

### Systems & Rules (sketch, to refine later)
- Settlement is a process, not an instant flag flip — presumably has a cost/time/risk profile tied to terrain and distance from existing population centers.
- Habitability and cataclysm status directly gate what Economics/Nations can do with a province — no population, no culture, no output until settled.
- Cataclysm spread (if simulated) needs rules for onset probability, spread rate, and reclamation cost/time.

### Dependencies
- **Countries** — reads province terrain/habitability to determine what can be claimed/settled and what territory yields.
- **Nations** — reads settled provinces to place cultural/ethnic population data.
- **Economics** — reads terrain/resources for production; reads habitability for what can be developed.
- **War** — reads terrain for logistics; may write cataclysm status as a consequence of extreme warfare.
- **Events** — likely source of dynamic cataclysm triggers, discoveries, disasters.

### Open Questions
- How deep should cataclysm simulation be — full spread/reclaim simulation, or simpler state-machine per province (dormant → active → contained → reclaimed)?
- Province count: confirm 5000 is the working target through prototyping, or scale down for tractability.
- Does adjacency also encode non-contiguous connections (sea routes, later "portals"/fantastical fast travel)?

---

