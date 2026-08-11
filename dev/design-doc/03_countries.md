# [Game Title TBD] — Design Document
## Module: Countries

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: Countries

### Purpose
Countries is the political/administrative layer: sovereign (or partially sovereign) actors that claim and govern territory, hold relationships with each other, and act as the primary "player-controllable" entity type. Countries owns *statehood*, not *peoplehood* — cultural/ethnic identity belongs to Nations.

### Core Concepts

**Country**
A political entity with:
- **Territory** — the set of provinces owned/controlled, and a capital.
- **Government** — see Government Triangle below.
- **Standing/soft-power stats** — prestige, reputation, trust, cultural influence, economic leverage, or similar tracked values comparable between countries (the soft-power equivalent of "army strength" in a hard-power game).
- **Population (aggregate)** — raw demographic/economic numbers per province, distinct from the *identity* breakdown of that population (which is Nations' domain).
- **Relations state** — per-country-pair, likely including: opinion (bilateral, not global), claims, goals, and diplomatic casus belli — see Diplomatic Relationship Model below.

**Diplomatic Relationship Model — no global tension metric**
Escalation toward large-scale conflict is explicitly **not** a global meter. It is the emergent sum of bilateral relationships. Each country maintains, per other country:
- **Opinion** — how it feels about that country.
- **Claims** — territorial or political claims it holds against that country.
- **Goals** — what it wants from/with that country.
- **Casus belli** — specific diplomatic justifications that would legitimize aggressive action, earned or lost through events, broken agreements, etc.

This means "how close is the world to war" is not a readable global number — it's a distributed property of the relationship graph, matching the "routes, not phases" philosophy: escalation is a possible emergent path, not a scripted stage, and it cascades from local conflicts rather than a global trigger.

**Sovereignty & Dependency — the "social contract" model**
Dependency between countries is **freeform**, not a fixed set of vassal tiers. It's modeled as a negotiated bundle of ceded/retained sovereignty axes (foreign policy, military, economics/trade, culture/language, government form, and likely others such as legal system or religion). A subject accepts a given arrangement only so long as it's perceived as the best available option — even if that just means "the least-bad option." This implies:
- Dependency agreements need to be **renegotiable**, not fixed at creation.
- There must be some underlying **satisfaction/legitimacy check** — the subject's willingness to remain in the arrangement, which can erode (from Nations' sympathies, Internal Politics pressure, or a better offer from a rival power) and eventually break.
- This is a genuine alternative lever to conquest: a country can "win" territory/influence by being the best available overlord, not just the strongest army.

**Confederation**
A distinct structure from dependency: a **treaty-bound alliance of nominal equals with no shared central authority** — as opposed to a federation-style entity with its own governing layer. Countries remain fully sovereign but bound by mutual treaty obligations.

**Country Lifecycle**
Countries are not static. Supported transitions (mechanics needed, not just flavor):
- **Formation** — from settlement reaching statehood, from secession, or from a Nation achieving independent statehood.
- **Dissolution** — collapse, absorption into another country.
- **Merger** — unification of two or more countries.
- **Entering/exiting dependency** — becoming a subject, renegotiating terms, or breaking free.
- **Joining/leaving a confederation.**

**Government Model — two independent axes**
Government type is not a fixed category but a position on **two independent spectrums**, deliberately decoupled from each other:

1. **The Triangle (legitimacy source)** — a blend across three vertices: **Republic, Feudal, Theocracy** (e.g., 70% Feudal / 20% Theocracy / 10% Republic = a religiously-sanctioned feudal realm). Each vertex represents a distinct **source of legitimacy** and set of internal actors/levers:
   - **Republic** — legitimacy from popular mandate / institutions (parliament, electorate, bureaucracy as internal actors).
   - **Feudal** — legitimacy from bloodline / personal authority and land-based obligation (nobility, court, personal loyalty networks as internal actors).
   - **Theocracy** — legitimacy from religious sanction (clergy, doctrine, religious institutions as internal actors).

2. **Institutional ↔ Personalistic (exercise of power)** — independent of *where* legitimacy comes from, this spectrum describes *how* power is actually exercised once held. An **Institutional** country governs through durable, codified structures (offices, charters, standing law) that outlive any individual office-holder. A **Personalistic** country governs through direct, individual loyalty to a specific ruler or patron, with much weaker structures underneath.

The two axes combine independently, producing meaningfully distinct national character even at the same Triangle position: a Feudal-Institutional realm runs on chartered rights, estates, and codified feudal law — power is personal in *origin* but exercised through durable structures. A Feudal-Personalistic realm is pure court intrigue — loyalty to *this* lord, not the office. A Republic can be a technocratic institution-state or a personalist strongman wearing republican clothes; a Theocracy can be a bureaucratic priesthood or a charismatic-prophet cult of personality.

Together, these two axes are load-bearing for **Internal Politics** and, especially, **Administration** — they determine which levers are most effective for a ruler to stay in power, what internal crises look like, and (per Administration's design) how each of Control/Coordination/Observation scales and what it costs to use them. Countries' role is to hold and expose both positions as data; it does not own the deeper mechanics of how they're wielded.

### Player Interactions
- Direct a country's territorial claims, settlement priorities, and diplomatic posture.
- Negotiate and renegotiate dependency arrangements (as overlord or subject).
- Form, join, or leave confederations.
- Pursue formation/merger paths (e.g., backing a Nation's independence bid, pursuing unification).
- Shift government position within the Triangle, or along the Institutional↔Personalistic spectrum, over time (presumably a slow, contested internal process — Administration is the module that executes this via its proactive doctrine-setting tools).

### Systems & Rules (sketch, to refine later)
- Dependency satisfaction needs a formula/model: inputs likely include Nations' sympathy, Internal Politics stability, relative treatment vs. peers, and comparison to rival offers.
- Casus belli generation/expiry rules — what events grant or revoke them.
- Government Triangle and Institutional↔Personalistic movement — rate limits, triggers (revolutions, reforms, succession, religious upheaval).

### Dependencies
- **World Map** — territory is a set of provinces; expansion is gated by settlement.
- **Nations** — population identity/sympathy feeds dependency satisfaction and legitimacy; a Nation's sympathy can drive secession or formation events.
- **Internal Politics** — consumes government triangle position; supplies stability/legitimacy back to Countries.
- **Diplomacy** — likely owns the deeper mechanics of opinion/claims/casus belli resolution; Countries holds the data structure.
- **Administration** — likely governs how effectively a country's stated policies actually get implemented across its territory (relevant especially for dependents/confederations).
- **War** — consumes casus belli and relationship state as prerequisites/justifications for conflict.
- **Economics** — reads territory and population; feeds back leverage/wealth as a soft-power stat.

### Open Questions
- Is a dependent country still a "full" Country entity (own government, own triangle position) just constrained on ceded axes, or does deep dependency eventually collapse most of its independent state? (Leaning toward: full entity, constrained by axes — consistent with the freeform social-contract model — but worth confirming.)
- What exactly triggers Nation-driven country formation (secession)? Presumably lives partly in Nations, partly in Internal Politics — flag for when we design those.
- Does the confederation structure have any mechanical teeth beyond treaty obligations (shared defense, shared trade terms), or is it purely a diplomatic/legal wrapper?

---

