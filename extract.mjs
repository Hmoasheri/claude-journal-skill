#!/usr/bin/env node
// Transcript .jsonl -> clean readable text. Skips tool noise so a 10MB session
// becomes a few KB of actual conversation. Usage: node extract.mjs <file.jsonl>
// ponytail: naive line-by-line parse; fine for Claude Code's one-JSON-per-line format.
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) { console.error("usage: node extract.mjs <transcript.jsonl>"); process.exit(1); }

const trunc = (s, n = 300) => (s.length > n ? s.slice(0, n) + " …[truncated]" : s);

for (const line of readFileSync(file, "utf8").split("\n")) {
  if (!line.trim()) continue;
  let o;
  try { o = JSON.parse(line); } catch { continue; }
  const m = o.message;
  if (!m || !m.role) continue;
  const blocks = Array.isArray(m.content) ? m.content : [{ type: "text", text: m.content }];
  const parts = [];
  for (const b of blocks) {
    if (b.type === "text" && b.text?.trim()) parts.push(b.text.trim());
    else if (b.type === "tool_use") parts.push(`[tool: ${b.name}]`);
    else if (b.type === "tool_result") {
      const t = typeof b.content === "string" ? b.content
        : Array.isArray(b.content) ? b.content.map(c => c.text || "").join(" ") : "";
      if (t.trim()) parts.push(`[result: ${trunc(t.replace(/\s+/g, " "))}]`);
    }
  }
  const txt = parts.join("\n");
  if (txt.trim()) console.log(`\n### ${m.role.toUpperCase()}\n${txt}`);
}
