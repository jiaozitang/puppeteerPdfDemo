const chance = require('chance').Chance()

/**
 * 基于源文件名，生成随机文件名
 * @param {string} name 源文件名字
 * @param {string} ext 源文件后缀
 */
export function randomFilename (name: string, ext: string) {
  return `${name}_${Date.now()}_${chance.hash({ length: 3 })}${ext}`
}

/**
 * 设置登录cookie
 * */
export async function simulateLogin (page: { evaluate: (arg0: (sig: any, sess: any, domain: any) => void, arg1: any, arg2: any, arg3: any) => any }, cookies: { [x: string]: any }, domain: any) {
  return await page.evaluate((sig, sess, domain) => {
    let date = new Date()
    date = new Date(date.setDate(date.getDate() + 1))
    let expires = ''
    expires = `; expires=${date.toUTCString()}`
    document.cookie = `koa:sess.sig=${sig}${expires}; domain=${domain}; path=/`
    document.cookie = `koa:sess=${sess}=${expires}; domain=${domain}; path=/` // =是这个cookie的value
    document.cookie = `is_login=true${expires}; domain=${domain}; path=/`
  }, cookies['koa:sess.sig'], cookies['koa:sess'], domain)
}

/**
 * 控制页面自动滚动
 * */
/* ts-ignore */
export function autoScroll (page: any) {
  return page.evaluate(() => {
    return new Promise<void>(resolve => {
      let totalHeight = 0
      const distance = 100
      // 每200毫秒让页面下滑100像素的距离
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight
        window.scrollBy(0, distance)
        totalHeight += distance
        if (totalHeight >= scrollHeight) {
          clearInterval(timer)
          resolve()
        }
      }, 200)
    })
  })
}
