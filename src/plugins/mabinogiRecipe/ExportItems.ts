import fs from "fs-extra";
import path from "node:path";
const iconv = require('iconv-lite');

// 在全局作用域中访问 SkillList
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/Skill.js')).toString('utf-16le'));
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/TailoringItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/MillingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/HandicraftItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/WeavingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/RefineItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/BlacksmithItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/CookingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/PotionMakingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/FishingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/DissolutionItem.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/SynthesisItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/CarpentryItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/StageTicketMakingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/HeulwenEngineeringItem.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/MagicCraftItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/StationaryCraftItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/FynnsCraftItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/ManaFormingItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/MetalConversionItem.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/CommerceMasteryProduct.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/RelicInvestigationItem.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/ErgEnhance.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/Item.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/ErinnFormula..js')).toString('utf-8')) // 需要屏蔽最後加載NPCTime的timer
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/KillItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/ExplorationItem.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/GiftItem.js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/QuestItem.js')).toString('utf-8'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/ErinnWeaponShapeTransformScroll..js')).toString('utf-16le'))
eval.call(global, fs.readFileSync(path.join(__dirname, '/source/js/Product.js')).toString('utf-8'))

const ItemNameToItemId = new Map()
const ItemIdToItemDetail = new Map()

const CreateSkillLists = () => {
  //@ts-ignore
  (global as any).SkillList.forEach(skillId => {
    let skill = eval(`Skill${skillId}`)
    console.log(`===== ${skillId} ${skill[0]} =====`)
    let skillList = eval(`${skill[1]}List`)
    // console.log(JSON.stringify(skillList), null, 2)
    if(skillList.filter((x: number) => x == 101).length) {
      console.log('target')
    }
    FormatItems(skillList, skill[0], skill[1], skillId)
  })
}


const FormatItems = (skillList: any, skillName: string, skillCode: string | number, skillId: string | number) => {
  skillList.forEach((itemId: any) => {
    let item
    // console.log(`=> ${skillId} | ${itemId}`)
    switch(skillId) {
      case 55100:
      case '55100':
        // 贸易精通不需要
        item = eval(`Product${itemId}`);
        break;
      default:
        item = eval(`Item${itemId}`);
    }
    ItemNameToItemId.set(item[0], itemId)
    ItemIdToItemDetail.set(itemId, {
      itemSource: item,
      name: item[0],
      skillName,
      skillCode,
      skillId,
      itemId
    })
  })
}

const getItems = () => {
  if (!ItemNameToItemId.size) {
    eval(fs.readFileSync(path.join(__dirname, '/source/js/Skill.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/TailoringItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/MillingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/HandicraftItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/WeavingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/RefineItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/BlacksmithItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/CookingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/PotionMakingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/FishingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/DissolutionItem.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/SynthesisItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/CarpentryItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/StageTicketMakingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/HeulwenEngineeringItem.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/MagicCraftItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/StationaryCraftItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/FynnsCraftItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/ManaFormingItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/MetalConversionItem.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/CommerceMasteryProduct.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/RelicInvestigationItem.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/ErgEnhance.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/Item.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/ErinnFormula..js')).toString('utf-8')) // 需要屏蔽最後加載NPCTime的timer
    eval(fs.readFileSync(path.join(__dirname, '/source/js/KillItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/ExplorationItem.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/GiftItem.js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/QuestItem.js')).toString('utf-8'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/ErinnWeaponShapeTransformScroll..js')).toString('utf-16le'))
    eval(fs.readFileSync(path.join(__dirname, '/source/js/Product.js')).toString('utf-8'))
    CreateSkillLists()
  }
  return {
    ItemNameToItemId,
    ItemIdToItemDetail
  }
}

module.exports = {
  getItems
}

