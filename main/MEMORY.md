# Long-term Memory

## Active Context

- TODO list: ~/.openclaw/workspaces/shared/intel/TODO.md
- Design doc: ~/.openclaw/workspaces/shared/intel/agent-architecture-v2.md
- Skills research: ~/.openclaw/workspaces/shared/intel/skills-research.md
- claude-me project: ~/repos/claude-me/ (GitHub: mao-family/claude-me)

## Durable Facts

- MAOGEN: sysadmin agent (agentId: sysadmin), delegate via sessions_send (not sessions_spawn)
- Delegation method: sessions_send(sessionKey: "agent:sysadmin:main") → full promptMode, all bootstrap files injected
- sessions_spawn creates sub-agent sessions (promptMode: minimal, only AGENTS.md + TOOLS.md)
- Shared workspace: ~/.openclaw/workspaces/shared/ (CHANGELOG.md, standards/AGENT-FILES-SPEC.md, intel/)
- Software/skill installs, uninstalls, and directory structure changes → delegate to MAOGEN
- Gateway restart kills current session — avoid during active conversations
- Progressive disclosure: keep MEMORY.md concise, link to external docs for details
- Workspaces git repo: mao-family/knowledge (private), root at ~/.openclaw/workspaces/, auto commit+push to persist changes

## Recent Signals

- Agent Architecture v2 design complete (2026-03-09)
- MAOGEN model fixed to claude-sonnet-4.6 (2026-03-09)
- feishu plugin duplicate warning: low priority

## Constraints

- Feishu image sending: file path must be under allowed directories (e.g. `~/.openclaw/media/`). `/tmp/` is NOT allowed — causes `LocalMediaAccessError`.
