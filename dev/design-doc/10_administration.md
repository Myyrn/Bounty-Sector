# [Game Title TBD] — Design Document
## Module: Administration

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: Administration

### Purpose
Administration is where a ruler actually governs — not by decree alone, but by negotiating, persuading, and (when necessary) compelling the specific internal actors who hold real power within the country. It is the internal mirror of Countries' Sovereignty & Dependency model: externally, a country negotiates a freeform bundle of ceded/retained sovereignty with another country, sustained only as long as it's the best available deal; internally, a ruler negotiates a freeform bundle of voice, resources, and autonomy with internal actors, sustained on the same terms. "Unifying the nation" is not absorption into one central bureaucratic body — it is building a system flexible enough that every actor with real leverage has a reason to stay bought in. Administration is also where Internal Politics' deferred internal-actor/institution layer (parliament, nobility, clergy per the Government Triangle) actually lives.

### Core Concepts

**Factions (the actor layer)**
The base actor type is the **Faction**. Faction is smallest political unit, determined by combination nation + estate. This is layer which is mostly invisible to player, player usually see either nations as whole or estates as the whole, unless some big fracture among one estates appear.  **Estate** is — a small, fixed set of vertical strata present in every country by default: **Peasantry, Nobility/Feudal Elite, Clergy, Citizenry/Burghers.**  Each Estate holds a population share, a share of relevant material control (reading Economics — land for Nobility, Spiritual-need infrastructure for Clergy, trade/production for Citizenry, subsistence labor for Peasantry), and baseline leverage weighted by the country's Government Triangle position (a Feudal-heavy country structurally privileges Nobility's voice, Theocracy privileges Clergy, Republic privileges Citizenry/Peasantry).

Beyond the four defaults, additional Factions **spawn mechanically** under two independent gates, either sufficient on its own:
- **Concentration threshold** — a Faction candidate (Miners, a functional split of an existing Estate, etc.) becomes an active actor once its aggregate population/labor share crosses a hard cutoff, computed on existing Economics/Nations population rollups rather than per-individual.
- **Tag-gated** — some Factions only exist as a *possibility* at all if a flag is set on the country (Government Triangle position, a historical event such as "this province was annexed by conquest," a setting flag such as magocracy). Meteomants-as-political-bloc, for instance, doesn't enter the threshold check unless the relevant tag is present.

Once spawned, an active Faction persists with **hysteresis**: it despawns only if it decays below a *lower* threshold than the one that spawned it, and stays there for some duration — consistent with the project's "drift, not instant flip" philosophy (matching World Map's settlement states and Nations' core-strength drift). Tags themselves are the most durable layer, changed rarely and deliberately; active Factions are the middle layer; ephemeral Question-time clustering (below) is the least durable and is never stored.

Factions can also be **functional splits of a base Estate** rather than independent spawns — e.g., **Robe vs. Sword Nobility**, which maps directly onto the Institutional↔Personalistic axis: Robe is the institutional path to noble power (chartered office, bureaucratic rank), Sword is the personalistic path (martial service, personal loyalty, hereditary lineage). Both can coexist within one country as a standing source of internal friction.

**Nation as a fracture condition, not a permanent second axis**
Estates/Factions do not permanently split along Nation lines. Instead, every population unit underneath a Faction already carries a Nation tag (from Nations' data). Most of the time this doesn't matter and the Faction acts as one bloc. But **when a specific political Question arises**, the game computes each population-unit's stance on that Question and clusters those stances into effective voting blocs for that Question only — this clustering is never stored as persistent state. A Faction with homogeneous Nation composition, or one whose members' interests happen to align regardless of Nation, stays unified for a given Question. A Faction with skewed composition and divergent sympathy/interest across its Nation sub-groups fractures for that Question — e.g., "Culture A Nobility" vs. "Culture B Nobility" vs. "Culture C Nobility" — without ever being persistently modeled as three separate Factions. This is what allows vertical stratification (class) and horizontal stratification (Nation) to matter in different proportions depending on the issue, as an emergent, computed property rather than an authored one, and it keeps the system computationally cheap — fracture clustering runs on existing population rollups, on demand, per Question.

**Stance formula**
A population unit's stance on a given Question is driven **primarily by material self-interest** (its Faction's stake in the outcome via its current Obligations/Privileges/Rights), then modified by a **multiplicative cultural/Nation lens**: each Nation profile carries a short, fixed preference list — roughly 2 strong (±15%), 2 moderate (±10%), 2 mild (±5%) Question-type affinities, indifferent to all other Question types. Reaction Temperament (from Nations) acts as a secondary multiplier on top of this — it governs how fast/visibly the preference registers (a passionate Nation swings toward its ceiling quickly and visibly; a passive Nation with an identical preference list drifts slowly and can be walked back more easily), rather than changing what the Nation cares about.

**Social Contract (per-Faction)**
Each Faction holds a negotiated bundle, structurally identical in shape to Countries' dependency-axis model:
- **Obligations** — duties owed (labor, military service, tithe, taxation).
- **Rights** — baseline freedoms guaranteed regardless of Faction (thin for a locked-in serf Faction, near-total for Citizenry, also include privileges such as tax exemption, land ownership, right to bear arms, guild monopoly).

**Prestige** is computed, not authored — derived from privilege count/exclusivity, alignment with the country's current dominant legitimacy source (Triangle position), and economic weight. This makes social mobility self-regulating rather than needing a bespoke resentment system: a flood of new entrants into a high-Prestige Faction dilutes the very exclusivity that gave it Prestige, so incumbents resist inbound mobility proportional to (Prestige gap × volume of movement) — while a Faction with thin Rights and no exit valve (serfdom-style lock-in) generates its own pressure, reading into Internal Politics' Freedom need. Social mobility between Factions is therefore modeled as a literal negotiated Question like any other, resolved as a *rate*, not a binary flag.

**Faction Multiplicity (coup-proofing as a policy lever)**
A ruler can decree splitting a single administrative Faction (Army, Bureaucracy, Secret Police) into rival redundant branches producing the same labor type, each with independent Loyalty — insurance against any single branch's Loyalty collapse or defection. This is not free: redundant branches cannot be coordinated as efficiently as one unified institution, so splitting a Faction structurally shrinks effective Coordination throughput even while it buys resilience. The move is cheap and unremarkable for a Personalistic ruler (no formal justification needed — that's just how personal-loyalty politics works) but costly to justify — in Control spend, or in eroded Institutional legitimacy if done cynically — for an Institutional ruler, since a chartered, law-bound institution doesn't have an easy legal mechanism for "now there are two of these that hate each other." This gives Personalistic regimes a structural tendency toward fragmented, coup-resistant-but-administratively-weaker institutions over time, without a bespoke rule forcing it — it falls out of the cost asymmetry.

**Administrative Capacity — three resource pools**
Administering is not one abstract meter. It is split into three pools, corresponding to the classic state-capacity triad (control, coordination, legibility):
- **Control** — the power to make a Faction do something against its own stance; spent to force a Question's resolution outside Persuasion, at a direct Loyalty cost to the affected Faction.
- **Coordination** — the capacity to run many things, and many actors, at once without them working at cross-purposes. Determines effective Question-queue size (see Question Priority below) and is consumed by any effort requiring multiple Factions to act compatibly and simultaneously (a multi-Faction bundle deal, a war mobilization drawing on Nobility+Peasantry+Citizenry together).
- **Observation** — legibility: how accurately the true state of the country (Faction Loyalty, corruption, true Question-stances) is known. Deliberately *not* modeled as a fog-of-war/accuracy dial for now (flagged as a future direction, not built) — for the current scope, Observation functions as a spendable resource like the other two, primarily consumed by proactive audits/investigations.

Each of the three pools is fed by **all three default administrative Factions (Bureaucrats, Army, Secret Police), each contributing to all three pools at different weights** — not siloed one-labor-one-resource:

| Labor source | Control | Coordination | Observation |
|---|---|---|---|
| Army | High | Low | Low–Medium (garrison-local only) |
| Bureaucrats | Medium | High | Medium |
| Secret Police | High | Low | High |

This weighting is what gives the Institutional↔Personalistic axis a third place to bite: a Personalistic ruler leaning on Army+Secret Police gets strong Control and decent Observation but structurally starves Coordination (no institutional throughput to scale it), while an Institutional ruler investing in Bureaucrats gets strong Coordination and steady Observation at a Control-speed cost (force still exists, but must be procedurally/legally justified, making it slower and costlier per use).

Bureaucrats/Army/Secret Police are the three **default template** administrative Factions every country starts with, not a hardcoded ceiling — a ruler can found bespoke administrative institutions (a Meteomant Ministry in a magocracy, a Customs Office in a mercantile Republic) with their own custom Control/Coordination/Observation weighting, as a proactive structural tool (see Player Interactions).

**Corruption** is not a separate tracked stat — it is what accumulates in the gap where Observation isn't reaching. Improving Observation has a "sunlight" effect: existing hidden corruption is revealed (often as an unwelcome surprise) rather than being prevented outright.

**Questions & the Priority Queue**
A **Question** is any discrete political problem requiring resolution — a policy dispute, a privilege demand, a succession crisis, a famine response. Every Question carries a **severity tier**: roughly *existential* (war, famine, plague) > *structural* (estate privileges, succession, government-position shifts) > *routine* (minor policy adjustment). Only a limited number of Questions can be **active** at once — consuming ruler attention and Coordination throughput — with slots allocated by severity, so existential Questions can crowd lower-tier Questions out of the active queue entirely. This is the module's core pacing mechanism: nuanced internal-actor politics is structurally a peacetime luxury, not by design fiat but because the queue is full during a real crisis. It also makes "manufacture a common enemy" a legible, costed strategic tool (see Player Interactions) rather than a bespoke rally-around-the-flag system — an escalated external Question simply bumps weaker internal Questions off the active slate.

**Resolving a Question**
Every Question carries a **weight**. The ruler covers that weight through some combination of:
- **Persuasion** — propose a Social Contract bundle (Obligations/Privileges/Rights terms); Factions evaluate it against their stance (material self-interest × cultural/Nation modifier). Whatever weight is covered by Factions who accept is resolved cooperatively — cost is paid in future terms granted, not in spendable resources, and it builds Loyalty.
- **Control** — spend directly to force through whatever weight Persuasion didn't cover, at a Loyalty cost to the Factions overridden.
- Any weight left uncovered by both **strikes Loyalty directly** for the Factions whose necessities went unmet.

An unresolved Question does not just sit inertly — if a Faction's necessities go unmet for long enough, that Faction may act unilaterally: it goes **De Facto Autonomous**, resolving the problem itself outside central authority. This becomes, in practice, a new privilege the Faction has seized rather than been granted — it damages the Faction's relationship with the central government, and (since Prestige and privilege are comparative) makes *other* Factions jealous, pushing the whole social balance toward wanting equivalent concessions. This is a soft, contagious, and partly reversible failure state between "stable" and "open rebellion" — and it is the same underlying mechanism by which World Map/Countries' "administrative reach" was originally imagined, just expressed as a Faction-driven event rather than a static distance-decay formula.

**Loyalty**
A Faction-level stat, structurally similar to Nations' Sympathy: a **structural baseline** (Privileges vs. Obligations balance), a **historical modifier** (accumulated Question outcomes — Persuasion wins are strongly positive, Control losses are strongly negative, presumed to decay over time absent reinforcement), and a **floor behavior** when Loyalty collapses that depends on whether the country's institutions provide a release valve (a formal complaint/protest channel, gated by Institutional-leaning governance and/or specific Faction Rights) — if a valve exists, collapsing Loyalty vents into a resolvable Question; if none exists, it goes straight to crisis.

**Crisis & Rebellion outcomes**
When a crisis is not resolved as a win for the ruler, the rebelling Faction's outcome maps onto Countries' existing lifecycle transitions rather than inventing new ones:
- **Secession to no-state (neutral)** — the same underlying event as Nations' Statehood Pathway, viewed from a different lens: when the rebelling Faction and a majority-population Nation-in-territory coincide, this reads as a Nation's independence bid; when the rebelling Faction is cross-cultural (e.g., all Nobility, regardless of Nation, revolting over privileges), it reads as pure Countries Formation-via-secession with no Nations angle.
- **Defection to an existing state** — friendly *or* hostile to the previous overlord, not necessarily an enemy. An extreme, crisis-triggered version of the Sovereignty & Dependency model: the Faction unilaterally chooses a new overlord mid-crisis rather than through negotiated terms, gated by whether a receiving country's Countries-level bilateral relations are favorable enough to accept.

**Government Triangle and Institutional↔Personalistic are read, not written, by Administration** — deliberately no automatic feedback loop where sustained Control usage or Persuasion success pulls the axis position. The two axes are treated as independent inputs Administration consumes, not outputs it produces (open to revisiting, see Open Questions).

### Player Interactions
**Reactive (Question resolution)**
- Propose Persuasion bundles to cover a Question's weight.
- Spend Control to force through uncovered weight.
- Let weight go uncovered and absorb the Loyalty hit deliberately (a legitimate, if risky, choice under scarcity).

**Structural**
- Found a bespoke administrative institution with a custom Control/Coordination/Observation weighting.
- Split a Faction into redundant rival branches (coup-proofing) or merge rival branches back for efficiency.
- Charter or revoke Obligations/Privileges/Rights outright, independent of an active Question.

**Distributive**
- Grant unsolicited boons to a Faction with declining Loyalty, pre-empting a forced Question later.
- Rebalance skilled labor allocation across Control/Coordination/Observation-producing Factions.
- Sponsor a Faction's economic/cultural standing to shift its Prestige deliberately (lift an underprivileged Faction, or elevate a loyal one as a counterweight to a rising threat).
- Give direct rewards/gifts (money or goods) to specific Factions or, pending Characters, specific individuals.
- Replace key figures occupying Faction-leadership positions (full mechanics deferred to Characters).

**Informational**
- Commission a general audit/census (region- or Faction-targeted) to surface hidden Loyalty decay or corruption.
- Investigate a specific rumor or suspected conspiracy — narrower and cheaper than a general audit.

**Legitimacy / doctrine (slow, standing policy)**
- Deliberately shift Institutional↔Personalistic positioning over time (reform, succession law, court ritual).
- Set standing doctrine/favoritism toward a specific Faction, biasing future default Persuasion terms without re-litigating it Question by Question.

**Crisis-mode**
- Declare emergency powers — temporary Control boost at Coordination/Observation expense, with its own legitimacy cost the longer it's sustained.
- Deliberately escalate an external Question (manufacture/inflame a common enemy) to bump lower-tier internal Questions off the active queue.

**Adjacent levers (outside Administration's direct ownership but ruler-directed through it)**
- Intervene in Economics' planning posture — push production toward more centrally planned or more decentralized/autonomous, a standing policy dial rather than a per-good decision.
- Set border-control and customs-control policy — adjacent to External Economics and Diplomacy, but administered through this module's execution layer.

### Systems & Rules (sketch, to refine later)
- Exact Faction spawn/despawn threshold values and hysteresis gap size.
- Exact stance formula weighting (material baseline × cultural modifier — confirmed multiplicative, exact curve TBD).
- Question weight-coverage math — how Persuasion-covered weight, Control-covered weight, and uncovered weight combine, and the exact Loyalty-cost curve for each path.
- De Facto Autonomy's exact contagion mechanic — how strongly one Faction's unilateral action increases other Factions' privilege demands.
- Control/Coordination/Observation exact formulas from the three-Faction contribution matrix, and how bespoke founded institutions get assigned their own weights.

### Dependencies
- **Countries** — Government Triangle and Institutional↔Personalistic position are read directly; Faction rebellion outcomes resolve into Countries' existing lifecycle transitions (Formation via secession, dependency/defection).
- **Nations** — Faction fracture-on-Question clustering reads Nation tags and Reaction Temperament; rebellion-via-secession is the same event as Nations' Statehood Pathway viewed from a different angle.
- **Internal Politics** — supplies the deferred internal-actor/institution layer this module now owns; Faction Rights-poverty and De Facto Autonomy feed Freedom/Order/Solidarity pressure.
- **Economics** — Faction material control and the three administrative labor pools (Bureaucrats/Army/Secret Police default templates, plus any bespoke founded institution) are Skilled Labor categories owned there; economic planning-posture is a proactive Administration lever over Economics data.
- **Characters** — Faction leadership (replacement, reward, personal-loyalty dynamics under Personalistic governance) is a known, currently-deferred dependency baked directly into Control's formula.
- **War** — Faction rebellion/defection and De Facto Autonomy are likely War-adjacent trigger conditions once War is designed; emergency-powers Control boosts likely correspond to wartime mobilization.
- **Diplomacy** — border/customs control and defection-to-a-friendly-state outcomes read Diplomacy's bilateral relations data.

### Open Questions
- Should Government Triangle / Institutional↔Personalistic positioning feed back from sustained Administration behavior (a long run of Persuasion-heavy governance pulling toward Institutional), or stay a one-directional input as currently specified?
- Does an unresolved Question have a hard time limit before it forces De Facto Autonomy, or is the threshold purely Loyalty-level-based with no explicit clock?
- Full rival-branch dynamics — do two coup-proofed rival Factions (e.g., two Secret Police branches) actively compete for the ruler's favor as a source of their own emergent Questions? Flagged as good texture, not yet formalized.
- Exact mechanics of founding a bespoke administrative institution — is the custom Control/Coordination/Observation weighting player-chosen freely, or constrained/suggested by the tags and labor base that justified founding it in the first place?

---

