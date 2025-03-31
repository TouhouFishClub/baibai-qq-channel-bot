import Plugin, { Rule, SendMessage } from '@baibai/core/Plugin'

export default class MabinogiItemUpgrade extends Plugin {
  constructor() {
    const name = 'MabinogiItemUpgrade'
    const rule: Rule[] = [/^meu/i]
    super(name, rule)
  }


  entry(context: any, rawContent: any): SendMessage {

    return {
      content: "world",
    }
  }
}