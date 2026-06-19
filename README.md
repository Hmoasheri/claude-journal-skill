# journal — Claude Code session memory in Obsidian

A [Claude Code](https://claude.com/claude-code) skill that distills your sessions into
categorized, cross-linked **Obsidian** notes — and recalls anything from past sessions fast.

Claude Code already auto-saves every session as a transcript. This skill turns those into a
durable, searchable knowledge base: one clean note per session, filed by category, so nothing is
forgotten and anything is recallable.

## Install
Copy this folder to `~/.claude/skills/journal/` (i.e. `SKILL.md` + `extract.mjs`).

## Usage
- `/journal` — write up the **current** session into a categorized, linked Obsidian note.
- `/journal recall <query>` — search notes, then raw transcripts, and answer with links.
- `/journal backfill` — process all past transcripts into notes.

## Configure
The vault and transcript paths are set inside `SKILL.md` (currently hard-coded for the author's
machine). Edit the **Paths** section there to point at your own Obsidian vault.

## Files
- `SKILL.md` — the skill instructions + note template.
- `extract.mjs` — strips a `.jsonl` transcript down to clean readable text (Node, no deps).

Built with [ponytail](https://github.com/DietrichGebert/ponytail).
