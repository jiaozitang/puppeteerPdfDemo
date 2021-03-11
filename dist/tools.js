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
exports.autoScroll = exports.simulateLogin = exports.randomFilename = void 0;
var chance = require('chance').Chance();
/**
 * 基于源文件名，生成随机文件名
 * @param {string} name 源文件名字
 * @param {string} ext 源文件后缀
 */
function randomFilename(name, ext) {
    return name + "_" + Date.now() + "_" + chance.hash({ length: 3 }) + ext;
}
exports.randomFilename = randomFilename;
/**
 * 设置登录cookie
 * */
function simulateLogin(page, cookies, domain) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.evaluate(function (sig, sess, domain) {
                        var date = new Date();
                        date = new Date(date.setDate(date.getDate() + 1));
                        var expires = '';
                        expires = "; expires=" + date.toUTCString();
                        document.cookie = "koa:sess.sig=" + sig + expires + "; domain=" + domain + "; path=/";
                        document.cookie = "koa:sess=" + sess + "=" + expires + "; domain=" + domain + "; path=/"; // =是这个cookie的value
                        document.cookie = "is_login=true" + expires + "; domain=" + domain + "; path=/";
                    }, cookies['koa:sess.sig'], cookies['koa:sess'], domain)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.simulateLogin = simulateLogin;
/**
 * 控制页面自动滚动
 * */
/* ts-ignore */
function autoScroll(page) {
    return page.evaluate(function () {
        return new Promise(function (resolve) {
            var totalHeight = 0;
            var distance = 100;
            // 每200毫秒让页面下滑100像素的距离
            var timer = setInterval(function () {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 200);
        });
    });
}
exports.autoScroll = autoScroll;
