"use strict";
/**
 * Windows托盘图标操作Electron封装类
 * 作者：zhaoleimxd
 * 原理：使用Node FFI调用Windows API，封装为TypeScript类提供给Electron调用
 * NPM依赖：
 *      electron
 *      ffi-napi
 * 导出类名：Electray
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Electray = void 0;
const events = __importStar(require("events"));
const ffi = __importStar(require("ffi-napi"));
const ref = __importStar(require("ref-napi"));
var WindowsAPIConstant;
(function (WindowsAPIConstant) {
    // BOOL macros of windows SDK
    WindowsAPIConstant[WindowsAPIConstant["FALSE"] = 0] = "FALSE";
    WindowsAPIConstant[WindowsAPIConstant["TRUE"] = 1] = "TRUE";
    // Windows Resource Identifier
    WindowsAPIConstant[WindowsAPIConstant["IDI_APPLICATION"] = 32512] = "IDI_APPLICATION";
    // Icon
    WindowsAPIConstant[WindowsAPIConstant["ICON_BIG"] = 1] = "ICON_BIG";
    WindowsAPIConstant[WindowsAPIConstant["ICON_SMALL"] = 0] = "ICON_SMALL";
    WindowsAPIConstant[WindowsAPIConstant["ICON_SMALL2"] = 2] = "ICON_SMALL2";
    // Windows Messages
    WindowsAPIConstant[WindowsAPIConstant["WM_CONTEXTMENU"] = 123] = "WM_CONTEXTMENU";
    WindowsAPIConstant[WindowsAPIConstant["WM_GETICON"] = 127] = "WM_GETICON";
    WindowsAPIConstant[WindowsAPIConstant["WM_MOUSEMOVE"] = 512] = "WM_MOUSEMOVE";
    WindowsAPIConstant[WindowsAPIConstant["WM_LBUTTONDOWN"] = 513] = "WM_LBUTTONDOWN";
    WindowsAPIConstant[WindowsAPIConstant["WM_LBUTTONUP"] = 514] = "WM_LBUTTONUP";
    WindowsAPIConstant[WindowsAPIConstant["WM_LBUTTONDBLCLK"] = 515] = "WM_LBUTTONDBLCLK";
    WindowsAPIConstant[WindowsAPIConstant["WM_RBUTTONDOWN"] = 516] = "WM_RBUTTONDOWN";
    WindowsAPIConstant[WindowsAPIConstant["WM_RBUTTONUP"] = 517] = "WM_RBUTTONUP";
    WindowsAPIConstant[WindowsAPIConstant["WM_RBUTTONDBLCLK"] = 518] = "WM_RBUTTONDBLCLK";
    WindowsAPIConstant[WindowsAPIConstant["WM_MBUTTONDOWN"] = 519] = "WM_MBUTTONDOWN";
    WindowsAPIConstant[WindowsAPIConstant["WM_MBUTTONUP"] = 520] = "WM_MBUTTONUP";
    WindowsAPIConstant[WindowsAPIConstant["WM_MBUTTONDBLCLK"] = 521] = "WM_MBUTTONDBLCLK";
    WindowsAPIConstant[WindowsAPIConstant["WM_USER"] = 1024] = "WM_USER";
    // NotifyIcon flags
    WindowsAPIConstant[WindowsAPIConstant["NIF_MESSAGE"] = 1] = "NIF_MESSAGE";
    WindowsAPIConstant[WindowsAPIConstant["NIF_ICON"] = 2] = "NIF_ICON";
    WindowsAPIConstant[WindowsAPIConstant["NIF_TIP"] = 4] = "NIF_TIP";
    WindowsAPIConstant[WindowsAPIConstant["NIF_STATE"] = 8] = "NIF_STATE";
    WindowsAPIConstant[WindowsAPIConstant["NIF_INFO"] = 16] = "NIF_INFO";
    WindowsAPIConstant[WindowsAPIConstant["NIF_GUID"] = 32] = "NIF_GUID";
    WindowsAPIConstant[WindowsAPIConstant["NIF_REALTIME"] = 64] = "NIF_REALTIME";
    WindowsAPIConstant[WindowsAPIConstant["NIF_SHOWTIP"] = 128] = "NIF_SHOWTIP";
    // NotifyIcon Infotip flags
    WindowsAPIConstant[WindowsAPIConstant["NIIF_NONE"] = 0] = "NIIF_NONE";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_INFO"] = 1] = "NIIF_INFO";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_WARNING"] = 2] = "NIIF_WARNING";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_ERROR"] = 3] = "NIIF_ERROR";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_USER"] = 4] = "NIIF_USER";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_ICON_MASK"] = 15] = "NIIF_ICON_MASK";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_NOSOUND"] = 16] = "NIIF_NOSOUND";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_LARGE_ICON"] = 32] = "NIIF_LARGE_ICON";
    WindowsAPIConstant[WindowsAPIConstant["NIIF_RESPECT_QUIET_TIME"] = 128] = "NIIF_RESPECT_QUIET_TIME";
    // set NOTIFYICONDATA.uVersion with 0, 3 or 4
    WindowsAPIConstant[WindowsAPIConstant["NOTIFYICON_VERSION"] = 3] = "NOTIFYICON_VERSION";
    WindowsAPIConstant[WindowsAPIConstant["NOTIFYICON_VERSION_4"] = 4] = "NOTIFYICON_VERSION_4";
    // NotifyIcon Messages
    WindowsAPIConstant[WindowsAPIConstant["NIM_ADD"] = 0] = "NIM_ADD";
    WindowsAPIConstant[WindowsAPIConstant["NIM_MODIFY"] = 1] = "NIM_MODIFY";
    WindowsAPIConstant[WindowsAPIConstant["NIM_DELETE"] = 2] = "NIM_DELETE";
    WindowsAPIConstant[WindowsAPIConstant["NIM_SETFOCUS"] = 3] = "NIM_SETFOCUS";
    WindowsAPIConstant[WindowsAPIConstant["NIM_SETVERSION"] = 4] = "NIM_SETVERSION";
    // NotifyIcon Notifies
    WindowsAPIConstant[WindowsAPIConstant["NIN_SELECT"] = 1024] = "NIN_SELECT";
    WindowsAPIConstant[WindowsAPIConstant["NINF_KEY"] = 1] = "NINF_KEY";
    WindowsAPIConstant[WindowsAPIConstant["NIN_KEYSELECT"] = 1025] = "NIN_KEYSELECT";
    WindowsAPIConstant[WindowsAPIConstant["NIN_BALLOONSHOW"] = 1026] = "NIN_BALLOONSHOW";
    WindowsAPIConstant[WindowsAPIConstant["NIN_BALLOONHIDE"] = 1027] = "NIN_BALLOONHIDE";
    WindowsAPIConstant[WindowsAPIConstant["NIN_BALLOONTIMEOUT"] = 1028] = "NIN_BALLOONTIMEOUT";
    WindowsAPIConstant[WindowsAPIConstant["NIN_BALLOONUSERCLICK"] = 1029] = "NIN_BALLOONUSERCLICK";
    WindowsAPIConstant[WindowsAPIConstant["NIN_POPUPOPEN"] = 1030] = "NIN_POPUPOPEN";
    WindowsAPIConstant[WindowsAPIConstant["NIN_POPUPCLOSE"] = 1031] = "NIN_POPUPCLOSE";
})(WindowsAPIConstant || (WindowsAPIConstant = {}));
const ElectrayDefaultNotifyIconId = 0x1409;
const ElectrayWindowCallbackMessage = WindowsAPIConstant.WM_USER + ElectrayDefaultNotifyIconId;
const ElectrayDefaultTip = `Electray Tip`;
const ElectrayDefaultInfo = `Electray Information`;
const ElectrayDefaultInfoTitle = `Electray Information Title`;
var ElectrayDefaultIconHandle;
var LoadIconW;
var SendMessageW;
var Shell_NotifyIconW_32;
var Shell_NotifyIconW_64;
let ffiInitialized = false;
function ffiInitialize() {
    var user32 = new ffi.DynamicLibrary(`user32.dll`);
    var shell32 = new ffi.DynamicLibrary(`shell32.dll`);
    LoadIconW = ffi.ForeignFunction(user32.get(`LoadIconW`), ref.types.uint, [ref.types.int, ref.types.int]);
    SendMessageW = ffi.ForeignFunction(user32.get(`SendMessageW`), ref.types.uint, [ref.types.uint, ref.types.uint, ref.types.uint, ref.types.uint]);
    Shell_NotifyIconW_32 = ffi.ForeignFunction(shell32.get(`Shell_NotifyIconW`), ref.types.uint, [ref.types.uint, ref.types.uint]);
    Shell_NotifyIconW_64 = ffi.ForeignFunction(shell32.get(`Shell_NotifyIconW`), ref.types.uint, [ref.types.uint, ref.types.uint64]);
    ElectrayDefaultIconHandle = LoadIconW(0, WindowsAPIConstant.IDI_APPLICATION);
    ffiInitialized = true;
}
function Shell_NotifyIconW(dwMessage, lpData) {
    switch (process.arch) {
        case `ia32`: {
            return Shell_NotifyIconW_32(dwMessage, lpData);
        }
        case `x64`: {
            return Shell_NotifyIconW_64(dwMessage, lpData);
        }
    }
    return 0;
}
class Electray extends events.EventEmitter {
    hWndBuffer;
    is64Process;
    notifyIconData;
    constructor(options) {
        super();
        if (ffiInitialized == false) {
            ffiInitialize();
        }
        this.hWndBuffer = options.window.getNativeWindowHandle();
        this.is64Process = this.hWndBuffer.length == 8 ? true : false;
        this.notifyIconData = new NotifyIconDataW(this.is64Process);
        options.window.hookWindowMessage(ElectrayWindowCallbackMessage, (wParam, lParam) => {
            this.notifyIconCallbackMessageHandler(wParam, lParam);
        });
        this.notifyIconData.hWnd = this.hWnd;
        this.notifyIconData.uID = ElectrayDefaultNotifyIconId;
        this.notifyIconData.uFlags = WindowsAPIConstant.NIF_MESSAGE | WindowsAPIConstant.NIF_ICON;
        this.notifyIconData.uCallbackMessage = ElectrayWindowCallbackMessage;
        this.notifyIconData.hIcon = 0;
        this.notifyIconData.szTip = ElectrayDefaultTip;
        this.notifyIconData.dwState = 0;
        this.notifyIconData.dwStateMask = 0;
        this.notifyIconData.szInfo = ElectrayDefaultInfo;
        this.notifyIconData.uVersion = WindowsAPIConstant.NOTIFYICON_VERSION_4;
        this.notifyIconData.szInfoTitle = ElectrayDefaultInfoTitle;
        this.notifyIconData.dwInfoFlags = 0;
        //this.notifyIconData.guidItem;
        this.notifyIconData.hBalloonIcon = ElectrayDefaultIconHandle;
        if (options.noIcon == true) {
            this.notifyIconData.hIcon = 0;
        }
        else if (options.useWindowIcon == true) {
            this.notifyIconData.hIcon = SendMessageW(this.hWnd, WindowsAPIConstant.WM_GETICON, WindowsAPIConstant.ICON_SMALL2, 0);
        }
        else if (options.useDefaultIcon == true) {
            this.notifyIconData.hIcon = ElectrayDefaultIconHandle;
        }
        if (options.tips != undefined) {
            this.notifyIconData.szTip = options.tips;
            this.notifyIconData.uFlags |= WindowsAPIConstant.NIF_TIP;
            if (options.showTips == true) {
                this.notifyIconData.uFlags |= WindowsAPIConstant.NIF_SHOWTIP;
            }
        }
        if (options.customCallbackMessageID != undefined) {
            this.notifyIconData.uCallbackMessage = options.customCallbackMessageID;
        }
        if (options.customIconID != undefined) {
            this.notifyIconData.uID = options.customIconID;
        }
    }
    get hWnd() {
        if (this.hWndBuffer.length == 8) {
            return this.hWndBuffer.readUInt64LE();
        }
        else if (this.hWndBuffer.length == 4) {
            return this.hWndBuffer.readUInt32LE();
        }
        else {
            throw new Error(`Unknown handle format of native window, please make sure you are using Electray in windows.`);
        }
    }
    notifyIconCallbackMessageDispatcherV3(iconID, messageID) {
        this.notifyIconCallbackMessageDispatcherV4(iconID, messageID, 0, 0);
    }
    notifyIconCallbackMessageDispatcherV4(iconID, eventID, x, y) {
        if (iconID != this.notifyIconData.uID) {
            return;
        }
        switch (eventID) {
            case WindowsAPIConstant.WM_MOUSEMOVE: {
                // too much for this event
                // console.log(`Mouse move at notify icon id: ${iconID}, x: ${x}, y: ${y}`);
                this.emit(`MouseMove`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_LBUTTONDOWN: {
                this.emit(`MouseLeftButtonDown`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_LBUTTONUP: {
                this.emit(`MouseLeftButtonUp`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_LBUTTONDBLCLK: {
                this.emit(`MouseLeftButtonDoubleClick`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_RBUTTONDOWN: {
                this.emit(`MouseRightButtonDown`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_RBUTTONUP: {
                this.emit(`MouseRightButtonUp`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_RBUTTONDBLCLK: {
                this.emit(`MouseRightButtonDoubleClick`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_MBUTTONDOWN: {
                this.emit(`MouseMiddleButtonDown`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_MBUTTONUP: {
                this.emit(`MouseMiddleButtonUp`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_MBUTTONDBLCLK: {
                this.emit(`MouseMiddleButtonDoubleClick`, x, y);
                break;
            }
            case WindowsAPIConstant.WM_CONTEXTMENU: {
                this.emit(`ContextMenu`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_POPUPOPEN: {
                this.emit(`PopupOpen`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_POPUPCLOSE: {
                this.emit(`PopupClose`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_SELECT: {
                this.emit(`Select`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_KEYSELECT: {
                this.emit(`KeySelect`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_BALLOONSHOW: {
                this.emit(`BalloonShow`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_BALLOONHIDE: {
                this.emit(`BalloonHide`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_BALLOONTIMEOUT: {
                this.emit(`BalloonTimeout`, x, y);
                break;
            }
            case WindowsAPIConstant.NIN_BALLOONUSERCLICK: {
                this.emit(`BalloonUserClick`, x, y);
                break;
            }
            default: {
                console.log(`Unhandled notify icon id: ${iconID}, event: ${eventID}, x: ${x}, y: ${y}`);
                break;
            }
        }
    }
    notifyIconCallbackMessageHandler(wParam, lParam) {
        switch (this.notifyIconData.uVersion) {
            case 0:
            case WindowsAPIConstant.NOTIFYICON_VERSION: {
                let iconID = wParam.readUInt32LE();
                let messageID = lParam.readUInt32LE();
                this.notifyIconCallbackMessageDispatcherV3(iconID, messageID);
                break;
            }
            case WindowsAPIConstant.NOTIFYICON_VERSION_4: {
                let x = wParam.readUInt16LE(0);
                let y = wParam.readUInt16LE(2);
                let eventID = lParam.readUInt16LE(0);
                let iconID = lParam.readUInt16LE(2);
                this.notifyIconCallbackMessageDispatcherV4(iconID, eventID, x, y);
                break;
            }
            default: {
                console.log(`Unknown notify icon data version: ${this.notifyIconData.uVersion}`);
                break;
            }
        }
    }
    addIcon() {
        let result = Shell_NotifyIconW(WindowsAPIConstant.NIM_ADD, this.notifyIconData.pointer);
        if (result == WindowsAPIConstant.TRUE) {
            this.notifyIconData.uVersion = WindowsAPIConstant.NOTIFYICON_VERSION_4;
            result = Shell_NotifyIconW(WindowsAPIConstant.NIM_SETVERSION, this.notifyIconData.pointer);
            if (result == WindowsAPIConstant.FALSE) {
                this.notifyIconData.uVersion = WindowsAPIConstant.NOTIFYICON_VERSION;
            }
            return true;
        }
        else {
            return false;
        }
    }
    updateIcon(options) {
        if (options.noIcon == true) {
            this.notifyIconData.hIcon = 0;
        }
        else if (options.useWindowIcon == true) {
            this.notifyIconData.hIcon = SendMessageW(this.hWnd, WindowsAPIConstant.WM_GETICON, WindowsAPIConstant.ICON_SMALL2, 0);
        }
        else if (options.useDefaultIcon == true) {
            this.notifyIconData.hIcon = ElectrayDefaultIconHandle;
        }
        if (options.tips != undefined) {
            this.notifyIconData.szTip = options.tips;
            this.notifyIconData.uFlags |= WindowsAPIConstant.NIF_TIP;
            if (options.showTips == true) {
                this.notifyIconData.uFlags |= WindowsAPIConstant.NIF_SHOWTIP;
            }
        }
        let result = Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.notifyIconData.pointer);
        return result == WindowsAPIConstant.TRUE;
    }
    removeIcon() {
        let result = Shell_NotifyIconW(WindowsAPIConstant.NIM_DELETE, this.notifyIconData.pointer);
        if (result == WindowsAPIConstant.TRUE) {
            return true;
        }
        else {
            return false;
        }
    }
    showBalloon(options) {
        this.notifyIconData.uFlags |= WindowsAPIConstant.NIF_INFO;
        switch (options.icon) {
            case `info`: {
                this.notifyIconData.dwInfoFlags = WindowsAPIConstant.NIIF_INFO;
                break;
            }
            case `warning`: {
                this.notifyIconData.dwInfoFlags = WindowsAPIConstant.NIIF_WARNING;
                break;
            }
            case `error`: {
                this.notifyIconData.dwInfoFlags = WindowsAPIConstant.NIIF_ERROR;
                break;
            }
            case `user`: {
                this.notifyIconData.dwInfoFlags = WindowsAPIConstant.NIIF_USER;
                break;
            }
            default: {
                this.notifyIconData.dwInfoFlags = WindowsAPIConstant.NIIF_NONE;
                break;
            }
        }
        if (options.noSound == true) {
            this.notifyIconData.dwInfoFlags |= WindowsAPIConstant.NIIF_NOSOUND;
        }
        if (options.largeIcon == true) {
            this.notifyIconData.dwInfoFlags |= WindowsAPIConstant.NIIF_LARGE_ICON;
        }
        if (options.respectQuietTime == true) {
            this.notifyIconData.dwInfoFlags |= WindowsAPIConstant.NIIF_RESPECT_QUIET_TIME;
        }
        if (options.timeoutMilliSeconds != undefined && options.timeoutMilliSeconds >= 0) {
            this.notifyIconData.uTimeout = options.timeoutMilliSeconds;
        }
        this.notifyIconData.szInfoTitle = options.title;
        this.notifyIconData.szInfo = options.information;
        let result = Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.notifyIconData.pointer);
        this.notifyIconData.uFlags &= ~(WindowsAPIConstant.NIF_INFO);
        this.notifyIconData.dwInfoFlags = 0;
        if (result == WindowsAPIConstant.TRUE) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.Electray = Electray;
/**
 * This class is for automatic binary editing of NotifyIconDataW struct from <shellapi.h>
 * need more information about this struct please view the page below:
 * https://learn.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataw
 */
class NotifyIconDataW {
    is64Process;
    notifyIconDataBuffer;
    constructor(is64Process) {
        this.is64Process = is64Process;
        let notifyIconDataSize = this.is64Process ? 976 : 956;
        this.notifyIconDataBuffer = Buffer.alloc(notifyIconDataSize + 100);
        this.cbSize = notifyIconDataSize;
    }
    get pointer() {
        return ref.address(this.notifyIconDataBuffer);
    }
    get cbSize() {
        return this.notifyIconDataBuffer.readUInt32LE(0);
    }
    set cbSize(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, 0);
    }
    get hWnd() {
        if (this.is64Process) {
            return this.notifyIconDataBuffer.readUInt64LE(8);
        }
        else {
            return this.notifyIconDataBuffer.readUInt32LE(4);
        }
    }
    set hWnd(value) {
        if (this.is64Process) {
            this.notifyIconDataBuffer.writeUInt64LE(value, 8);
        }
        else {
            this.notifyIconDataBuffer.writeUInt32LE(value, 4);
        }
    }
    get uID() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 16 : 8);
    }
    set uID(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 16 : 8);
    }
    get uFlags() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 20 : 12);
    }
    set uFlags(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 20 : 12);
    }
    get uCallbackMessage() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 24 : 16);
    }
    set uCallbackMessage(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 24 : 16);
    }
    get hIcon() {
        if (this.is64Process) {
            return this.notifyIconDataBuffer.readUInt64LE(32);
        }
        else {
            return this.notifyIconDataBuffer.readUInt32LE(20);
        }
    }
    set hIcon(value) {
        if (this.is64Process) {
            this.notifyIconDataBuffer.writeUInt64LE(value, 32);
        }
        else {
            this.notifyIconDataBuffer.writeUInt32LE(value, 20);
        }
    }
    get szTip() {
        let start = this.is64Process ? 40 : 24;
        return this.notifyIconDataBuffer.toString(`utf16le`, start, start + 256);
    }
    set szTip(value) {
        let buffer = Buffer.from(value, `utf16le`);
        let buffer2 = Buffer.alloc(256, 0);
        Buffer.concat([
            buffer,
            buffer2
        ], 256).copy(this.notifyIconDataBuffer, this.is64Process ? 40 : 24, 0, 256);
    }
    get dwState() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 296 : 280);
    }
    set dwState(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 296 : 280);
    }
    get dwStateMask() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 300 : 284);
    }
    set dwStateMask(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 300 : 284);
    }
    get szInfo() {
        let start = this.is64Process ? 304 : 288;
        return this.notifyIconDataBuffer.toString(`utf16le`, start, start + 512);
    }
    set szInfo(value) {
        let buffer = Buffer.from(value, `utf16le`);
        let buffer2 = Buffer.alloc(512, 0);
        Buffer.concat([
            buffer,
            buffer2
        ], 512).copy(this.notifyIconDataBuffer, this.is64Process ? 304 : 288, 0, 512);
    }
    get uVersion() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 816 : 800);
    }
    set uVersion(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 816 : 800);
    }
    get uTimeout() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 816 : 800);
    }
    set uTimeout(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 816 : 800);
    }
    get szInfoTitle() {
        let start = this.is64Process ? 820 : 804;
        return this.notifyIconDataBuffer.toString(`utf16le`, start, start + 128);
    }
    set szInfoTitle(value) {
        let buffer = Buffer.from(value, `utf16le`);
        let buffer2 = Buffer.alloc(128, 0);
        Buffer.concat([
            buffer,
            buffer2
        ], 128).copy(this.notifyIconDataBuffer, this.is64Process ? 820 : 804, 0, 128);
    }
    get dwInfoFlags() {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 948 : 932);
    }
    set dwInfoFlags(value) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 948 : 932);
    }
    get guidItem() {
        let start = this.is64Process ? 952 : 936;
        return this.notifyIconDataBuffer.slice(start, start + 16);
    }
    set guidItem(value) {
        let start = this.is64Process ? 952 : 936;
        value.copy(this.notifyIconDataBuffer, start, 0, 16);
    }
    get hBalloonIcon() {
        if (this.is64Process) {
            return this.notifyIconDataBuffer.readUInt64LE(968);
        }
        else {
            return this.notifyIconDataBuffer.readUInt32LE(952);
        }
    }
    set hBalloonIcon(value) {
        if (this.is64Process) {
            this.notifyIconDataBuffer.writeUInt64LE(value, 968);
        }
        else {
            this.notifyIconDataBuffer.writeUInt32LE(value, 952);
        }
    }
}
//# sourceMappingURL=electray.js.map