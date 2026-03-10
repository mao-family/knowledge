# Change Log

Records for operations that git cannot track: software installs/uninstalls, system config changes, external service operations, cron jobs.
Each entry includes the operator: [Maoku], [MAOGEN], or [Boss].

## Entries

- **2026-03-08 03:24 CST** — [Maoku] Installed skill `skill-vetter` v1.0.0 via `npx clawhub install skill-vetter`. Location: `~/.openclaw/skills/`.
- **2026-03-08 03:26 CST** — [Maoku] Installed skill `tavily-search` v1.0.0 via `npx clawhub install tavily-search`. Location: `~/.openclaw/skills/`. Requires `TAVILY_API_KEY`.
- **2026-03-08 04:19 CST** — [Maoku] Installed Peekaboo CLI v3.0.0-beta3 via `brew install steipete/tap/peekaboo`. Requires Screen Recording + Accessibility permissions.
- **2026-03-08 04:42 CST** — [Maoku] Installed skill `self-improving-agent` v1.0.11 via `npx clawhub install self-improving-agent`.
- **2026-03-08 04:42 CST** — [Maoku] Installed skill `find-skills` v0.1.0 via `npx clawhub install find-skills`.
- **2026-03-08 04:42 CST** — [Maoku] Installed summarize CLI v0.11.1 via `brew install steipete/tap/summarize`.
- **2026-03-08 09:34 CST** — [Maoku] Installed skill `notebooklm` via `npx skills add`. CLI `notebooklm-py` v0.3.3 via pipx.
- **2026-03-08 11:00 CST** — [Maoku] Created MAOGEN agent (agentId: sysadmin). Model: github-copilot/claude-sonnet-4.6. Via `openclaw agents add sysadmin`.
- **2026-03-08 22:50 CST** — [MAOGEN] Directory reorganization. Created `~/.openclaw/workspaces/shared/` with standards/, intel/. Moved files from main workspace.
- **2026-03-08 23:30 CST** — [MAOGEN] Updated allowAgents from ["research","dev","ops"] to ["sysadmin"]. Removed invalid bootstrap-extra-files hook config.
- **2026-03-09 07:15 CST** — [Maoku] Installed agent-browser CLI v0.17.0 via `npm install -g agent-browser` + Chromium. Skill registered via `npx clawhub install agent-browser --force`.
- **2026-03-09 12:31 CST** — [MAOGEN] Moved all skills from Maoku workspace to global (~/.openclaw/skills/).
- **2026-03-09 12:40 CST** — [MAOGEN] Enabled cross-agent messaging: tools.sessions.visibility=all, tools.agentToAgent.enabled=true.
- **2026-03-09 12:48 CST** — [MAOGEN] Initialized .learnings/ directory in sysadmin workspace.
- **2026-03-09 13:08 CST** — [MAOGEN] Fixed MAOGEN model: → github-copilot/claude-sonnet-4.6.
- **2026-03-09 16:30 CST** — [Maoku] Installed Azure CLI v2.84.0 via `brew install azure-cli`.
- **2026-03-10 00:52 CST** — [Maoku] Installed RustDesk v1.4.6 via `brew install --cask rustdesk`.
- **2026-03-10 01:18 CST** — [Maoku] Created LaunchAgent ai.openclaw.workspaces-sync for daily git sync at 04:00.
- **2026-03-10 01:22 CST** — [Maoku] Removed LaunchAgent ai.openclaw.workspaces-sync. Replaced by cron job.
- **2026-03-10 09:28 CST** — [MAOGEN] Created cron job `sysadmin-heartbeat-daily` (917367d8). Schedule: `0 4 * * *`.
- **2026-03-10 12:19 CST** — [MAOGEN] Removed cron job `sysadmin-heartbeat-daily` (917367d8).
- **2026-03-10 12:19 CST** — [Maoku] Created cron job `maoku-daily-sync` (be79fd70). Schedule: `0 4 * * *`.
- **2026-03-10 14:18 CST** — [MAOGEN] Main agent model: → github-copilot/claude-opus-4.6-1m. Pending gateway restart.
- **2026-03-10 16:46 CST** — [MAOGEN] Created Dev agent (agentId: dev). Model: github-copilot/claude-opus-4.6. Updated allowAgents to ["main","sysadmin","dev"].
- **2026-03-10 17:30 CST** — [MAOGEN] Installed acpx plugin via `openclaw plugins install acpx`. Configured ACP: enabled=true, backend=acpx, defaultAgent=claude, permissionMode=approve-all.
- **2026-03-10 17:30 CST** — [MAOGEN] Updated tools.agentToAgent.allow to ["main","sysadmin","dev","claude"].
- **2026-03-10 20:55 CST** — [MAOGEN] Fixed model: github-copilot/claude-opus-4.6-1m → github-copilot/claude-opus-4.6. Gateway restarted (pid 25696).
