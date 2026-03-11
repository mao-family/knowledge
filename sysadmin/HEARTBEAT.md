# HEARTBEAT.md

## Task Board Poll

1. `feishu_bitable_list_records(app_token: "BZSDb2P1garh3lsZTh1cPOkLnRg", table_id: "tblpasNUYAtokUh5")`
2. Filter: Assignee=MaoGen, Status=Todo
3. If tasks found: pick highest priority (P0 > P1 > P2)
   - Update Status → In Progress
   - Execute the task
   - Update Status → Done (or Blocked with reason in Task field)
4. If no tasks: HEARTBEAT_OK
