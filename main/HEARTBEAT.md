# HEARTBEAT.md

## Daily: Git Sync + Review

### git-sync: Sync workspaces to remote (mao-family/knowledge)

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
