"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require('puppeteer');
var path = require('path');
var tools_1 = require("./tools");
/**
 * 将网页转换为PDF文件
 * */
function handlePageToPdf() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, ext, key, _path;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--font-render-hinting=medium']
                    })
                    // 打开新窗口
                ];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()
                        // 跳转到指定页面
                    ];
                case 2:
                    page = _a.sent();
                    // 跳转到指定页面
                    return [4 /*yield*/, page.goto("https://www.baidu.com/", {
                            waitUntil: 'networkidle2',
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
                    ];
                case 3:
                    // 跳转到指定页面
                    _a.sent();
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
                    return [4 /*yield*/, tools_1.autoScroll(page)]; // 因为文章图片引入了懒加载，所以需要把页面滑动到最底部，保证所有图片都加载出来
                case 4:
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
                    _a.sent(); // 因为文章图片引入了懒加载，所以需要把页面滑动到最底部，保证所有图片都加载出来
                    ext = '.pdf';
                    key = tools_1.randomFilename('baidu', ext);
                    _path = path.resolve('./', key);
                    // 指定路径，生成pdf
                    return [4 /*yield*/, page.pdf({ path: _path, format: 'a4' })
                        // 关闭浏览器
                    ];
                case 5:
                    // 指定路径，生成pdf
                    _a.sent();
                    // 关闭浏览器
                    return [4 /*yield*/, browser.close()];
                case 6:
                    // 关闭浏览器
                    _a.sent();
                    return [2 /*return*/, {
                            path: _path,
                            key: key,
                            ext: ext
                        }];
            }
        });
    });
}
handlePageToPdf();
