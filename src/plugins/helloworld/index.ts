import Plugin, { Rule, SendMessage } from '@baibai/core/Plugin'

export default class HelloWorld extends Plugin {
  constructor() {
    const name = 'HelloWorld'
    const rule: Rule[] = ['hello', /^He/]
    super(name, rule)
    // this.setBlacklist([713377277])
    // this.setWhitelist([713377277])
  }

  entry(context: any, rawContent: any): SendMessage {
    // return 'world'
    return {
      content: "world",
      image: `https://pic1.zhimg.com/v2-b8c1a1d62a727ad4ee31028aefdd9dd5_r.jpg`,
      msg_id: rawContent.msg.id
    }
  }
}