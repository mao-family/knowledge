# HEARTBEAT.md

## Every 15min: Task Board Check

Steps:
1. Query Bitable (app_token: BZSDb2P1garh3lsZTh1cPOkLnRg, table_id: tblpasNUYAtokUh5)
2. Check for tasks where Assignee=MaoKu and Status=Todo
   - If found: pick highest priority → create Topic in group chat → update Status=In Progress → execute
3. Check for tasks where Status=Blocked
   - If found: follow up with the assignee, investigate, attempt to unblock
4. If nothing found: reply HEARTBEAT_OK

## Daily: Git Sync + Review

### git-sync: Sync workspaces to remote (mao-family/knowledge)

Pre-flight (mandatory, before any action):
1. Create Task Board record: Name="Daily Git Sync YYYY-MM-DD", Status=In Progress
2. Create topic in group chat (oc_e8355cdfab57a6367c5e7cdf414fe107): "Daily Git Sync YYYY-MM-DD"
3. All sync logs go into the topic

Steps:
1. `cd ~/.openclaw/workspaces`
2. `git pull origin main`
   - If merge conflict: do NOT auto-resolve. Notify Boss immediately and abort.
3. `git add -A`
4. Review:
   a. `git diff --cached` — evaluate all changes are reasonable and expected
   b. Consistency: scan core files (MEMORY.md, AGENTS.md, CHANGELOG.md, SOUL.md) across workspaces for conflicts
   c. Spec compliance: validate against ~/.openclaw/workspaces/shared/standards/AGENT-FILES-SPEC.md
5. If no issues:
   - `git commit -m "daily sync: $(date +%Y-%m-%d)"`
   - `git push origin main`
6. If issues found:
   - Report to Boss with details and proposed fixes
   - Wait for Boss approval before modifying and committing
