# Agent Files Specification

Best practices and format standards for OpenClaw agent configuration files.

## Sources

- [The Complete Guide to AI Agent Memory Files](https://medium.com/data-science-collective/the-complete-guide-to-ai-agent-memory-files-claude-md-agents-md-and-beyond-49ea0df5c5a9) — Paolo Perrone
- [AI Agent Memory: SOUL.md & 100-tick Distillation](https://clawcity.app/blog/ai-agent-memory-soul-md-distillation) — ClawCity
- [Self-Improving Agents](https://addyosmani.com/blog/self-improving-agents/) — Addy Osmani

## File Taxonomy

| File | Purpose | Who writes | Update frequency |
|------|---------|-----------|-----------------|
| SOUL.md | Identity, personality, behavior rules, boundaries | Boss/Maoku | Rarely |
| IDENTITY.md | Name, emoji, role, style | Boss/Maoku | Rarely |
| AGENTS.md | Responsibilities, workflows, operational rules | Boss/Maoku | Occasionally |
| MEMORY.md | Accumulated experience, active context, learned facts | Agent (self) | Frequently |
| TOOLS.md | Environment info, available tools, config paths | Boss/Maoku | Occasionally |
| USER.md | User profile, preferences, communication style | Boss/Maoku | Rarely |
| CHANGELOG.md | Change records for system modifications | Agent (self) | Per change |

## Core Principles

1. **Separate identity from experience** — SOUL.md defines who the agent is (immutable); MEMORY.md captures what it learns (mutable)
2. **Structured memory** — MEMORY.md uses 4 sections: Active Context, Durable Facts, Recent Signals, Constraints
3. **Size limits** — SOUL.md ≤50 lines, IDENTITY.md ≤10 lines, AGENTS.md ≤100 lines, MEMORY.md ≤4000 characters
4. **Agent-writable vs human-writable** — Only MEMORY.md and CHANGELOG.md are agent-writable; all other files require Boss approval
5. **Periodic review** — All agent files should be reviewed regularly for compliance and optimization
6. **Single source of truth** — Shared facts (e.g., system config) should be consistent across agents
7. **Own scope only** — Each file should only contain content that belongs to that agent; don't define other agents' rules or constraints
8. **Transient info in MEMORY.md** — Status, pending items, and temporary state belong in MEMORY.md, not in config files (TOOLS.md, AGENTS.md, etc.)

## SOUL.md Spec

### Required Sections

```markdown
# Personality
(2-3 sentences defining core character traits)

# Tone
(3-5 bullet points on communication style)

# Behavior Rules
(Numbered list of hard rules, max 10)

# Boundaries
(Bullet list of red lines — things the agent must never do)
```

### Guidelines

- Keep personality description concise — 2-3 sentences max
- Behavior rules should be actionable and verifiable
- Boundaries are absolute — no exceptions
- Do not include operational procedures (those go in AGENTS.md)
- Do not include environment details (those go in TOOLS.md)

## IDENTITY.md Spec

### Format

```markdown
# [Agent Name]

[One-line description]

- Name: [name]
- Emoji: [emoji]
- Role: [role title]
- Style: [2-3 adjectives]
```

### Guidelines

- Keep it under 10 lines
- Name should be memorable and distinct from other agents
- Emoji should visually represent the role

## AGENTS.md Spec

### Required Sections

- **Responsibilities** — What the agent handles
- **Approval Flow** — How decisions get approved (if applicable)
- **Operational Rules** — How work gets done

### Optional Sections

- Escalation — When to escalate to the user
- Delegation — Sub-agent delegation rules

### Guidelines

- Max 100 lines
- Each responsibility should be specific and non-overlapping with other agents
- Responsibilities should be high-level; merge related items (e.g., "delegate + review + relay" → one bullet about sub-agent management)
- Approval flows must be explicit — who approves, in what order
- Approval flow should cover file modification permissions (which files need approval)
- Operational rules should be verifiable (not vague)
- Operational rules belong to this agent only — don't define other agents' rules here
- Don't repeat info already defined elsewhere (e.g., approval flow in Delegation duplicating Approval Flow section)
- Implementation details (tool names, API calls, file paths) belong in MEMORY.md or TOOLS.md, not here
- Configuration over description — if something is already defined in a dedicated file (e.g., HEARTBEAT.md, TOOLS.md), don't repeat it here
- CHANGELOG rules (if any) belong in Operational Rules as a bullet point

## MEMORY.md Spec

### Required Sections

```markdown
# Long-term Memory

## Active Context
(Current tasks, ongoing work)

## Durable Facts
(Stable facts: versions, paths, configurations)

## Recent Signals
(Recent observations, patterns, temporary notes)

## Constraints
(Learned constraints from experience)
```

### Guidelines

- Max 4000 characters total
- Agent manages this file autonomously
- Periodic distillation: compress old signals into durable facts or discard
- Active Context should be cleared when tasks complete
- Durable Facts should be verified periodically — remove stale entries

## TOOLS.md Spec

### Required Sections

- **[Tool Category]** — Available tools with commands and paths

### Guidelines

- System info (OS, runtime, shell) is auto-injected by OpenClaw runtime — don't duplicate here
- Only include tools the agent actually uses
- Include exact paths and commands — no guessing
- Note priority order when multiple tools serve the same purpose (e.g., package managers)
- Update when tools are installed/removed

## USER.md Spec

### Required Sections

- **Address** — How the agent should address the user
- **Preferences** — Communication and operational preferences

### Optional Sections

- Background — User's technical background
- Schedule — Working hours, timezone
- Tech Stack — Preferred technologies

### Guidelines

- Can be shared across agents if user profile is the same
- Keep preferences actionable
- Update when user corrects behavior

## Review Checklist

When reviewing agent files, check:

- [ ] SOUL.md: personality clear? boundaries complete? no operational details leaked in?
- [ ] IDENTITY.md: under 10 lines? name distinct?
- [ ] AGENTS.md: responsibilities non-overlapping? approval flow explicit? under 100 lines?
- [ ] MEMORY.md: under 4000 chars? sections maintained? stale entries cleaned?
- [ ] TOOLS.md: tools still installed? no runtime-injected info duplicated?
- [ ] USER.md: preferences up to date? address correct?
- [ ] Cross-agent consistency: shared facts match? no conflicting rules?

## Sub-Agent Context

OpenClaw injects different bootstrap files depending on how a session is created:

| Method | promptMode | Injected files |
|--------|-----------|----------------|
| `sessions_send` to `agent:<id>:main` | full | All (SOUL.md, AGENTS.md, TOOLS.md, MEMORY.md, USER.md, IDENTITY.md) |
| `sessions_spawn` | minimal | AGENTS.md + TOOLS.md only |

**Recommendation**: Use `sessions_send` to delegate tasks to other agents when they need full context. Use `sessions_spawn` only for isolated one-shot tasks where minimal context is acceptable.

## Validated Patterns

Rules learned from real incidents. Changing these requires explicit justification.

1. **Review before relay** — Sub-agent results must be reviewed and summarized before reporting to Boss; never forward raw output
2. **Investigate before escalate** — Sub-agent failures must be investigated and recovery attempted before escalating to Boss
3. **Inline critical paths** — Important paths (e.g., CHANGELOG location) must be inline with the rule that triggers the write, not in a separate file
4. **Operational details out of SOUL.md** — Tool usage, file paths, specific procedures belong in AGENTS.md or TOOLS.md, not SOUL.md
5. **Own scope only** — Each agent's rules stay in its own files; never define another agent's rules in yours
6. **No cross-file duplication** — If a fact exists in one file, don't repeat it in another; pick the most authoritative location
7. **Prefer sessions_send over sessions_spawn** — Use `sessions_send` to delegate to named agents so they get full bootstrap context; `sessions_spawn` strips most files
