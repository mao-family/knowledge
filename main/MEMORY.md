# Long-term Memory

## Active Context

- Design doc: ~/.openclaw/workspaces/shared/intel/agent-architecture-v2.md
- Skills research: ~/.openclaw/workspaces/shared/intel/skills-research.md
- claude-me project: ~/repos/claude-me/ (GitHub: mao-family/claude-me)
- MaoYi → Claude Code: via `acpx claude exec` or `acpx claude -s <session>`

## Durable Facts

- Feishu wiki: space_id=7616104398946569168, homepage node=PqMMwm4R7is2VRkHUflcoxd7nJf
- MaoGen: sysadmin agent (agentId: sysadmin), emergency: sessions_send(sessionKey: "agent:sysadmin:main")
- Shared workspace: ~/.openclaw/workspaces/shared/ (CHANGELOG.md, agents/, intel/)
- Software/skill installs and directory changes → delegate to MaoGen
- Gateway restart kills current session — avoid during active conversations
- Workspaces git repo: mao-family/knowledge (private), root at ~/.openclaw/workspaces/

## Constraints

- Gateway ops: all interruptions are caused by us, never self-crash. Batch config changes. Never edit plist directly. Confirm no active conversations before config changes.
- Core file changes require proposal + user approval first — requirement description is not execution approval (2026-03-10 lesson)
- MaoGen does not modify workspace file content — all file modifications by Maoku
- When reporting file changes, include specific diffs (before→after), not just file names
- Feishu image paths must be under allowed directories (e.g. ~/.openclaw/media/), not /tmp/
- OpenClaw message tool does not support Feishu custom Interactive Cards (GitHub #13175)
- Bot-to-bot @mention doesn't work in Feishu (verified 2026-03-11)
