import Plugin, { Rule, SendMessage } from '@baibai/core/Plugin'
import config from '@baibai/configs'
import fs from "fs-extra";
import path from "node:path";
const { searchMabiRecipe } = require('./searchRecipe.js')

const secret = fs.readJsonSync(path.join(__dirname, '..', '..', '.secret.json'))

export default class MabinogiRecipe extends Plugin {
  constructor() {
    const name = 'MabinogiRecipe'
    const rule: Rule[] = [/^mbi/]
    super(name, rule)
  }

  // http://flandre.com.cn/baibai/image/mbi/%E6%AD%BB%E7%A5%9E%E6%8E%A0%E5%A4%BA%E8%80%85%E5%BC%93.png

  async entry(context: any, rawContent: any): Promise<SendMessage> {
    console.log(context)
    const res = await searchMabiRecipe(context.substring(3).trim(), config.IMAGE_PATH, false)
    console.log('=== res ===')
    console.log(res)

    if(res.text) {
      return {
        content: res.text,
        msg_id: rawContent.msg.id
      }
    }
    if(res.imageFile) {
      return {
        image: `${secret}/mbi/${res.imageFile}`,
        msg_id: rawContent.msg.id
      }
    }
    return {
      content: '出现错误',
      msg_id: rawContent.msg.id
    }
  }
}