# Mao Family Task System v1

## Core Principle

**完全透明** — 所有任务可追踪，所有操作有记录。

## Task Lifecycle

```
Todo → In Progress → Done / Blocked
                      ↓
                  (解除后) → In Progress → Done
```

| 状态 | 含义 | 谁触发 |
|------|------|--------|
| Todo | 已创建，待领取 | 任何人 |
| In Progress | 已领取，执行中 | Assignee |
| Done | 完成 | Assignee |
| Blocked | 卡住，需外部介入 | Assignee |

## Task Board

- **Bitable**: Mao Family Task Board
- URL: https://zcnyz1u4a8ll.feishu.cn/base/BZSDb2P1garh3lsZTh1cPOkLnRg?table=tblpasNUYAtokUh5
- app_token: BZSDb2P1garh3lsZTh1cPOkLnRg
- table_id: tblpasNUYAtokUh5

### Fields

| 字段 | 类型 | 用途 |
|------|------|------|
| Name | Text | 任务标题 |
| Task | Text | 详细描述 |
| Assignee | SingleSelect | 执行人（Boss/MaoKu/MaoGen/MaoYi） |
| Status | SingleSelect | 生命周期状态 |
| Priority | SingleSelect | P0/P1/P2 |
| Topic Link | URL | 关联飞书话题（双向链接） |
| Created By | SingleSelect | 创建者 |
| Created/Updated | Auto | 时间戳 |

## Three Entry Paths

### ① Boss 群聊 @Agent（实时）

1. Boss @Agent 发消息
2. Agent 在群聊发 Topic 首消息（自动成为话题）
3. Agent 在 Task Board 建记录（Status=In Progress, 附 Topic Link）
4. 回到 Topic 补上 Task Board 链接
5. Topic 内记录操作日志
6. 完成 → 更新 Status=Done + 发完成汇报

### ② Task Board 异步派发

1. 任何人在 Bitable 建任务（Status=Todo, Assignee=目标）
2. Agent heartbeat（15min）发现
3. Agent 在群聊发 Topic 首消息
4. 更新 Task Board 记录：Status=In Progress, 附 Topic Link
5. Topic 内记录操作日志
6. 完成 → Done + 汇报

### ③ sessions_send 紧急直推

1. Maoku 通过 sessions_send 派发任务
2. Agent 收到后：在群聊发 Topic 首消息
3. 在 Task Board 建记录（Status=In Progress, 附 Topic Link）
4. Topic 内记录操作日志
5. 完成 → Done + 汇报

**统一原则：谁执行谁建 Topic + Task。所有任务必须有 Topic + Task Board 记录，双向链接。**

## Bidirectional Task Assignment

| 创建者 | Assignee | 条件 |
|--------|----------|------|
| Boss | 任何人 | 无限制 |
| Maoku | MaoGen / MaoYi | 在对方职责范围内 |
| MaoGen | Boss | 需要审批、需要提供信息 |
| MaoGen | MaoYi | 在 MaoYi 职责范围内 |
| MaoYi | Boss | 需要审批、需要确认设计 |
| MaoYi | MaoGen | 需要系统/环境支持 |
| Agent | Maoku | 需要协调、需要决策 |

规则：只能分配对方职责范围内的任务。

## Message Formats

### Topic 首消息

```
📋 [任务名称]

🏷 Priority: P1
👤 Assignee: MaoGen
📝 Created by: Maoku
🔗 Task: [查看记录](bitable链接)

任务描述：
[具体要做什么]
```

### 操作日志

```
🔧 [步骤描述]
$ 命令（如有）
→ 关键结果
```

粒度：一个逻辑步骤 = 一条消息。不记中间调试、重试等噪音。

### 领取通知

```
🔵 领取任务：[任务名]
Priority: P1 | Assignee: MaoGen
```

### 完成汇报

```
✅ 任务完成：[任务名]

🏷 Priority: P1
👤 Assignee: MaoGen
⏱ 耗时: 2min

📋 结果摘要：
- [要点1]
- [要点2]

🔗 Task Board | Topic
```

### 阻塞通知

```
🔴 任务阻塞：[任务名]

原因：[具体原因]
需要：[需要谁做什么]
```

## Heartbeat

- MaoGen: 每 15 分钟轮询 Task Board
- MaoYi: 每 15 分钟轮询 Task Board
- Maoku: 每 15 分钟检查 Blocked 任务，主动跟进

## Phase 2 (Future)

- 飞书卡片更新能力（补 feishu plugin outbound edit）
- Shell 输出流式推送到卡片
- 任务超时自动告警
