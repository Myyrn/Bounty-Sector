# [Game Title TBD] — Design Document
## Module: Economics

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: Economics

### Purpose
Economics is the material ground truth of the game. Under the project's core philosophy, no other module is allowed to store free-floating abstract numbers (prestige, "diplomatic capital," etc.) that aren't ultimately traceable back to real production, territory, and trade — Economics is where that traceability lives. It owns domestic production, resource chains, labor, and (as a subset) foreign trade — the "External Economics" that Diplomacy consumes but does not own.

### Core Concepts

**Resource Tiers**
A five-tier resource system, deliberately kept small enough to hold in one's head while still supporting real production-chain depth, shortages, and overproduction:

- **Raw (16)** — Grain, Livestock, Fine Horses, Fish, Timber, Stone, Iron Ore, Precious Metal Ore, Coal, Sulfur, Fiber, Wool, Hides, Salt, Herbs, Magical Reagents. Tied directly to World Map terrain/climate — a province's profile determines which raws it can yield.
- **Semi-Finished (13)** — Flour, Lumber, Cut Stone, Steel (Iron Ore+Coal), Refined Precious Metals, Cloth (Fiber+Wool), Tanned Leather, Preserved Food (Livestock *or* Fish + Salt — flexible sourcing), Gunpowder (Coal+Sulfur), Processed Reagents (Magical Reagents+Herbs), Paper (Fiber), Ink (Herbs), Quills/Printing Colors (Livestock).
- **Light Industry (7)** — Bread (Flour), Garments (Cloth), Furniture/Household Goods (Lumber+Cut Stone), Medicine (Processed Reagents+Herbs), Consumer/Luxury Goods (Refined Precious Metals), Printed Goods (Paper+Ink+Quills/Printing Colors).
- **Heavy Industry (7)** — Cold Weapons (Steel), Armor (Steel), Firearms (Steel+Gunpowder), Artillery (Steel+Gunpowder), Tools & Machinery, Ships, Fortifications.
- **Transport (3)** — Draft Animals (Livestock *or* Fine Horses — flexible sourcing), Carts/Carriages (Lumber+Steel), Transport Machinery (Tools & Machinery+Steel; gated to a later tech tier, opening room for rail/motorized transport later without a new category).

Note the deliberate exception: **Magical Reagents → Processed Reagents is a two-tier chain that stops there.** Processed Reagents are consumed directly by ritual actions (Internal Politics/Diplomacy/War) rather than becoming a further heavy-industry good. This keeps ritual magic capacity a live, recurring production question rather than something that can be stockpiled indefinitely.

Some goods use **flexible sourcing** — Preserved Food and Draft Animals can each be produced from either of two raw inputs depending on regional endowment. This lets countries feel geographically distinct without multiplying the total resource count.

**Skilled Labor**
Population is not an undifferentiated headcount — it carries a distribution of trained capacity across broad labor categories:
- **Agriculture**, **Extraction**, **Crafting/Industry**, **Ritual** (meteomancy — common meteomants, as distinct from named Archmages who belong to Characters), **Culture** (also produces the Culture psychological-need output, not just Printed Goods), **Medicine** (feeds the Medicine production chain and, presumably, a Health-adjacent material need directly, distinct from Culture), **Builders** (construction/infrastructure capacity — the labor input for provincial development, fortifications, and institutional buildings, shared territory with Administration's structural tools), **Diplomacy** (trained negotiators/envoys — the labor input Diplomacy's module draws on directly for conducting external negotiation, maintaining embassies/standing relationships, and participating credibly in multilateral Concerts; a distinct capacity from domestic Administration, not a repurposing of it), **Espionage** (trained foreign intelligence/covert-action operatives — distinct from Administration's domestic Secret Police, which is inward-facing; Espionage labor is what Diplomacy's covert toolkit draws on abroad), **Teaching** (replenishes skill in all categories, including itself, over time).
- **Army labor** is broken into distinct trained sub-categories rather than one undifferentiated "military" pool: **Shock Infantry, Skirmishers, Cavalry, Artillery, Siege Corps.** Each is its own slow-retraining skill category, feeding War's force composition — a country can be materially wealthy in Steel and Firearms and still field a poor army if its population lacks trained Cavalry or Siege Corps specifically. (Note: this is distinct from Administration's "Army" administrative Faction, which is one of the default templates producing Control/Coordination/Observation — a population's combat-labor skill and its political role as an internal actor are related but separately tracked.)

This means production bottlenecks can come from *either* insufficient raw material *or* insufficient trained population in the relevant category — a country can sit on plentiful Iron Ore and still under-produce Steel if too few of its people are skilled in Extraction/Crafting. Labor distribution is presumed to be **slow-moving** (retraining takes real time), making it a long-term strategic decision rather than a per-turn lever. A country that neglects Teaching should visibly de-skill over time across every other category — a genuine, realistic failure mode rather than a punishing abstraction.

**Shortage & Overproduction**
Chains are deep enough to produce real shortages (insufficient input stalls downstream production) and overproduction (surplus that must be stored, sold, or wasted). When a shared input runs short across multiple downstream goods (e.g., Steel needed by both Firearms and Tools), **prioritization between competing uses is an explicit player/AI decision**, exposed through a production-priority interface in country management — not something the simulation quietly resolves in the background. Choosing badly is expected to generate Internal Politics pressure.

**External Economics (Foreign Trade)**
A subset of Economics, not a separate module concern: trade agreements, export/import capacity, and vulnerability to sanctions/blockade are all Economics data. Diplomacy reads this data from both sides of a relationship (own country's needs and pressure; partner's capacity and vulnerability) to negotiate and act, but does not own or duplicate it.

**Production**

Extraction of resources and their processing always comes from population (internal actors) who use skilled labour to extract resources or transform them into more advanced goods, but resources don't come from provinces themselves.

### Player Interactions
- Direct production priorities across the resource chain, especially under scarcity.
- Invest in labor training/reallocation (shift population toward Agriculture, Crafting, Ritual, Culture, Teaching, etc. over time).
- Establish, adjust, or cut trade relationships (feeding into Diplomacy's negotiation layer).
- Invest in Teaching capacity to prevent long-term de-skilling.

### Systems & Rules (sketch, to refine later)
- Exact production formulas per chain step (linear, diminishing returns, etc.) — deferred until we have a sense of overall game pacing.
- Labor retraining rate and Teaching's replenishment formula.
- How trade volume/price is determined between two countries (pure negotiation vs. some underlying market abstraction).

### Dependencies
- **World Map** — raw resource availability is terrain-derived; settlement state gates production entirely.
- **Internal Politics** — unmet material needs (from shortages) generate political pressure; Culture-category labor output feeds the Culture psychological need directly.
- **Characters** — Archmages are a Characters concern; common meteomants (Ritual labor) are Economics' concern. The two interact but are owned separately.
- **Diplomacy** — consumes External Economics data (trade capacity, sanctions vulnerability) for negotiation and coercion; does not own it.
- **War** — Firearms/Artillery draw both a build cost (Steel) and a recurring use cost (Gunpowder), giving War a natural attrition/logistics lever; Transport goods feed army logistics.
- **Administration** — likely shares responsibility for Teaching capacity/infrastructure with Economics.

### Open Questions
- Exact shortage-cascade mechanics beyond "player chooses priority" — does an unresolved shortage also generate direct Internal Politics pressure automatically, or only via the *consequences* of the player's prioritization choice?
- Whether skilled-labor categories need sub-specialization later (e.g., distinguishing a master smith from a general Crafting laborer) or stay coarse-grained.
- Formal trade/price mechanism, to be resolved alongside Diplomacy.

---

