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
- sessions_send 是通知手段，不是派发手段——不能绕过可见性原则。即使紧急任务也必须先建 Task Board（2026-03-13 教训）
- Topic 里必须有完整操作日志（领取/进度/完成），不能只发一条就标 Done（2026-03-13 教训）
- 有 topic 的任务，所有讨论和汇报都在 topic 里进行，禁止私聊汇报（2026-03-13 规则）
- Heartbeat 领取任务也必须走 Dispatch→Pick up 流程：建 Topic → 关联 Task Board → 在 Topic 里汇报进度。不能因为是自己的任务就跳过（2026-03-13 教训）
- Gateway restart 会断当前 session，restart 前必须在 Topic 里记录"即将 restart，预计断联"，避免 Boss 不知情手动干预（2026-03-13 教训）
- Boss 指示：协助 MaoGen 排查 feishu_doc write/append 400 问题（2026-03-13）
