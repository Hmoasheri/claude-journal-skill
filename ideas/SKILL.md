---
name: ideas
description: Read the user's Claude session history (via the journal vault) and suggest projects or hobbies matched to their interests and activity. Use when the user types /ideas, asks "what should I build/learn next", "suggest a project", "give me hobby ideas", "what am I into lately", or "based on what I've been doing, recommend something".
---

# ideas — project & hobby suggestions from your actual activity

Mines your real Claude Code history (already distilled by the `journal` skill) to spot what you keep
coming back to, then proposes things to build or take up next — grounded in evidence, not generic.

**Inputs (this machine):**
- Distilled notes: `C:\Users\hmoas\Documents\Obsidian Vault\Claude Sessions\` + `_Index.md` (read these FIRST — they're the cheap digest).
- Auto-memory: `C:\Users\hmoas\.claude\projects\C--Users-hmoas-Desktop\memory\` (interests, profile, projects).
- Raw transcripts (deeper signal, only if notes are thin): `C:\Users\hmoas\.claude\projects\C--Users-hmoas-Desktop\*.jsonl`
  → `node "C:\Users\hmoas\.claude\skills\journal\extract.mjs" <file.jsonl>`

## How to run

1. **Read the digest.** Read `_Index.md` and skim the category folders. If `Claude Sessions\` is empty
   or stale, tell the user to run `/journal backfill` first (this skill builds on journal's output).
2. **Profile the interests.** From the notes + memory, infer:
   - **Themes** — what recurs (e.g. trading indicators, charting UIs, deploying web apps, Claude tooling).
   - **Intensity** — how often / how recently each theme shows up (recent + frequent = strong signal).
   - **Skill level & tools** — what they already use (Pine, Next.js, Vercel, Obsidian, MCPs…).
   - **Gaps / unfinished threads** — open "next" items in notes are ripe suggestions.
3. **Optional deep pass.** If a theme is interesting but thin in the notes, extract 1–2 relevant
   transcripts to confirm before recommending. Don't read everything — sample.
4. **Suggest.** Produce two short ranked lists (default 3–5 each), tuned to args (see below):
   - **Projects** — concrete things to build that extend what they already do, or finish an open thread.
   - **Hobbies / learning** — adjacent skills or pursuits their activity hints at.
   Each suggestion = one bold line + 1–2 sentences of *why it fits*, citing the session/note as evidence
   (link the note). Mark effort (quick win / weekend / bigger) and whether it builds on existing work.

## Args
- `/ideas` — balanced: both projects and hobbies.
- `/ideas projects` or `/ideas hobbies` — only that list, more of them.
- `/ideas <theme>` — focus on one area (e.g. `/ideas trading`, `/ideas web`).

## Rules
- **Evidence first.** Every suggestion cites what in their history it's based on — no generic filler
  that could apply to anyone. If you can't tie it to their activity, don't suggest it.
- Prefer ideas that **extend or finish** existing work over greenfield context-switches; surface one or
  two stretch/novel ideas too so it's not an echo chamber.
- Respect their level (Persian-speaking beginner web dev per memory) — match effort to ability, flag
  anything that's a big jump.
- Read-only and lazy: lean on the journal notes; only crack open raw transcripts when the notes don't
  answer the question. Suggest, don't build — unless they pick one and say go.

## Related
- Built on the [[journal]] skill (its notes are this skill's primary input).
