# [Game Title TBD] — Design Document
## Module: Internal Politics

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: Internal Politics

*Note: this section currently covers population needs and the pressure-generation half of the decision engine, which is the ground this module shares most directly with Economics and Nations. Internal actors/institutions (parliament, nobility, clergy per the Government Triangle), stability mechanics, and unrest/crisis resolution are still to be discussed in depth.*

### Purpose
Internal Politics is where a country's population's wants and dissatisfactions become measurable pressure — and, together with Economics, the source of the "goals" that Diplomacy, External Economics, and War later act on. It is explicitly not a place for abstract, freely-spent metrics: pressure and unrest should always be traceable back to specific unmet needs.

### Core Concepts

**Psychological Needs (8)**
A deliberately small set, each with a distinct, non-overlapping job:
1. **Security** — freedom from violence, war exposure, crime.
2. **Order** — predictable governance, rule of law, low corruption (*vertical* trust — population's trust in institutions).
3. **Identity/Autonomy** — cultural, linguistic, religious recognition; not being ruled by a resented outside power. Primary hook for Nations.
4. **Solidarity** — cohesion and trust *between* groups/Nations within the country (*horizontal* trust). Modeled as sensitive to the *spread* of how well-served different internal groups feel, not just the average — a government overemphasizing one group depresses Solidarity even if overall treatment looks fine on paper. Second hook for Nations.
5. **Status/Esteem** — international respect; population reacts to their country being humiliated or elevated on the world stage.
6. **Freedom** — civil liberties and expression under one's *own* government (distinct from Autonomy, which is about outside control).
7. **Culture** — secular arts, aesthetics, intellectual life, entertainment. Fed directly by Economics' Culture labor category.
8. **Spiritual** — religion, cosmic/existential purpose.

Material needs (Sustenance, Shelter, Health, Clothing, Comfort, Security-capacity, etc.) are satisfied by Economics' resource chains; these 8 are the non-material layer Internal Politics owns directly.

**Pressure Generation**
Unmet needs — material (via Economics shortfalls) or psychological (via this module) — generate **pressure**, which crystallizes into concrete **goals** a country's government must eventually respond to. Pressure is meant to always be traceable to specific unmet needs, never an independent free-floating "unrest" number.

Also, economy constantly grows, so usually necessities slightly exceed what population actually needs to survive. This should be simulated to simulate why nations (or countries) expand instead of creating ecological system which needs exactly as much as it already absorbs from environment.

**Tradition/Mentality**
National tradition acts as a **multiplier on decision weight**, not a predefined path. It biases which methods (negotiation, trade, coercion, war) a country favors when responding to pressure, without hard-locking it into a fixed behavioral script — consistent with the project's "every country takes the easiest effective path" philosophy.

### Player Interactions
- Monitor need-satisfaction across the population (likely broken down per Nation/group, given Solidarity's group-spread sensitivity).
- Direct policy toward specific needs (though the actual toolkit for *doing* this likely spans Administration, Diplomacy, and Economics rather than living entirely here).
- Observe and respond to pressure before it crystallizes into destabilizing goals.

### Systems & Rules (sketch, to refine later)
- Exact formula for how unmet needs convert into pressure, and pressure into a concrete goal.
- How Solidarity's "spread" calculation works precisely (variance across groups? weighted by group size?).
- How Tradition/Mentality is represented (a fixed per-country trait set, something that can drift over time, or both).
- Decision engine execution split (confirmed structure, mechanics deferred): Internal Politics + Economics generate pressure/goals → Diplomacy, External Economics, and War evaluate available methods and their real material cost/risk, and select the cheapest effective option, or stall if all options score badly.

### Dependencies
- **Economics** — material need satisfaction; Culture-labor output feeds the Culture need; shortages feed pressure.
- **Nations** — Identity/Autonomy and Solidarity are the primary mechanical bridge; Nations likely supplies the underlying sympathy/group data this module reads.
- **Countries** — Government Triangle position determines which internal actors/levers matter and how crises manifest (deferred: actor-level mechanics).
- **Diplomacy / External Economics / War** — the execution layer that consumes goals generated here.
- **Characters** — rulers, court, clergy, etc. as embodiments of the internal actors implied by the Government Triangle (deferred).

### Open Questions
- Full actor/institution model (parliament, nobility, clergy) tied to Government Triangle position — not yet designed.
- Stability/unrest/crisis resolution mechanics — not yet designed.
- Whether pressure/goals are tracked per-Nation-within-a-country as well as country-wide (seems necessary given Solidarity, but not yet formalized).

---

