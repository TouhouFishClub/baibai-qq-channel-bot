const path = require('path')
const { renderRecipeImage } = require('./renderRecipe')
const { getItems } = require('./ExportItems')

const searchMabiRecipe = async (content, saveDir, showDesc = false) => {
	if(!content.trim()) {
		return
	}
  let { ItemNameToItemId, ItemIdToItemDetail } = getItems()
  let targets = []
  if(/^\d+$/.test(content)){
    if(ItemIdToItemDetail.get(parseInt(content))) {
      targets.push(ItemIdToItemDetail.get(parseInt(content)).name)
    }
  } else {
		targets = Array.from(ItemNameToItemId.keys())
		content.replace(/[， ]/g, ',').split(',').filter(x => x).forEach(keyword => {
			targets = targets.filter(name => name.match(new RegExp(keyword)))
		})
  }
  if(targets.length) {
		if(targets.length == 1) {
      return {
        image: await renderRecipeImage(ItemIdToItemDetail.get(ItemNameToItemId.get(targets[0])), path.join(saveDir, `${targets[0]}.png`), showDesc)
      }
		} else {
			let em = targets.filter(name => content == name)
			if(em.length) {
        return {
          text: `找到${targets.length}\n${targets.slice(0, 10).map(x => `mbi ${ItemNameToItemId.get(x)} | ${x}`).join('\n')}\n已为您定位到${em[0]}`,
          image: await renderRecipeImage(ItemIdToItemDetail.get(ItemNameToItemId.get(em[0])), path.join(saveDir, `${em[0]}.png`), showDesc)
        }
			} else {
				return {
          text: `找到${targets.length}\n${targets.slice(0, 10).map(x => `mbi ${ItemNameToItemId.get(x)} | ${x}`).join('\n')}\n可使用多关键词查找，多关键词用空格或逗号分割。`
        }
			}
		}
  } else {
    return `未找到${content}`
  }
}

module.exports = {
  searchMabiRecipe
}
