import Plugin, { Rule } from '@baibai/core/Plugin'
import { createHash } from 'node:crypto'

export default class Jrrp extends Plugin {
  constructor() {
    const name = 'Jrrp'
    const rule: Rule[] = [/^jrrp$/i]
    super(name, rule)
  }

  entry(context: any, rawContent: any): any | Promise<any> {
    let str = `${rawContent.msg.author.id}${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
    let md = createHash('md5').update(str).digest('hex')
    let rp = parseInt(md.substring(0, 15), 16).toString().split('').reduce((p, c) => p + parseInt(c), 0)
    let rpFixType = parseInt(md.substring(15, 16), 16) % 3
    let rpFix = parseInt(md.substring(16, 20), 16).toString().split('').reduce((p, c) => p + parseInt(c), 0)
    switch (rpFixType){
      case 0:
        rp += rpFix
        break
      case 1:
        rp -= rpFix
        break
    }
    if(rp < 0){
      rp = Math.abs(rp)
    }
    if(rp > 100){
      if(rp > 105){
        rp = 100 - (rp - 105)
      }
      else {
        rp = 100
      }
    }
    return `今天的运势指数是 ${rp}% ！\n${new Array(rp).fill('|').join('')}`
  }
}
