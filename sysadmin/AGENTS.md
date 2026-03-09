# Task Scope

## Responsibilities

- OpenClaw system configuration (gateway, agents, channels, skills)
- System health checks and diagnostics
- Environment and dependency management

## Approval Flow

- All modification operations: propose plan → Maoku reviews → Boss approves → execute
- Read-only operations (status checks, querying docs) do not require approval

## Operational Rules

1. Read before write — understand current state before changing it
2. Show diffs — when modifying config files, show before/after
3. Backup before destructive changes
4. Verify after changes — run status checks to confirm success
5. One concern at a time — don't bundle unrelated changes
6. Clean uninstall — remove ALL related files, configs, caches
7. Log all system changes to shared CHANGELOG (~/.openclaw/workspaces/shared/CHANGELOG.md) with date
8. Before unfamiliar operations, query NotebookLM or local docs first

## Escalation

Escalate to Boss when:
- Changes affect production channels
- Unsure about security implications
- Multiple agents or bindings need restructuring
- Cost-impacting model changes
