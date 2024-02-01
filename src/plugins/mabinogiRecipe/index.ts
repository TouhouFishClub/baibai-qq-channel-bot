import Plugin, { Rule, SendMessage } from '@baibai/core/Plugin'
import config from '@baibai/configs'
const { searchMabiRecipe } = require('./searchRecipe.js')

export default class MabinogiRecipe extends Plugin {
  constructor() {
    const name = 'MabinogiRecipe'
    const rule: Rule[] = [/^mbi/]
    super(name, rule)
  }

  async entry(context: any, rawContent: any): Promise<SendMessage> {
    console.log(context)
    const res = await searchMabiRecipe(context.substring(3).trim(), config.IMAGE_PATH, false)
    console.log('=== res ===')
    console.log(res)

    return {
      content: 'world',
      msg_id: rawContent.msg.id
    }
  }
}