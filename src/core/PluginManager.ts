import fs from "node:fs"
import path from "node:path"
import Plugin from '@baibai/core/Plugin'


export default class PluginManager {
  private plugins: Plugin[] = [];
  constructor() {
  }
  installPlugins(...plugins: Plugin[]) {
    this.plugins = this.plugins.concat(...plugins)
    return this
  }
  private autoLoadPlugins() {
    const pluginsDir = path.join(__dirname, '../plugins')
    const pluginFolders = fs.readdirSync(pluginsDir);

    pluginFolders.forEach((folderName) => {
      const pluginPath = path.join(pluginsDir, folderName, 'index.ts')
      if(fs.existsSync(pluginPath)) {
        try {
          const Plugin = require(pluginPath).default
          const pluginInstance = new Plugin()
          this.installPlugins(pluginInstance)
        } catch (error) {
          console.error(`Error loading plugin from ${pluginPath}:`, error)
        }
      }
    })
  }

  async matchPlugins(rawMessage: any){
    let { content, guild_id, channel_id } = rawMessage.msg
    switch(rawMessage.eventType) {
      case 'AT_MESSAGE_CREATE':
        content = content.split('/').slice(1).join('/')
        break
      case 'MESSAGE_CREATE':
        break
    }

    const filterPlugins = this.plugins.filter((plugin: Plugin) => plugin.process(content) && plugin.isAllowed(`${guild_id}-${channel_id}`))

    return Promise.all(filterPlugins.map(plugin => {
      return {
        plugin,
        content,
        rawMessage,
        result: plugin.entry(content)
      }
    }))
  }
  init() {
    this.autoLoadPlugins()
    return this
  }
}