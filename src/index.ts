const puppeteer = require('puppeteer')
const path = require('path');
import { randomFilename, simulateLogin, autoScroll } from './tools'

/**
 * 将网页转换为PDF文件
 * */
async function handlePageToPdf () { // id: string, title: string, cookie: string, is_open: boolean
  // 生成浏览器
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--font-render-hinting=medium']
  })

  // 打开新窗口
  const page = await browser.newPage()

  // 跳转到指定页面
  await page.goto(`https://www.baidu.com/`, { // ${baseURL}/article/${id}
    waitUntil: 'networkidle2', // networkidle2 会一直等待，直到页面加载后同时没有存在 2 个以上的资源请求，这个种状态持续至少 500 ms
  })

  // 文章未对外开放，需登录后生成PDF
  // 体验注入cookie流程需要内网的权限，这里不做演示了
  // 我为什么能获取到cookie，是因为这个生成PDF的函数是在一个需登录态的接口中调用的，接口里能拿到cookie。
  /* if (!is_open) {
    // 设置登录态
    const cookies = handleStrToObject(cookie)
    await simulateLogin(page, cookies, config.domain.split('//')[1])

    // 跳转到指定页面
    await page.goto(`${baseURL}/article/${id}`, {
      waitUntil: 'networkidle2', // networkidle2 会一直等待，直到页面加载后同时没有存在 2 个以上的资源请求，这个种状态持续至少 500 ms
    })
  } */

  // 加载所有懒加载资源
  await autoScroll(page) // 因为文章图片引入了懒加载，所以需要把页面滑动到最底部，保证所有图片都加载出来
  const ext = '.pdf'
  const key = randomFilename('baidu', ext)
  const _path = path.resolve('./', key)

  // 指定路径，生成pdf
  await page.pdf({ path: _path, format: 'a4' })

  // 关闭浏览器
  await browser.close()

  return {
    path: _path,
    key,
    ext
  }
}

handlePageToPdf()