require('module-alias/register')
require('./server.ts')
import fs from 'fs-extra'
import path from 'node:path'
import {createOpenAPI, createWebsocket, AvailableIntentsEventsEnum, MessageToCreate} from 'qq-guild-bot';
import PluginManager, { PluginResult } from "@baibai/core/PluginManager";
import { SendMessage } from "@baibai/core/Plugin";

const config = fs.readJsonSync(path.join(__dirname, '.secret.json'))

const createBot = (options: any) => {
// 创建 client
  const client = createOpenAPI(options);

// 创建 websocket 连接
  const ws = createWebsocket(options);

  const pm = new PluginManager().init()

  const sendMsg = async (res: PluginResult[]) => {
    if(res.filter(r => r.result).length === 0) {
      return
    }
    console.log('==== plugin result ====')
    console.log(res)
    for(let i = 0; i < res.length; i++) {
      const { plugin, content, rawMessage, result } = res[i]
      const { guild_id, channel_id } = rawMessage.msg
      const sendMsg: SendMessage = typeof result === 'string' ? {
        content: result
      } : result
      try{
        let { data } = await client.messageApi.postMessage(channel_id, <MessageToCreate>sendMsg);
        console.log(`==== send data ===\n${JSON.stringify(data, null, 2)}\n ==========`)
      } catch (error) {
        console.error(`==== send error ===\n${JSON.stringify(error, null, 2)}\n ==========`)
      }
    }
  }

// 消息监听
  ws.on('READY', (wsdata) => {
    // console.log('[READY] 事件接收 :', wsdata);
    console.log(`[READY][${wsdata.msg.user.username}]`)
  });
  ws.on('ERROR', (data) => {
    console.log('[ERROR] 事件接收 :', data);
  });
  ws.on('GUILDS', (data) => {
    console.log('[GUILDS] 事件接收 :', data);
  });
// ws.on('GUILD_MEMBERS', (data) => {
//   console.log('[GUILD_MEMBERS] 事件接收 :', data);
// });
  ws.on('GUILD_MESSAGES', async (data: any) => {
    // console.log('[GUILD_MESSAGES] 事件接收 :', JSON.stringify(data, null, 2));
    console.log(`[GUILD_MESSAGES][${data.msg.guild_id}][${data.msg.channel_id}][${data.msg.author.username}]${data.msg.content}`)
    const res = await pm.matchPlugins(data, AvailableIntentsEventsEnum.GUILD_MESSAGES)
    sendMsg(res)
  });
// ws.on('GUILD_MESSAGE_REACTIONS', (data) => {
//   console.log('[GUILD_MESSAGE_REACTIONS] 事件接收 :', data);
// });
// ws.on('DIRECT_MESSAGE', (data) => {
//   console.log('[DIRECT_MESSAGE] 事件接收 :', data);
// });
// ws.on('INTERACTION', (data) => {
//   console.log('[INTERACTION] 事件接收 :', data);
// });
// ws.on('MESSAGE_AUDIT', (data) => {
//   console.log('[MESSAGE_AUDIT] 事件接收 :', data);
// });
// ws.on('FORUMS_EVENT', (data) => {
//   console.log('[FORUMS_EVENT] 事件接收 :', data);
// });
// ws.on('AUDIO_ACTION', (data) => {
//   console.log('[AUDIO_ACTION] 事件接收 :', data);
// });
  ws.on('PUBLIC_GUILD_MESSAGES', async (data: any) => {
    // console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', JSON.stringify(data, null, 2));
    console.log(`[PUBLIC_GUILD_MESSAGES][${data.msg.guild_id}][${data.msg.channel_id}][${data.msg.author.username}]${data.msg.content}`)
    const res = await pm.matchPlugins(data, AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES)
    sendMsg(res)
  });
}

const options = {
  appID: config.appID,
  token: config.token,
  intents: [
    AvailableIntentsEventsEnum.GUILD_MESSAGES,
    AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES,
  ], // 事件订阅,用于开启可接收的消息类型
  sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
};

createBot(options)
