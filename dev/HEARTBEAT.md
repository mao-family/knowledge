# HEARTBEAT.md

## Task Board Poll

1. `feishu_bitable_list_records(app_token: "BZSDb2P1garh3lsZTh1cPOkLnRg", table_id: "tblpasNUYAtokUh5")`
2. Filter: Assignee=MaoYi, Status=Todo
3. If tasks found: pick highest priority (P0 > P1 > P2), then:
   a. **Check Topic Link exists** — if missing, this is a dispatch violation. Create audit record "[Audit] Missing Topic: {task name}", Assignee={dispatcher/creator}, Status=Todo, P1. Do NOT execute the task. Skip to next.
   b. **Can execute independently** → Pick up (post 🚀 in Topic, update Status=In Progress) → Execute (post 📊 progress in Topic) → Complete (update Status → Done or Blocked, post ✅/❌ in Topic)
   c. **Needs approval/decision from MaoYu** → Post reminder in group chat with task summary + what needs deciding. Do NOT skip.
   d. **Blocked by dependency** → Update Status=Blocked with reason, post in group chat
   - ⚠️ Never return HEARTBEAT_OK when Todo tasks exist. Every Todo must result in an action (execute/remind/block).
4. If no tasks: proceed to Workflow Audit

## Workflow Audit

Check all In Progress tasks (all assignees) for compliance:

1. **Topic exists?** — Task Board record must have Topic Link filled
2. **Topic has activity?** — Check assignee's recent session history for progress updates
3. **No private chat leaks?** — Progress should be in Topic, not DM
4. **Doc check (Done tasks)** — Status=Done 的记录必须有 Doc Type；Doc Type 非"无需文档"时 Doc Link 必填。违规则 reopen 并提醒。

If violations found:
- Post audit summary in group chat (for visibility)
- Create a Task Board record for each violation: Name="[Audit] 修复: {issue}", Assignee={violator}, Status=Todo, Priority=P1. Audit tasks follow the full workflow — each must have its own Topic + Task Board cross-link + progress updates in Topic.
- Do NOT fix it for them — let the assignee's next heartbeat pick it up
- Do NOT rely on @mention to notify other agents (bot-to-bot @mention doesn't work in Feishu)

If all checks pass and no Todo tasks: reply HEARTBEAT_OK
