#!/usr/bin/env node
// Daily Changelog Generator
// Reads Mao Family group messages from past 24h and generates a Feishu doc

import https from 'https';

const APP_ID = 'cli_a93a4924b4785cd9'; // MaoYi
const APP_SECRET = 'Duhl2GQ9YQUlTIjdxcj26bY3TVG7xPYq';
const CHAT_ID = 'oc_e8355cdfab57a6367c5e7cdf414fe107';

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch(e) { reject(new Error(data)); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getTenantToken() {
  const res = await request({
    hostname: 'open.feishu.cn',
    path: '/open-apis/auth/v3/tenant_access_token/internal',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { app_id: APP_ID, app_secret: APP_SECRET });
  if (res.code !== 0) throw new Error(`Token error: ${JSON.stringify(res)}`);
  return res.tenant_access_token;
}

async function getMessages(token, startTime, endTime, pageToken) {
  const params = new URLSearchParams({
    container_id_type: 'chat',
    container_id: CHAT_ID,
    start_time: String(startTime),
    end_time: String(endTime),
    sort_type: 'ByCreateTimeAsc',
    page_size: '50',
  });
  if (pageToken) params.set('page_token', pageToken);
  
  const res = await request({
    hostname: 'open.feishu.cn',
    path: `/open-apis/im/v1/messages?${params}`,
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res;
}

async function getAllMessages(token, startTime, endTime) {
  let all = [];
  let pageToken = null;
  let hasMore = true;
  while (hasMore) {
    const res = await getMessages(token, startTime, endTime, pageToken);
    if (res.code !== 0) { console.error('Messages error:', JSON.stringify(res)); break; }
    if (res.data?.items) all.push(...res.data.items);
    hasMore = res.data?.has_more || false;
    pageToken = res.data?.page_token || null;
  }
  return all;
}

function parseMessage(msg) {
  const ts = parseInt(msg.create_time) * 1000;
  const date = new Date(ts);
  const time = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Shanghai' });
  
  const sender = msg.sender?.sender_type === 'app' ? (msg.sender?.id || 'Bot') : (msg.sender?.id || 'User');
  let senderName = sender;
  
  let content = '';
  try {
    const body = JSON.parse(msg.body?.content || '{}');
    content = body.text || body.title || msg.msg_type || '';
  } catch {
    content = msg.msg_type || '';
  }
  
  return { time, senderName, content, msgType: msg.msg_type, ts };
}

function categorize(msg) {
  const c = msg.content.toLowerCase();
  if (c.includes('gateway') || c.includes('restart') || c.includes('heartbeat') || c.includes('config') || c.includes('openclaw') || c.includes('权限') || c.includes('plugin') || c.includes('deploy')) return 'system';
  if (c.includes('commit') || c.includes('merge') || c.includes('pr') || c.includes('git') || c.includes('file') || c.includes('文件') || c.includes('修改') || c.includes('更新') || c.includes('创建') || c.includes('write') || c.includes('delete')) return 'file';
  return 'task';
}

async function main() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const startTime = Math.floor(yesterday.getTime() / 1000);
  const endTime = Math.floor(now.getTime() / 1000);
  
  console.log(`Fetching messages from ${yesterday.toISOString()} to ${now.toISOString()}`);
  
  const token = await getTenantToken();
  const messages = await getAllMessages(token, startTime, endTime);
  
  console.log(`Found ${messages.length} messages`);
  
  const parsed = messages
    .filter(m => m.msg_type === 'text' || m.msg_type === 'post' || m.msg_type === 'interactive')
    .map(parseMessage);
  
  const system = parsed.filter(m => categorize(m) === 'system');
  const file = parsed.filter(m => categorize(m) === 'file');
  const task = parsed.filter(m => categorize(m) === 'task');
  
  const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Shanghai' }).replace(/\//g, '-');
  
  let markdown = `# Daily Changelog - ${dateStr}\n\n`;
  markdown += `> 自动生成，覆盖过去 24 小时群消息\n\n`;
  
  const renderSection = (title, items) => {
    markdown += `## ${title}\n\n`;
    if (items.length === 0) {
      markdown += `（无）\n\n`;
    } else {
      items.forEach(m => {
        const preview = m.content.substring(0, 120).replace(/\n/g, ' ');
        markdown += `**${m.time}** [${m.senderName}] ${preview}\n\n`;
      });
    }
  };
  
  renderSection('🔧 系统变更', system);
  renderSection('📁 文件变更', file);
  renderSection('📋 任务记录', task);
  
  // Output markdown for piping
  console.log('---CHANGELOG_START---');
  console.log(markdown);
  console.log('---CHANGELOG_END---');
  console.log(`\nTitle: ${dateStr}`);
}

main().catch(console.error);
