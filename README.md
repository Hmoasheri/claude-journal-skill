# 🧠 journal + ideas — a memory flywheel for Claude Code

Two [Claude Code](https://claude.com/claude-code) skills that turn your throwaway sessions into a
compounding personal knowledge base — and then mine it to tell you what to build next.

```
  every session  ──▶  journal  ──▶  Obsidian notes  ──▶  ideas  ──▶  what to build/learn next
       │                                   │                                    │
       └────────────  recall anything, any time  ◀──────────────────────────────┘
```

Claude Code already saves every session as a transcript — then forgets it. These skills close the loop:
**capture → recall → ideate**, all in your own Obsidian vault, all in plain markdown you own forever.

---

## 📓 `journal` — never lose a session again

Distills each session into one clean, categorized, cross-linked Obsidian note.

- **`/journal`** — write up the current session into a filed, linked note.
- **`/journal recall <query>`** — "what did we do about X?" → searches your notes, then the raw
  transcripts, and answers with links. Recall from *any* session, no matter how old.
- **`/journal backfill`** — sweep every past transcript into notes in one pass.

`extract.mjs` collapses a noisy 10 MB transcript into a few KB of clean conversation — zero dependencies.

## 💡 `ideas` — your history, turned into direction

Reads everything `journal` captured, profiles what you actually keep coming back to, and suggests
projects and hobbies **grounded in evidence** — every idea cites the session it came from.

- **`/ideas`** — balanced project + hobby suggestions.
- **`/ideas projects`** / **`/ideas hobbies`** — go deep on one.
- **`/ideas <theme>`** — focus an area, e.g. `/ideas trading`.

---

## 🚀 The potential

This is small, but the loop it creates is not:

- **Perfect memory.** Nothing you've ever done with Claude is lost — it's all searchable, forever, offline, in markdown you own.
- **Zero re-explaining.** New session, cold context? `/journal recall` rebuilds it in seconds. Claude picks up exactly where you left off.
- **A second brain that thinks back.** `ideas` doesn't just store your past — it reads it and points forward, spotting the threads you keep pulling and the work you keep leaving unfinished.
- **It compounds.** Every session makes the vault richer, which makes recall sharper and suggestions smarter. The more you use Claude, the more it knows *you*.
- **Yours, portable, private.** No SaaS, no lock-in — just your Obsidian vault and two tiny skills.

Capture once. Recall forever. Get told what's next.

---

## Install

Copy each folder to `~/.claude/skills/`:

- `~/.claude/skills/journal/` ← `SKILL.md` + `extract.mjs`
- `~/.claude/skills/ideas/`   ← `ideas/SKILL.md` (rename the `ideas/` folder's file into place)

Then edit the **Paths** section in each `SKILL.md` to point at your own Obsidian vault and transcript
directory (they're currently set for the author's machine).

## Layout

```
journal/
├── SKILL.md          the journal skill
├── extract.mjs       transcript → clean text (Node, no deps)
├── ideas/
│   └── SKILL.md       the ideas skill
└── README.md
```

Built lazy with [ponytail](https://github.com/DietrichGebert/ponytail) — capture and recall are mostly
features Claude Code already had; these skills just wire them into a loop.
