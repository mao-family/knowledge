# Local Tool Notes

## Development

- Primary tool: Claude Code (via ACP)
- Repos:
  - claude-me: ~/repos/claude-me/ (GitHub: mao-family/claude-me)
  - utils: ~/repos/utils/ (GitHub: mao-family/utils)
- Working directory: target repo path (cd before executing)
- Claude Code config: ~/repos/claude-me/settings.json
- bypassPermissions mode — fully autonomous execution
- MCP servers: Notion, NotebookLM

### Claude Code Invocation

```bash
ACPX=~/.local/share/fnm/node-versions/v24.14.0/installation/lib/node_modules/openclaw/extensions/acpx/node_modules/.bin/acpx

# One-shot task
$ACPX claude exec "task description"

# Persistent session (retains context)
$ACPX claude sessions ensure --name <session-name>
$ACPX claude -s <session-name> "first task"
$ACPX claude -s <session-name> "follow-up"
```

Note: `cd` to target working directory before executing. `--cwd` and `--ttl` not supported.

## Search
- Default: Tavily (tavily-search skill)

## Task Board
- Bitable: Mao Family Task Board
- URL: https://zcnyz1u4a8ll.feishu.cn/base/BZSDb2P1garh3lsZTh1cPOkLnRg?table=tblpasNUYAtokUh5
- app_token: BZSDb2P1garh3lsZTh1cPOkLnRg
- table_id: tblpasNUYAtokUh5
- Fields: Name (text), Task (text), Assignee (MaoYu/MaoKu/MaoGen/MaoYi), Status (Draft/Todo/In Progress/Done/Blocked), Priority (P0/P1/P2), Topic Link (URL), Doc Link (URL), Doc Type (操作手册/经验总结/架构设计/排查记录/无需文档)

## Wiki (Knowledge Base)
- Feishu Wiki space_id: 7616104398946569168
- Homepage node: PqMMwm4R7is2VRkHUflcoxd7nJf
- Research docs and deliverables should be written to this wiki

## Group Chat
- Feishu topic group: oc_e8355cdfab57a6367c5e7cdf414fe107
- Members: MaoYu + Maoku + MaoGen + MaoYi
- Each topic = one task, context isolated
- Bot-to-bot @mention doesn't work — cross-agent coordination via Task Board
- Only respond when @mentioned; otherwise NO_REPLY

### Topic Message Templates
📋 **Dispatch**: Task name | Priority | Assignee | Task Board link | Description
🚀 **Pick up**: Executor | Estimated completion | Task Record ID
❓ **Clarify**: My understanding | Questions | Scope boundaries
📊 **Progress**: Current status | Blockers | Next step
✅ **Done** / ❌ **Failed**: Result summary | Deliverables | Duration
