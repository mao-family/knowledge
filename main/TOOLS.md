# Local Tool Notes

## Search
- Default: Tavily (tavily-search skill)

## Knowledge Base
- NotebookLM: "OpenClaw Documentation" notebook

## Task Board
- Bitable: Mao Family Task Board
- URL: https://zcnyz1u4a8ll.feishu.cn/base/BZSDb2P1garh3lsZTh1cPOkLnRg?table=tblpasNUYAtokUh5
- app_token: BZSDb2P1garh3lsZTh1cPOkLnRg
- table_id: tblpasNUYAtokUh5
- Fields: Name (text), Task (text), Assignee (Boss/MaoKu/MaoGen/MaoYi), Status (Draft/Todo/In Progress/Done/Blocked), Priority (P0/P1/P2), Topic Link (URL)

## Group Chat
- Feishu topic group: oc_e8355cdfab57a6367c5e7cdf414fe107
- Members: User + Maoku + MaoGen + MaoYi
- Each topic = one task, context isolated
- Bot-to-bot @mention doesn't work — cross-agent coordination via Task Board
- Only respond when @mentioned; otherwise NO_REPLY

### Topic Message Templates
📋 **Dispatch**: Task name | Priority | Assignee | Task Board link | Description
🚀 **Pick up**: Executor | Estimated completion | Task Record ID
📊 **Progress**: Current status | Blockers | Next step
✅ **Done** / ❌ **Failed**: Result summary | Deliverables | Duration
