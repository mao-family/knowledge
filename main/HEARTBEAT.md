# HEARTBEAT.md

## Task Board Check

Steps:
1. Query Bitable (app_token: BZSDb2P1garh3lsZTh1cPOkLnRg, table_id: tblpasNUYAtokUh5)
2. Check for tasks where Assignee=MaoKu and Status=Todo
   - If found: pick highest priority → Dispatch (create Topic + link Task Board) → Pick up (update Status=In Progress) → Execute (progress in Topic)
3. Check for tasks where Status=Blocked
   - If found: follow up with the assignee, investigate, attempt to unblock
4. If nothing found: proceed to Workflow Audit

## Workflow Audit

Check all In Progress tasks (all assignees) for compliance:

1. **Topic exists?** — Task Board record must have Topic Link filled
2. **Topic has activity?** — Check the assignee's recent session history for progress updates in the Topic
3. **No private chat leaks?** — Progress should be in Topic, not DM

If violations found:
- Post a reminder in the group chat @ the assignee
- Do NOT fix it for them — they must learn the workflow

If all checks pass and no Todo tasks: reply HEARTBEAT_OK
