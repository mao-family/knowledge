# Long-term Memory

## Active Context

- TODO list: Task Board (Bitable) — app_token: BZSDb2P1garh3lsZTh1cPOkLnRg, table_id: tblpasNUYAtokUh5
- Design doc: ~/.openclaw/workspaces/shared/intel/agent-architecture-v2.md
- Skills research: ~/.openclaw/workspaces/shared/intel/skills-research.md
- claude-me project: ~/repos/claude-me/ (GitHub: mao-family/claude-me)
- MaoYi → Claude Code: via `acpx claude exec` or `acpx claude -s <session>` for persistent context
- Mao Family topic group: oc_e8355cdfab57a6367c5e7cdf414fe107 (Boss + MaoKu + MaoGen + MaoYi)

## Durable Facts

- Task Board: Mao Family Task Board (Bitable)
  - URL: https://zcnyz1u4a8ll.feishu.cn/base/BZSDb2P1garh3lsZTh1cPOkLnRg?table=tblpasNUYAtokUh5
  - app_token: BZSDb2P1garh3lsZTh1cPOkLnRg | table_id: tblpasNUYAtokUh5
  - 主要派发方式，替代 sessions_send；sessions_send 为紧急后备
- Bot-to-bot @mention 飞书不生效（2026-03-11 验证），Maoku 协调走 Task Board
- MaoGen: sysadmin agent (agentId: sysadmin), 紧急直达: sessions_send(sessionKey: "agent:sysadmin:main")
- Shared workspace: ~/.openclaw/workspaces/shared/ (CHANGELOG.md, standards/AGENT-FILES-SPEC.md, standards/TASK-SYSTEM.md, intel/)
- Software/skill installs, uninstalls, and directory structure changes → delegate to MaoGen
- Gateway restart kills current session — avoid during active conversations
- Progressive disclosure: keep MEMORY.md concise, link to external docs for details
- Workspaces git repo: mao-family/knowledge (private), root at ~/.openclaw/workspaces/, auto commit+push to persist changes

## Recent Signals

- Agent Architecture v2 design complete (2026-03-09)
- MaoGen model fixed to claude-sonnet-4.6 (2026-03-09)
- feishu plugin duplicate warning: low priority

## Gateway 操作规范（2026-03-11 教训）

- Gateway 从未自行 crash，所有中断都是我们操作造成的
- 配置变更攒批一次改完，不要逐条修改触发多次 restart
- 禁止直接改 plist（OpenClaw 会覆盖，launchctl unload = 杀进程）
- 非必要不执行 `openclaw gateway restart`
- 改配置前确认没有 active 对话

## Constraints

- Feishu image sending: file path must be under allowed directories (e.g. `~/.openclaw/media/`). `/tmp/` is NOT allowed — causes `LocalMediaAccessError`.
- 核心文件改动必须先提方案等 Boss 批准，不能把需求描述当执行批准（2026-03-10 违规教训）
- MaoGen 不改 workspace 文件内容，所有文件修改由 Maoku 执行
- 汇报文件改动时必须附上具体变更内容（before→after 或关键 diff），不能只列文件名
