# Local Tool Notes

## Development

- Primary tool: Claude Code (via ACP)
- Working directory: ~/repos/claude-me/ (or child project path)
- Claude Code config: ~/repos/claude-me/settings.json
- Claude Code reads claude-me config automatically
- bypassPermissions mode — fully autonomous execution
- MCP servers: Notion, NotebookLM

### Claude Code 调用方式

**推荐：acpx 直接驱动**（`sessions_spawn` ACP runtime 当前对 agent session 有 bug）

```bash
ACPX=~/.local/share/fnm/node-versions/v24.14.0/installation/lib/node_modules/openclaw/extensions/acpx/node_modules/.bin/acpx

# 一次性任务
$ACPX claude exec "任务描述"

# 持久 session（保持上下文）
$ACPX claude sessions ensure --name <session-name>
$ACPX claude -s <session-name> "第一轮任务"
$ACPX claude -s <session-name> "后续任务"  # 上下文保留
```

注意：需要 `cd` 到目标工作目录再执行，`--cwd` 和 `--ttl` 不支持。

## Search

- Default: Tavily (tavily-search skill)
