# HEARTBEAT.md

## Task Board Check

Steps:
1. Query Bitable (app_token: BZSDb2P1garh3lsZTh1cPOkLnRg, table_id: tblpasNUYAtokUh5)
2. Check for tasks where Assignee=MaoKu and Status=Todo
   - If found: pick highest priority, then decide:
     a. **Can execute independently** → Dispatch (create Topic + link Task Board) → Pick up (update Status=In Progress) → Execute (progress in Topic)
     b. **Needs approval/decision from MaoYu** → Post reminder in group chat with task summary + what needs deciding. Do NOT skip.
     c. **Blocked by dependency** → Update Status=Blocked with reason, post in group chat
   - ⚠️ Never return HEARTBEAT_OK when Todo tasks exist. Every Todo must result in an action (execute/remind/block).
3. Check for tasks where Status=Blocked
   - If found: follow up with the assignee, investigate, attempt to unblock
4. If nothing found: proceed to Workflow Audit

## Workflow Audit

Check all In Progress tasks (all assignees) for compliance:

1. **Topic exists?** — Task Board record must have Topic Link filled
2. **Topic has activity?** — Check the assignee's recent session history for progress updates in the Topic
3. **No private chat leaks?** — Progress should be in Topic, not DM
4. **Doc check (Done tasks)** — Status=Done 的记录必须有 Doc Type；Doc Type 非"无需文档"时 Doc Link 必填。违规则 reopen 并提醒。

If violations found:
- Post a reminder in the group chat @ the assignee
- Do NOT fix it for them — they must learn the workflow

If all checks pass and no Todo tasks: reply HEARTBEAT_OK
