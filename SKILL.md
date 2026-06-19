---
name: journal
description: Distill Claude Code sessions into categorized, cross-linked Obsidian notes, and recall anything from past sessions fast. Use when the user types /journal, says "journal this session", "save this to obsidian", "write up what we did", or asks "what did we do about X", "have we discussed X before", "recall X from past sessions".
---

# Journal — session memory in Obsidian

Claude Code already auto-saves every session as a `.jsonl` transcript. This skill turns
those into a durable, searchable Obsidian knowledge base: one clean note per session,
filed by category, cross-linked, so nothing is forgotten and anything is recallable fast.

**Paths (this machine):**
- Vault notes: `C:\Users\hmoas\Documents\Obsidian Vault\Claude Sessions\`
- Index/map: `…\Claude Sessions\_Index.md`
- Transcripts: `C:\Users\hmoas\.claude\projects\C--Users-hmoas-Desktop\*.jsonl` (newest mtime = current session)
- Extractor: `node "C:\Users\hmoas\.claude\skills\journal\extract.mjs" <transcript.jsonl>` → clean text

## Modes (pick by the args / request)

### 1. `/journal`  (no args) — write up the CURRENT session
You lived this session, so summarize from your own context — don't re-read the transcript.
1. Decide a **category** that matches the work. Prefer reusing an existing one (check the
   subfolders already in `Claude Sessions\` and the vault's own folders like `Trade`,
   `Claude Trade`). Make a new category only if nothing fits.
2. Write the note (template below) to
   `Claude Sessions\<Category>\<YYYY-MM-DD>-<kebab-slug>.md`.
3. Add `[[wikilinks]]` to related existing notes — grep `Claude Sessions\` for shared
   keywords/tags first so links actually resolve.
4. Update `_Index.md`: add one bullet under the category heading (create the heading if new).
5. Tell the user the note path and which links you made. Done.

### 2. `/journal recall <query>`  (or "what did we do about X", "have we discussed X")
Fast recall across ALL time. In order, stopping when you can answer confidently:
1. Grep the notes first — they're the distilled index:
   `Grep` pattern over `Claude Sessions\` (also the `Tags`/category folders if relevant).
2. If notes are thin, go deep into raw transcripts. Find candidates by date/keyword, then
   `node extract.mjs <file.jsonl> | rg -i "<query>"` (or pipe to a temp file and Read it).
   The `search_session_transcripts` MCP tool is an alternative full-text search if available.
3. Synthesize a direct answer, citing the note(s)/session date(s) you found it in, with
   clickable links to the Obsidian `.md` files.

### 3. `/journal backfill` — process PAST sessions into notes
For catching up the 20+ existing transcripts. Work newest-first, skip trivial/empty ones.
For each: `node extract.mjs <file> > tmp`, Read tmp, then write a note exactly as Mode 1.
Batch them; don't ask permission per file. Update `_Index.md` as you go. Use the file's
mtime as the note date. Note already-journaled sessions in `_Index.md` to avoid dupes.

## Note template

```markdown
---
date: <YYYY-MM-DD>
category: <Category>
project: <project/dir if any>
tags: [claude-session, <topic>, <topic>]
session: <transcript-uuid or "current">
---

# <Title — what this session was about>

## TL;DR
<2–3 sentences: what we set out to do and the outcome.>

## What we did
- <key step / decision>
- <key step / decision>

## Artifacts
- <files created/changed, deploy URLs, commands that matter — with paths>

## Decisions & rationale
- <choices made and why; constraints to remember>

## Open / next
- <unfinished threads, TODOs, things to revisit>

## Related
- [[<other note>]] · [[<other note>]]
```

## Rules
- One note per session. Re-journaling an existing session updates that note, never duplicates.
- Categories are folders so similar work sits side by side; tags + `[[links]]` connect across categories.
- Keep notes tight — they're the recall layer. The transcript is the full backup; don't paste it in.
- This complements, not replaces, the auto-memory in `…\memory\`: memory = durable facts &
  preferences; journal = per-session work log. Cross-reference when useful.
