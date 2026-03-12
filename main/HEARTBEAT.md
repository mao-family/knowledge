# HEARTBEAT.md

## Every 15min: Task Board Check

Steps:
1. Query Bitable (app_token: BZSDb2P1garh3lsZTh1cPOkLnRg, table_id: tblpasNUYAtokUh5)
2. Check for tasks where Assignee=MaoKu and Status=Todo
   - If found: pick highest priority → create Topic in group chat → update Status=In Progress → execute
3. Check for tasks where Status=Blocked
   - If found: follow up with the assignee, investigate, attempt to unblock
4. If nothing found: reply HEARTBEAT_OK
