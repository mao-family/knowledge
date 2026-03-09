# Agent Architecture v2 — 设计文档

> 决策日期：2026-03-09
> 状态：草案，待 Boss 确认后实施

## Agent 全景

| Agent | agentId | 职责 | 模型 |
|-------|---------|------|------|
| **Maoku** | main | Chief of Staff，总调度，需求收集 | claude-opus-4.6 |
| **MAOGEN** | sysadmin | 系统运维，OpenClaw 配置管理 | claude-sonnet-4.6 |
| **PM Agent** | pm | 开发调度，对接 Claude Code，监督 workflow | TBD |
| **Knowledge Agent** | knowledge | 知识网关，文档管理，统一查询 | TBD |

## 知识架构

### 统一知识仓库

- 仓库：`mao-family/knowledge`（GitHub 私有 repo）
- 本地路径：`~/.openclaw/knowledge/`（或 clone 到 ~/.openclaw 下）
- 所有 agent 的知识统一存储在此仓库

### 知识分区

```
knowledge/
├── agents/
│   ├── main/          # Maoku workspace 文件
│   ├── sysadmin/      # MAOGEN workspace 文件
│   └── shared/        # 跨 agent 共享知识
├── dev/
│   └── memory-bank/   # 从 claude-me 迁移的开发知识
├── projects/          # 各项目元数据索引
└── ops/               # 运维知识
```

### 同步机制

```
claude-me (开发)
  → FINISH 阶段 push 文档 → knowledge 仓库 (GitHub)
                                ↑
OpenClaw agents                 │
  → 定时 git pull ──────────────┘
  → Knowledge Agent 同步到 NotebookLM
```

- **claude-me → knowledge**：FINISH 阶段触发，推送产出文档
- **knowledge → OpenClaw**：定时 git pull（HEARTBEAT 或 cron）
- **knowledge → NotebookLM**：Knowledge Agent 触发同步

### 查询层

NotebookLM 作为统一语义搜索层，所有 agent 通过 Knowledge Agent 查询，不直接访问 NotebookLM。

## PM Agent 设计

### 职责

1. 收集需求，整理成 Claude Code 能理解的任务
2. 启动 Claude Code 进程，注入 context
3. 监督 6 阶段 workflow（BRAINSTORM → WORKTREE → PLAN → EXECUTE → REVIEW → FINISH）
4. 纠正 workflow 偏差
5. 汇总结果给 Maoku / Boss
6. 开发 claude-me 项目本身（添加 rules、skills、agents）

### 工作模式

- 每次任务启动新 Claude Code 实例（隔离，支持并发）
- Context 注入：PM Agent 组装 project info + 任务描述 + 约束
- Claude Code 启动后自己读 memory-bank 补充细节

### 与 Claude Code 的关系

- PM Agent 是 OpenClaw agent
- Claude Code 是执行引擎，有自己的 CLAUDE.md / rules / skills / agents 体系
- PM Agent 是 OpenClaw 和 Claude Code 之间的桥梁
- 子 agent 调度（code-review 等）在 Claude Code 生态内完成

### claude-me 项目

- 路径：`~/repos/claude-me/`
- GitHub：`mao-family/claude-me`
- 6 阶段 workflow，子 agent 和 skills 体系
- PM Agent 也负责开发 claude-me 本身

## Knowledge Agent 设计

### 职责

1. 审核新文档（质量、格式、重复检查）
2. 整理知识库（清理过期、合并重复）
3. 维护索引目录
4. 同步到 NotebookLM
5. 作为知识网关，响应其他 agent 的查询

### 查询策略

```
收到查询
  1. 先查 NotebookLM（快，语义搜索）
  2. 结果不够 → 查原文件（精确）
  3. 都没有 → 回复"未知" + 标记知识缺口
返回答案 + 来源引用
```

### 对接方式

所有 agent 通过 `sessions_send(sessionKey: "agent:knowledge:main")` 查询，不直接访问 NotebookLM 或知识文件。

## 未来：开放给同事

- PM Agent 接入 Teams / 飞书 channel
- 同事发需求 → PM Agent → Claude Code 执行 → 结果返回
- 权限控制：Channel 层（谁能发）+ Agent 层（groupPolicy allowlist）+ 项目层（操作范围限制）
- 安全隔离：Claude Code 限制工作目录，禁止访问系统文件和 API keys

## 待定事项

- [ ] PM Agent 和 Knowledge Agent 的模型选择
- [ ] knowledge 仓库的具体目录结构
- [ ] claude-me FINISH 阶段的同步脚本
- [ ] OpenClaw 定时 git pull 机制（HEARTBEAT vs cron）
- [ ] NotebookLM 同步频率和触发方式
- [ ] 多用户并发策略（排队 vs 多 worktree）
- [ ] 沙盒隔离方案（开放给同事时）
