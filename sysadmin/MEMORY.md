# Long-term Memory

## Active Context

- **[PENDING-2026-03-09 00:00 CST]** feishu duplicate plugin warning 修复：`openclaw config unset plugins.entries.feishu` 已执行（2026-03-09 13:08 CST），需在今晚午夜执行 `openclaw gateway restart` 使其生效。已确认可安全重启（plugins.installs.feishu 已是默认 enabled，无需 entries 显式声明）。

## Settled Context

- **2026-03-10** sysadmin HEARTBEAT.md 已清空（git sync 任务转移到 Maoku HEARTBEAT.md，由 main agent 每天 04:00 CST cron 触发）。MaoGen 不再持有 heartbeat 定时任务。

## Durable Facts

- Hooks config must be at top-level hooks.internal.entries, NOT inside agents.list[]

## Recent Signals

(None yet)

## Constraints

- Installing skills: must explain steps and dependencies first, only proceed after Boss approval
- Package manager priority: brew > npm > pipx
- Prefer OpenClaw CLI commands over direct openclaw.json editing
