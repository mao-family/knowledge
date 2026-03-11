# TODO List

> 详见 [设计文档](agent-architecture-v2.md) 和 [skills 调研](skills-research.md)

## 高优先级

- [ ] Gateway restart — 模型切换 (claude-opus-4.6-1m) + feishu duplicate fix 生效
- [ ] MS Teams Bot — 暂停，公司租户封死 client secret。待尝试：az CLI credential reset 或个人租户
- [ ] Add Feishu doc permissions (docx:document, docx:document:readonly, drive:drive)

## 架构

- [ ] 设计 Dev Agent（agentId: dev）— 项目经理 agent，调度 Claude Code 开发，读取 claude-me 项目配置
- [ ] 统一知识库 — mao-family/knowledge (GitHub 私有 repo)
- [ ] Knowledge Agent（agentId: knowledge）— 知识网关

## Skills

- [ ] 待装 skills — 详见 [skills-research.md](skills-research.md)

## 系统

- [x] Grant Screen Recording permission（peekaboo）— done 2026-03-09
- [x] MaoGen MEMORY.md 管理规则 — already handled by system prompt, no action needed
