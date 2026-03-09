# Skills 调研记录

> 调研过的 skill 汇总。详细评估见各 skill 的子文档。

## 总览

| 状态 | 数量 |
|------|------|
| ✅ 已安装 | 6 |
| 📋 待装 | 7 |
| ❌ 不装 | 6 |
| 📦 内置 | 8 |

## 已安装

| Skill | 功能 |
|-------|------|
| self-improving-agent | 错误学习，被动改进 |
| agent-browser | 浏览器自动化 |
| find-skills | 搜索 skills.sh 生态 |
| skill-vetter | 安装前安全审核 |
| tavily-search | AI 优化 web 搜索 |
| notebooklm | NotebookLM API |

## 待装

| Skill | 功能 | 风险 |
|-------|------|------|
| [ByteRover](skills/byterover.md) | 知识管理，query+curate | 低 |
| [Capability Evolver](skills/capability-evolver.md) | 自进化引擎，自动修复 | 中高 |
| hacker-news | HN 搜索/浏览 | 低 |
| x-twitter-collector | 推文收集，中英双语报告 | 低 |
| reddit-readonly | Reddit 只读浏览 | 极低 |
| xiaohongshu-mcp | 小红书读写 | 中 |
| ai-daily-digest | Karpathy 精选 90 博客日报 | 低 |

## 详细评估

### Twitter/X 生态

| Skill | 安装量 | 功能 | 评估 |
|-------|--------|------|------|
| x-twitter | 3.622 评分 | 读推文、搜索、发推、点赞、转推 | 读写全能，最全面 |
| bird-twitter | - | 发推、回复、阅读、搜索（bird CLI, GraphQL） | 轻量 CLI wrapper |
| x-twitter-collector | - | 收集指定用户 24h 推文，中英双语报告+截图 | 阅读向，适合追踪 AI 大佬 |
| mia-twitter-stealth | - | Twitter 自动化+反检测 | 防封号，激进 |
| twitter-operations | - | 发推、定时发、回复、分析、追踪趋势 | 功能最全但重 |
| twitter-post | - | 纯发推 | 太单一 |

**结论**: 选 x-twitter-collector（只读追踪），需要发推时再装 x-twitter

## 不装

| Skill | 原因 |
|-------|------|
| wacli | 不需要 WhatsApp |
| ATXP | 付费 API |
| sonoscli | 智能家居 |
| x-twitter | 暂不需要发推，用 collector 够了 |
| mia-twitter-stealth | 不需要反检测 |
| twitter-operations | 和 x-twitter 重叠 |
| twitter-post | 太单一 |
| rss-ai-reader | 和 ai-daily-digest 重叠 |
