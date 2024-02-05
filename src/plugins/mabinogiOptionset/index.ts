import Plugin, { Rule, SendMessage } from '@baibai/core/Plugin'

export default class MabinogiOptionset extends Plugin {
  constructor() {
    const name = 'MabinogiOptionset'
    const rule: Rule[] = [/^opt/i]
    super(name, rule)
  }

  entry(context: any, rawContent: any): SendMessage {
    return {
      content: "world",
    }
  }
}