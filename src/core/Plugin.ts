export type Rule = string | RegExp

export default abstract class Plugin {
  public name: string
  protected rule: Rule[]
  protected whitelist: string[] = []
  protected blacklist: string[] = []


  constructor(name: string, rule: Rule[]) {
    this.name = name
    this.rule = rule
  }

  setWhitelist(list: string[]) {
    this.whitelist = list
  }

  setBlacklist(list: string[]) {
    this.blacklist = list
  }

  isAllowed(groupNumber: string): boolean {
    if (this.blacklist.includes(groupNumber)) {
      return false
    }
    if (this.whitelist.length > 0 && !this.whitelist.includes(groupNumber)) {
      return false
    }
    return true
  }

  process(context: any) {
    return this.rule.find((pattern) => {
      if (typeof pattern === 'string') {
        return context === pattern
      } else if (pattern instanceof RegExp) {
        return pattern.test(context)
      }
      return false
    })
  }

  abstract entry(context: any, rawContent? : any) : any | Promise<any>
}