# HEARTBEAT.md

## Task Board Poll

1. `feishu_bitable_list_records(app_token: "BZSDb2P1garh3lsZTh1cPOkLnRg", table_id: "tblpasNUYAtokUh5")`
2. Filter: Assignee=MaoGen, Status=Todo
3. If tasks found: pick highest priority (P0 > P1 > P2), then decide:
   a. **Can execute independently** →
      - Dispatch: create Topic in group chat (oc_e8355cdfab57a6367c5e7cdf414fe107) with 📋 task summary → update Task Board with Topic Link
      - Pick up: update Status → In Progress, post 🚀 in Topic
      - Execute: post 📊 progress in Topic at each step
      - Complete: update Status → Done (or Blocked with reason), post ✅/❌ in Topic
   b. **Needs approval/decision from MaoYu** → Post reminder in group chat with task summary + what needs deciding. Do NOT skip.
   c. **Blocked by dependency** → Update Status=Blocked with reason, post in group chat
   - ⚠️ Never return HEARTBEAT_OK when Todo tasks exist. Every Todo must result in an action (execute/remind/block).
4. If no tasks: proceed to Workflow Audit

## Workflow Audit

Check all In Progress tasks (all assignees) for compliance:

1. **Topic exists?** — Task Board record must have Topic Link filled
2. **Topic has activity?** — Check assignee's recent session history for progress updates
3. **No private chat leaks?** — Progress should be in Topic, not DM

If violations found:
- Post a reminder in group chat @ the assignee
- Do NOT fix it for them

If all checks pass and no Todo tasks: reply HEARTBEAT_OK
