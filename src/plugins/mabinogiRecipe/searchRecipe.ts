import path from "node:path";
const { renderRecipeImage } = require('./renderRecipe')
const { getItems } = require('./ExportItems')

const searchMabiRecipe = async (content: any, saveDir: any, showDesc = false) => {
	if(!content.trim()) {
		return
	}
  let { ItemNameToItemId, ItemIdToItemDetail } = getItems()
  let targets: any[] = []
  if(/^\d+$/.test(content)){
    if(ItemIdToItemDetail.get(parseInt(content))) {
      targets.push(ItemIdToItemDetail.get(parseInt(content)).name)
    }
  } else {
		targets = Array.from(ItemNameToItemId.keys())
		content.replace(/[， ]/g, ',').split(',').filter((x: string) => x).forEach((keyword: string) => {
			targets = targets.filter(name => name.match(new RegExp(keyword)))
		})
  }
  if(targets.length) {
		if(targets.length == 1) {
      return {
        imageFile: await renderRecipeImage(ItemIdToItemDetail.get(ItemNameToItemId.get(targets[0])), path.join(saveDir, 'mbi', `${targets[0]}.png`), showDesc),
        image: `${targets[0]}.png`
      }
		} else {
			let em = targets.filter(name => content == name)
			if(em.length) {
        return {
          text: `找到${targets.length}\n${targets.slice(0, 10).map(x => `mbi ${ItemNameToItemId.get(x)} | ${x}`).join('\n')}\n已为您定位到${em[0]}`,
          imageFile: await renderRecipeImage(ItemIdToItemDetail.get(ItemNameToItemId.get(em[0])), path.join(saveDir, 'mbi', `${em[0]}.png`), showDesc),
          image: `${em[0]}.png`
        }
			} else {
				return {
          text: `找到${targets.length}\n${targets.slice(0, 10).map(x => `mbi ${ItemNameToItemId.get(x)} | ${x}`).join('\n')}\n可使用多关键词查找，多关键词用空格或逗号分割。`
        }
			}
		}
  } else {
    return {
      text: `未找到${content}`
    }
  }
}

module.exports = {
  searchMabiRecipe
}
