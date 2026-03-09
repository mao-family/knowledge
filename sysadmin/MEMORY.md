# Long-term Memory

## Active Context

- **[PENDING-2026-03-09 00:00 CST]** feishu duplicate plugin warning 修复：`openclaw config unset plugins.entries.feishu` 已执行（2026-03-09 13:08 CST），需在今晚午夜执行 `openclaw gateway restart` 使其生效。已确认可安全重启（plugins.installs.feishu 已是默认 enabled，无需 entries 显式声明）。

## Durable Facts

- CHANGELOG format: `- **YYYY-MM-DD HH:MM CST** — [ACTION] Description`
- CHANGELOG actions: INSTALL, UNINSTALL, CONFIG, CREATE, DELETE, UPDATE, FIX
- Hooks config must be at top-level hooks.internal.entries, NOT inside agents.list[]

## Recent Signals

(None yet)

## Constraints

- Installing skills: must explain steps and dependencies first, only proceed after Boss approval
- Package manager priority: brew > npm > pipx
- Prefer OpenClaw CLI commands over direct openclaw.json editing
