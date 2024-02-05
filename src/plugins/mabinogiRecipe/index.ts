import Plugin, { Rule, SendMessage } from '@baibai/core/Plugin'
import config from '@baibai/configs'
import fs from "fs-extra";
import path from "node:path";
const { searchMabiRecipe } = require('./searchRecipe')

const secret = fs.readJsonSync(path.join(__dirname, '..', '..', '.secret.json'))

export default class MabinogiRecipe extends Plugin {
  constructor() {
    const name = 'MabinogiRecipe'
    const rule: Rule[] = [/^mbi/i, /^mbd/i]
    super(name, rule)
  }

  async entry(context: any, rawContent: any): Promise<SendMessage> {
    const res = await searchMabiRecipe(context.substring(3).trim(), config.IMAGE_PATH, context.toLowerCase().startsWith('mbd'))
    const output: SendMessage = {
      msg_id: rawContent.msg.id
    }

    if(res.text) {
      output.content = res.text
    }
    if(res.imageFile) {
      output.image = `${secret.publicPath}/mbi/${encodeURIComponent(res.image)}`
    }
    if(output.content || output.image) {
      return output
    } else {
      return {
        content: '出现错误',
        msg_id: rawContent.msg.id
      }
    }
  }
}