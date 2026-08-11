# [Game Title TBD] — Design Document
## Module: War

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: War

### Purpose
War is the emergent worst-case outcome when Administration's internal negotiation and Diplomacy's external negotiation both fail to produce an acceptable resolution — not the game's central mechanic, and not typically the efficient path to a goal. Per the project's founding thesis and this session's guiding line — *war is the continuation of politics by other means, and it is never won by bravery alone* — War is designed so that logistics, administration, and diplomacy determine outcomes at least as much as battlefield tactics do. War does not invent a new scoring or negotiation system; it is, mechanically, where Administration's Loyalty/Faction-damage model and Diplomacy's Leverage/negotiation model get read out through combat and sieges, then written back to both.

### Core Concepts

**Unit roster (seven categories, matching Economics' Army Skilled Labor)**
Skirmishers, Shock Infantry, Pikemen, Cavalry, Artillery, Siege Corps, and Mages. Mages draw directly on Economics' existing **Ritual** Skilled Labor pool rather than a separate combat-specific category — a country's investment (or neglect) of Ritual capacity is felt identically in its magocratic institutions and on its battlefields. A Mage unit blends artillery-like, support/buff, and disruption roles into a single unit type rather than being split into sub-roles.

**Technology tier — Cold Steel vs. Gunpowder-capable**
A country- (or province-) level flag, not a second unit roster: all seven unit categories persist across both eras. Gunpowder tier grants a significant effectiveness bonus to infantry, cavalry, and artillery, but that bonus is **conditional on live supply** — firearms and ammunition/gunpowder must be actively flowing through Supply (below), not merely researched. A gunpowder-tier army cut off from its ammunition supply degrades toward, or below, cold-steel effectiveness rather than simply losing a flat bonus — the tech advantage is only ever as real as the logistics sustaining it.

**Supply / Logistics — the load-bearing system**
An army's effective combat strength is its raw composition **modified directly by its Supply state**, not merely gated by it. Supply decays with distance from a supply source, following the same distance-decay pattern already used for Nations' core strength and World Map's terrain-driven habitability — reading terrain and province data directly (harsh terrain, poor infrastructure, or long distance from a supply base degrades Supply faster). Supply consumes real Economics goods as ongoing upkeep (food, and — at gunpowder tier — ammunition/powder specifically) and can be **actively cut** by an enemy (raiding supply lines, besieging a supply source) rather than only fading passively over distance and time. Builders' Skilled Labor and provincial development/fortification quality feed Supply infrastructure resilience directly. Because Supply modifies combat effectiveness at every phase (below) rather than only gating whether a battle can be fought, a numerically superior but poorly-supplied force can lose decisively to a smaller, well-supplied one — the mechanical expression of "logistics over bravery."

**Battle resolution — three phases**
- **Skirmish** — Skirmishers, Artillery, and Mages act as the ranged/preparatory phase. Gunpowder-tier Skirmishers/Artillery with live ammunition supply should dominate this phase especially hard against a cold-steel opponent, since this is precisely the phase where firepower-without-closing-distance matters most.
- **Melee** — Shock Infantry, Pikemen, and Cavalry resolve direct contact, with genuine composition counterplay: Pikemen check Cavalry, Shock Infantry can break Pikemen formations, unprotected Cavalry can flank and rout Skirmishers/Artillery if it reaches them. This is the primary place army-composition skill expresses itself.
- **Rout** — morale/cohesion, itself a function of how the prior two phases went plus each side's current Supply state and War Exhaustion level, determines whether the losing side breaks cleanly (triggering pursuit and disproportionate casualties/captures) or withdraws in order (costing the winner the chance to convert a win into a rout).

There is no separate "commander skill" stat for now — per this session's clarification, "a talented commander" currently means a *player* who understands army composition, phase order, and Supply positioning, not a hidden modifier. Characters, once designed, will layer named-individual command bonuses onto this same phase structure without needing to change its shape.

**Sieges — distinct from field battles**
A fortified settlement (castle, city, fortified temple complex) does not resolve through the skirmish/melee/rout structure. It **endures for a duration** determined by its fortification level (fed by Builders investment and provincial development) and the besieger's Siege Corps strength and Supply state, accruing War Score/Exhaustion attritionally over that duration (via bombardment, blockade-driven material deprivation, disease) rather than through a single resolved event, before eventually surrendering if not relieved. A besieging force's own Supply is simultaneously under strain for the duration, giving the defender a real incentive to simply hold out rather than sally.

**War Score — a computed damage ledger, not a spendable meter**
War Score is not an independent invented value; it is Administration's existing Loyalty/Faction-satisfaction damage model, externalized and logged over the course of a war. Every engagement, siege, blockade, or raid that lands writes an entry: which side, which specific Faction of the target took the hit, how much Loyalty/satisfaction damage, and the material cause (a besieged province cuts a Faction's material base; a lost field battle damages a war-veto-holding Nobility's Prestige directly; a burned harvest strikes Peasantry's ability to meet its Obligations). The running signed total across the war *is* War Score — a history of inflicted damage, not a currency. This is the same skin/skeleton pattern already established between Administration and Diplomacy, here wearing "history of the war" as its surface presentation.

This also makes **deliberate Faction-targeting a real strategic choice**: a campaign can be aimed at maximizing damage to a specific enemy Faction (razing farmland to hurt Peasantry, blockading trade to hurt Citizenry, seizing land to hurt Nobility) rather than simply pursuing the most militarily efficient objective — because the eventual peace conference cares about *whose* Loyalty has cratered, not just how much territory changed hands.

**War Exhaustion — per-Faction, not a single national dial**
War Exhaustion is **not** one country-wide number. It ticks **separately for every internal Faction**, at different rates reflecting how directly that Faction bears the war's costs — Peasantry (who supply the bulk of drafted labor and absorb material hardship most directly) accrues Exhaustion fast; Nobility (further from direct hardship, and often the Faction whose Prestige is served by the war in the first place) accrues it slowly. A country's overall War Exhaustion rating is the aggregate of every Faction's individual Exhaustion. Mechanically, Exhaustion applies as ongoing Loyalty pressure **specific to the Faction accruing it**, and feeds Internal Politics' Subsistence/Security needs for the population underlying that Faction. Once a Faction's individual Exhaustion crosses a threshold, it can generate its own Administration Question demanding peace — and this can happen even to a Faction that fully supported the war's outset, even one holding a Strong Veto over war/peace, since Exhaustion accrues from bearing the cost, independent of whether the Faction agreed with the decision.

**Peace conferences — capability assessment, not War Score arithmetic**
A peace conference is another instance of the mirrored-stance negotiation pattern shared by Administration and Diplomacy: a proposed settlement (territorial cession, indemnity, treaty terms) is evaluated by the other side against their **genuine capacity to continue fighting** — remaining Supply state, army composition and readiness, occupied territory, remaining Exhaustion headroom across their Factions, and whether allied commitments from the treaty-graph cascade are still holding — not against the raw War Score number directly. War Score functions as *context* that shifts how a side weighs its own continuation-capability (a side deep underwater on War Score should discount its own prospects more readily, having already seen concretely what continuing costs) rather than as a formula input with a fixed conversion rate to territory or gold. This deliberately allows a side "winning" on War Score but structurally exhausted to be talked into a worse peace than the ledger alone would suggest, and a side that's absorbed heavy damage but retains fresh reserves and intact Supply to hold out for better terms — a more interesting and more realistic negotiation than a scoreboard payout.

### Player Interactions
- Compose armies from available Army Skilled Labor (including Mages via Ritual), balanced against Coordination cost to mobilize/field multiple Factions' contributions simultaneously (reading Administration's existing Coordination pool).
- Position, supply, and route armies, actively managing Supply lines and their vulnerability to enemy interdiction.
- Choose when and where to give battle, and (implicitly, through composition and positioning) shape how each of the three phases plays out.
- Conduct or endure sieges, investing Builders labor in fortification beforehand as a strategic long-term choice.
- Deliberately target campaigns at a specific enemy Faction's material base to shape the War Score ledger strategically, rather than only pursuing the most militarily efficient objective.
- Propose and evaluate peace terms, reading both sides' genuine continuation-capability, not just the War Score history.
- Manage domestic War Exhaustion proactively — knowing which of your own Factions are nearing their threshold, and pre-empting the peace-demand Question the way any other Administration Question can be pre-empted.

### Systems & Rules (sketch, to refine later)
- Exact Supply distance-decay formula and its interaction with terrain/province data from World Map.
- Exact per-phase combat math and the composition-counter strengths between unit types (Pikemen vs. Cavalry, etc.).
- Siege endurance formula — how fortification level, Builders investment, Siege Corps strength, and besieger Supply combine into a duration.
- Exact per-Faction War Exhaustion accrual rates and their relationship to that Faction's direct material/labor contribution to the war effort.
- Whether "breaking" a Faction's Strong Veto applies identically when that Faction is demanding *peace* against the ruler's wish to continue, as it does when a Faction blocks a war *declaration* — same mechanic in reverse, or does continuing a war against War-Exhaustion-driven dissent need its own distinct override path?

### Dependencies
- **Administration** — War Score is Administration's Loyalty/Faction-damage model read externally; per-Faction War Exhaustion feeds Faction Loyalty directly and can spawn Administration Questions; breaking a Strong Veto to declare or continue a war is Administration's existing override mechanic.
- **Diplomacy** — CB legitimacy and severity gate what a war can justify; the treaty-graph cascade determines who else is drawn in; peace conferences use Diplomacy's mirrored-negotiation pattern and resolve into Countries-level territorial/treaty changes.
- **Economics** — the seven Army Skilled Labor categories (plus Ritual for Mages) are the material basis of every army; Supply upkeep consumes real goods (food, and gunpowder-tier ammunition specifically); Builders feeds fortification.
- **World Map** — terrain and province data drive Supply decay and siege positioning.
- **Nations** — divided-nation flashpoints and the Statehood Pathway are recurring war triggers; a war's outcome can resolve a Nation's statehood bid directly.
- **Characters** — deferred; named commanders will eventually layer a real bonus onto the existing phase structure, and are the eventual home for "talented commander" beyond player skill.

### Open Questions
- Does breaking a Strong Veto to *continue* a war against Exhaustion-driven Faction dissent work identically to breaking one to *declare* a war, or does it need its own distinct (likely steeper) cost curve?
- Naval warfare is entirely undesigned — not yet clear whether it's a distinct eighth-plus unit category, a Supply/logistics modifier (blockade, sea-based reinforcement routes), or both. Flagged for a future session.
- Does occupied-but-not-annexed territory produce its own ongoing effects (reads as a temporary, low-legitimacy dependency? generates its own Administration Questions for the occupier, per an occupied population's own Faction structure?) or is occupation mechanically inert until the peace conference resolves it?
- Is there any use for the War Score ledger beyond conference-context and post-war historical record (e.g., feeding long-term Opinion/grudge state in Diplomacy), or is that its full scope?

---

