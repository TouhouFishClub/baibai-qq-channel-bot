import fs from "fs-extra";
import path from "node:path";
const puppeteer = require('puppeteer');

const renderRecipeImage = async (data: any, output: any, showDesc = false) => {
  let {skillId, itemId} = data

  const browser = await puppeteer.launch(); // 启动浏览器
  const page = await browser.newPage(); // 打开一个新页面

  // 导航到本地网页
  await page.goto('file://' + __dirname + '/source/ErinnFormula.html'); // 将路径替换为你的本地网页路径

  // 等待一段时间，确保网页加载完成
  await page.waitForTimeout(1000); // 可根据需要调整等待时间

  // 查找页面中的某个元素，例如一个按钮，然后模拟点击它
  await page.click(`#Skill${skillId}`); // 将选择器替换为你要点击的元素的实际选择器

  // 等待一段时间，确保点击操作完成或页面加载完成
  await page.waitForTimeout(500); // 可根据需要调整等待时间

  // 查找页面中的某个元素，例如一个按钮，然后模拟点击它
  await page.click(`#Cuisine${itemId}`); // 将选择器替换为你要点击的元素的实际选择器

  // 等待一段时间，确保点击操作完成或页面加载完成
  await page.waitForTimeout(500); // 可根据需要调整等待时间

  // 获取特定元素的位置和尺寸
  await page.addStyleTag({ content: '.MainTd { background-color: transparent; }' }); // 替换为你自定义的 CSS
  await page.addStyleTag({ content: '#MainBodySpan::before { content: "数据来源：https://invisible-wings.github.io/\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0\\00a0作者：隐翅"; margin-bottom: 10px; font-size: 16px; display:block;}' });
  
  if(showDesc) {
    await page.addStyleTag({ content: '#MainBody { height: 20000px; }' }); // 替换为你自定义的 CSS
  }
  const element = await page.$(showDesc ? '#MainBodySpan' : '#MainBody'); // 将选择器替换为你要截取的元素的选择器

  const boundingBox = await element.boundingBox();

  const directory = path.dirname(output);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  if (boundingBox) {
    // 截取特定区域并保存为图片
    await page.screenshot({
      path: output,
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height
      }
    });

    console.log(`保存${output}成功！`)
    return output

  } else {
    console.error('Element not found or not visible');
  }

  await browser.close(); // 关闭浏览器
}

module.exports = {
  renderRecipeImage
}
