# [Game Title TBD] — Design Document
## Module: Diplomacy

*Split from design-document_0_8.md (v0.8) on 2026-08-11. Part of a 15-document module set; see `00_index.md` for the full set and `cross_module_notes.md` for notes shared across modules.*

---

## Module: Diplomacy

### Purpose
Diplomacy governs how a country pursues its goals against other sovereign actors — through competition, leverage, negotiation, and (short of open war) coercion. Where Administration is about reaching internal consensus to act as one body, Diplomacy is deliberately the opposite register: it should read to the player as a contest of goals and leverage between rival powers, not as a search for agreement. A skilled player may come to recognize that Diplomacy's proposals are ultimately gated by the same domestic buy-in machinery Administration runs internally — but that recognition should be an earned insight, not a surfaced mechanic. The two modules share an underlying skeleton (stance evaluation, weighted negotiation, Persuasion/Control-shaped resolution) but present entirely different skins, and Diplomacy never exposes Administration's vocabulary (Loyalty, Faction, Question) directly to the player.

### Core Concepts

**Leverage — the negotiating currency, computed rather than spent**
Leverage is not an abstract points pool; it's a computed credibility check, re-derived per country-pair and per proposal from data other modules already own:
- **Economic leverage** — reads External Economics: does the country supply something the counterpart can't easily substitute (resource dependency, trade-route reliance)? Grounds sanction/blockade threats directly.
- **Military leverage** — reads War's force projection as implicit threat capacity, distinct from an actual declared war.
- **Cultural/kin-state leverage** — reads Nations directly: a state's standing with a co-national population living under a foreign flag is leverage specifically over the country governing that population. Qualitatively different from the other two — it isn't "I can hurt you," it's "your own people trust me more than they trust you," and it is the direct mechanical execution of Nations' kin-state/sympathy design from the earliest sessions.
- **Reputational leverage** — a country's track record of honoring or breaking past commitments. A habitual treaty-breaker's future offers and guarantees are worth structurally less; this is not a punitive flag but a natural devaluation, keeping the cost of reneging non-punitive-feeling while still real.

A proposal backed by real Leverage is credible and more likely to be accepted; the same proposal with no Leverage behind it reads as an empty threat, likely rejected and Opinion-damaging for the asker.

**Goals — the demand-generation engine**
Every country runs a small stack of active external Goals at any time, each traceable to a concrete source rather than invented for AI flavor: unmet material needs (Economics shortages → secure access), unmet psychological needs (Status/Esteem → recognition relative to a rival; Identity/Autonomy → protection of co-nationals abroad), or an Administration Question whose resolution specifically requires an external partner. Diplomatic behavior — including AI behavior — should always be traceable to one of these sources, consistent with the project's anti-abstraction discipline.

**Casus Belli — earned, decaying, graded**
CB is earned through specific triggers (broken treaty, ignored claim, kin-state persecution crossing a threshold, cataclysm-use) and decays if unused, structurally identical to Nations' standing-modifier decay. CB carries a **severity/legitimacy gradient** rather than a binary flag: a weak CB (a minor claim) justifies only a limited war goal and is reputationally costly if leaned on too hard; a strong CB (active persecution of co-nationals) justifies a much larger war goal with minimal reputational cost, because the aggression reads as legitimate to observers. Fabricating or overreaching on a weak CB should generate real domestic pushback (an Administration Question) independent of how the resulting war goes.

**Negotiation resolution — mirrored stance evaluation, never exposed**
A proposal from Country A to Country B is evaluated by B using the same *shape* of formula Administration uses for domestic Faction stance: B's own active Goals weighed against Opinion (the relationship's accumulated history) and the credibility of A's backing Leverage, further shaped by B's own government character (a Personalistic B may accept a worse deal for the ruler's personal enrichment/prestige that Institutional B's internal actors would block). The player never sees B's internal math — only B's acceptance, counter-offer, or refusal.

**Diplomacy and Espionage as dedicated Skilled Labor — not a projection of domestic capacity**
Diplomacy is deliberately **not** modeled as domestic Control/Coordination/Observation channeled abroad through some gateway — a country's ability to act externally is its own trained capacity, tracked as its own Skilled Labor categories in Economics:
- **Diplomacy labor** — trained envoys/negotiators. This is the material input for conducting negotiations, maintaining standing embassies/relationships, and participating credibly in multilateral Concerts (see below). A country materially strong at home but under-invested in Diplomacy labor should be genuinely inept abroad — slow, easily out-negotiated, unable to sustain many simultaneous relationships — regardless of how much domestic administrative surplus it has.
- **Espionage labor** — trained foreign intelligence/covert-action operatives, explicitly distinct from Administration's Secret Police (which is inward-facing, domestic Observation/Control). Espionage labor is what Diplomacy's covert toolkit draws on: intelligence-gathering on a rival's true Goals/Leverage/internal stability, and covert action against a rival's own internal stability.

This keeps Diplomacy's material grounding consistent with everything else — no free-floating "diplomatic capacity" — while keeping it a genuinely separate capability from domestic Administration rather than a reskinned export of it.

**Ratification interface with Administration (established this session)**
Once a diplomatic action is decided on (ratify a treaty, declare a war, cede territory), it is either ratified or not — no partial/degraded ratification. Internally, this checks against the relevant Faction(s)' Social Contract:
- If no Faction holds a **Veto Privilege** over the relevant domain, the ruler can push it through even against Faction dissent, at ordinary Control cost and the standard "overridden Faction" Loyalty penalty.
- If a Faction holds a **Weak Veto**, the same applies — a soft block, delay-and-object rather than a hard gate, contested at roughly the normal domestic-Question Control rate.
- If a Faction holds a **Strong Veto**, ratification is genuinely unavailable while withheld. The ruler's only paths through are: negotiate (offer the Faction something), strip the veto Privilege beforehand as its own separate Question, or **break the veto** — a rare, expensive, visibly distinct action (steep Control cost, severe immediate Loyalty hit, spawns an existential-tier internal Question) that can cascade into Administration's Crisis/Rebellion pathway. Emergency-powers status makes breaking a veto cheaper, but does not gate whether it's possible at all — the override is always technically available, just costly and dangerous without emergency footing.
- If the resulting internal crisis is lost outright, the new power-holder may **renege the treaty** — a real Countries-level relations penalty with the treaty's other party/parties, and potentially a fresh Casus Belli handed to the wronged party against the new government.
- **Strong Veto is a real trade, not a pure ruler-weakening penalty**: a Faction holding a Strong Veto over a domain (taxation, war, treaties) should carry a standing bonus tied to that domain when things proceed normally — reliable compliance and stronger output from a Faction that has genuine guaranteed voice, versus one whose compliance must be extracted by force every cycle. Weak Veto carries a smaller or no such bonus. Veto strength and distribution are a **strong prior set at country generation**, tied to Government Triangle position (Feudal countries tend to start with Nobility holding a war veto; Republics with Citizenry/Parliament holding a trade-treaty veto; Theocracies with Clergy holding a religious-alignment veto), and can drift over a country's history through ordinary Administration play (stripped, granted, strengthened, weakened) rather than being fixed for the country's lifetime. No automatic feedback to Institutional↔Personalistic positioning is modeled from this — the correlation between heavy Strong-Veto distribution and an Institutional read should emerge from play, not be forced by a rule.

**Multilateral forums (Concerts)**
A Concert is a standing or ad-hoc multilateral framework, existing as its own object with a member list, independent of any single crisis. It does two things bilateral diplomacy cannot:
- **Collective legitimation** — jointly recognizing (or refusing to recognize) a territorial change, a new country's Formation, or a CB's legitimacy, resolving in one negotiation what would otherwise require separately negotiating every bilateral pair.
- **Collective crisis management** — convening specifically to contain an escalating bilateral dispute before it cascades: brokering a settlement, guaranteeing neutrality for wavering treaty-partners, or formally sanctioning a judged aggressor as a bloc (feeding back into that country's Reputational leverage and future CB legitimacy).

A country's voice in a Concert scales with its Leverage rather than being a flat vote, so a Concert functionally behaves as a weighted negotiation among its highest-Leverage members. Concert relevance/membership can spawn by the same threshold logic Administration uses for Factions — a country becomes "great-power" relevant once its Leverage crosses a threshold, an emergent category rather than a hand-authored tier list.

**"Great Wars" as emergent cascade, not a scripted event**
There is no Great War trigger and no global tension meter. A large-scale war is simply what happens when a bilateral CB fires into an actual war between A and B, and the treaty graph is walked outward from there:
1. Every standing commitment (Alliance, Guarantee, Confederation obligation, Concert membership terms) binding either belligerent is checked.
2. Each bound third party faces its own honor-or-default choice — honoring it is gated by their *own* domestic buy-in math (the ratification interface above, run against their own Factions); defaulting costs Reputational leverage for that country's future commitments.
3. Anyone newly drawn in brings their own web of commitments, propagating the check outward.
4. A convened Concert can act as a circuit-breaker at any point in the propagation — pressuring belligerents toward settlement, guaranteeing neutrality, or sanctioning the aggressor — competing directly against the cascade rather than being flavor layered on an inevitable outcome.

Whether a given crisis contains or cascades into a Great War is therefore the emergent outcome of every bound country's individual domestic-buy-in math plus however effectively a relevant Concert organizes counter-pressure — not a scripted or timed escalation, consistent with the project's core design thesis.

### Player Interactions
- Read another country's Goals, Leverage, and Opinion (subject to Espionage-labor-gated intelligence quality — a country with weak Espionage sees a noisier picture).
- Propose, counter-propose, threaten, or bribe using Leverage as the credibility backing.
- Negotiate and ratify trade agreements, alliances, guarantees, dependency terms, and Confederation entry/exit (the last two as the execution layer over Countries' existing structures).
- Direct kin-state soft power actions toward a co-national population abroad (cultural funding, protection guarantees, agitation) — acting on the target population's Sympathy directly, without engaging their government at all.
- Direct covert action via Espionage labor: foreign intelligence-gathering, and (further out, flagged rather than fully specified) covert destabilization of a rival's own internal Factions.
- Convene, join, or leverage standing position within a Concert; vote weight scales with Leverage.
- Attempt to broker or block containment of an escalating crisis as a Concert member.
- Resolve territorial cession and claims as part of a peace settlement (the diplomatic execution half of War's outcomes).

### Systems & Rules (sketch, to refine later)
- Exact Leverage credibility-check formula (how Economic/Military/Cultural/Reputational Leverage combine when evaluating a specific proposal).
- Exact CB severity gradient — how many tiers, and the precise reputational-cost curve for overreaching on a weak CB.
- Concert Leverage-weighted voting formula, and the precise threshold for a country becoming Concert-relevant.
- Whether declining a Concert-brokered settlement carries its own explicit reputational/status cost, or simply lets the crisis proceed as it would have absent the Concert (open question, see below).
- Exact Diplomacy/Espionage labor throughput curves — how many simultaneous relationships, negotiations, or covert operations a given labor pool can sustain.

### Dependencies
- **Countries** — Opinion, Claims, Goals, CB, Sovereignty axes, Confederation structure are all read/executed here, not owned here.
- **Nations** — kin-state Sympathy is the direct substrate for cultural Leverage and the soft-power toolkit; Statehood Pathway interacts with CB and Formation-via-secession outcomes.
- **Administration** — the ratification interface (Veto Privileges, breaking a veto, Crisis/Rebellion on failure, renege-on-civil-war-loss) is the load-bearing hidden layer beneath every binding diplomatic action; Diplomacy never exposes Administration's vocabulary directly.
- **Economics** — Diplomacy and Espionage are dedicated Skilled Labor categories owned there; External Economics data grounds Economic leverage and trade-agreement terms directly.
- **War** — Military leverage reads force projection; CB resolution and territorial cession are the diplomatic execution of War's outcomes; the treaty-graph cascade is what determines who else gets drawn into a War-module conflict.
- **Characters** — deferred, but likely relevant to individual envoys/spymasters the same way Administration flagged Faction leaders as a future dependency.

### Open Questions
- Does declining a Concert-brokered settlement carry an explicit reputational/status penalty, or is refusal cost-neutral beyond the crisis proceeding unchecked? (Tone call — leaning toward a real cost to give the Concert teeth, not yet decided.)
- Exact throughput limits on Diplomacy/Espionage labor — is there a hard cap on simultaneous active relationships/operations, or a soft efficiency curve that degrades gracefully?
- How does espionage-driven intelligence *quality* (rather than just presence/absence) get represented to the player — noisy/delayed data, or a confidence-banded readout?
- Full mechanics of covert destabilization of a rival's internal Factions — flagged as a natural extension of Espionage labor but not yet designed; likely needs to wait on a deeper look at how visible/attributable a covert failure should be.

---

