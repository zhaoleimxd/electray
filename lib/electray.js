"use strict";
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
const fs = __importStar(require("fs"));
const native = __importStar(require("./native"));
const constants_1 = require("./constants");
const notify_icon_data_w_1 = require("./notify-icon-data-w");
const ElectrayDefaultNotifyIconId = 0x1409;
const ElectrayWindowCallbackMessage = constants_1.WindowsAPIConstant.WM_USER + ElectrayDefaultNotifyIconId;
const ElectrayIconHandleNone = native.getIconHandleNone();
const ElectrayIconHandleDefault = native.getIconHandleDefault();
class Electray extends events.EventEmitter {
    constructor(options) {
        super();
        this.innerIcon = 'none';
        this.innerShowIcon = false;
        this.innerShowTips = false;
        this.window = options.window;
        this.nid = new notify_icon_data_w_1.NotifyIconDataW();
        this.nid.hWnd = this.window.getNativeWindowHandle();
        this.nid.uID = options.customIconID || ElectrayDefaultNotifyIconId;
        this.nid.uFlags = constants_1.WindowsAPIConstant.NIF_MESSAGE | constants_1.WindowsAPIConstant.NIF_ICON;
        this.nid.uCallbackMessage = options.customCallbackMessageID || ElectrayWindowCallbackMessage;
        //this.nid.hIcon = getIconHandle(options.icon, this.nid.hWnd);
        //this.nid.szTip = ElectrayDefaultTip;
        this.nid.dwState = 0;
        this.nid.dwStateMask = 0;
        //this.nid.szInfo = ElectrayDefaultInfo;
        this.nid.uVersion = constants_1.WindowsAPIConstant.NOTIFYICON_VERSION_4;
        //this.nid.szInfoTitle = ElectrayDefaultInfoTitle;
        this.nid.dwInfoFlags = 0;
        //this.notifyIconData.guidItem;
        //this.nid.hBalloonIcon = ElectrayDefaultIconHandle;
        this.window.hookWindowMessage(this.nid.uCallbackMessage, (wParam, lParam) => {
            this.windowMessageHandler(wParam, lParam);
        });
        if (options.tips != undefined) {
            this.tips = options.tips;
        }
        if (options.showTips != undefined) {
            this.showTips = options.showTips;
        }
        if (options.icon != undefined) {
            this.icon = options.icon;
        }
        if (options.showIcon != undefined) {
            this.showIcon = options.showIcon;
        }
    }
    get showTips() {
        return this.innerShowTips;
    }
    set showTips(value) {
        if (value == true) {
            if (this.innerShowTips == false) {
                this.nid.uFlags |= constants_1.WindowsAPIConstant.NIF_SHOWTIP | constants_1.WindowsAPIConstant.NIF_TIP;
            }
        }
        else {
            if (this.innerShowTips == true) {
                this.nid.uFlags &= ~(constants_1.WindowsAPIConstant.NIF_SHOWTIP | constants_1.WindowsAPIConstant.NIF_TIP);
            }
        }
        if (value != this.innerShowTips) {
            if (this.innerShowIcon == true) {
                Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
            }
        }
        this.innerShowTips = value;
    }
    get tips() {
        return this.nid.szTip;
    }
    set tips(value) {
        this.nid.szTip = value;
        if (this.innerShowIcon == true) {
            Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
        }
    }
    get showIcon() {
        return this.innerShowIcon;
    }
    set showIcon(value) {
        if (value == true) {
            if (this.innerShowIcon == false) {
                Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_ADD, this.nid.getBuffer());
                let setVersionResult = Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_SETVERSION, this.nid.getBuffer());
                if (setVersionResult == false) {
                    this.nid.uVersion = constants_1.WindowsAPIConstant.NOTIFYICON_VERSION;
                }
            }
        }
        else {
            if (this.innerShowIcon == true) {
                Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_DELETE, this.nid.getBuffer());
            }
        }
        this.innerShowIcon = value;
    }
    get icon() {
        return this.innerIcon;
    }
    set icon(value) {
        switch (value) {
            case 'none': {
                this.nid.hIcon = ElectrayIconHandleNone;
                this.innerIcon = value;
                break;
            }
            case 'default': {
                this.nid.hIcon = ElectrayIconHandleDefault;
                this.innerIcon = value;
                break;
            }
            case 'window': {
                this.nid.hIcon = native.getIconHandleByWindowHandle(this.nid.hWnd);
                this.innerIcon = value;
                break;
            }
            default: {
                if (typeof (value) == 'string') {
                    if (fs.existsSync(value) == true) {
                        this.nid.hIcon = native.getIconHandleByPath(value);
                        this.innerIcon = value;
                        break;
                    }
                    else {
                        this.nid.hIcon = ElectrayIconHandleNone;
                        this.innerIcon = 'none';
                        break;
                    }
                }
                else if (value instanceof Buffer) {
                    this.nid.hIcon = native.getIconHandleByBuffer(value);
                    this.innerIcon = value;
                    break;
                }
                else {
                    this.nid.hIcon = ElectrayIconHandleNone;
                    this.innerIcon = 'none';
                    break;
                }
            }
        }
        if (this.innerShowIcon == true) {
            Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
        }
    }
    showBalloon(options) {
        this.nid.uFlags |= constants_1.WindowsAPIConstant.NIF_INFO;
        switch (options.icon) {
            case 'none': {
                this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_NONE;
                break;
            }
            case 'info': {
                this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_INFO;
                break;
            }
            case 'warning': {
                this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_WARNING;
                break;
            }
            case 'error': {
                this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_ERROR;
                break;
            }
            default: {
                if (typeof (options.icon) == 'string') {
                    if (fs.existsSync(options.icon) == true) {
                        let iconHandle = native.getIconHandleByPath(options.icon);
                        this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_USER;
                        this.nid.hBalloonIcon = iconHandle;
                        break;
                    }
                }
                else if (options.icon instanceof Buffer) {
                    let iconHandle = native.getIconHandleByBuffer(options.icon);
                    this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_USER;
                    this.nid.hBalloonIcon = iconHandle;
                    break;
                }
                this.nid.dwInfoFlags = constants_1.WindowsAPIConstant.NIIF_NONE;
            }
        }
        if (options.noSound == true) {
            this.nid.dwInfoFlags |= constants_1.WindowsAPIConstant.NIIF_NOSOUND;
        }
        if (options.largeIcon == true) {
            this.nid.dwInfoFlags |= constants_1.WindowsAPIConstant.NIIF_LARGE_ICON;
        }
        if (options.respectQuietTime == true) {
            this.nid.dwInfoFlags |= constants_1.WindowsAPIConstant.NIIF_RESPECT_QUIET_TIME;
        }
        let version = this.nid.uVersion;
        if (options.timeoutMilliSeconds != undefined && options.timeoutMilliSeconds >= 0) {
            this.nid.uTimeout = options.timeoutMilliSeconds;
        }
        this.nid.szInfoTitle = options.title;
        this.nid.szInfo = options.information;
        let result = Shell32.Shell_NotifyIconW(constants_1.WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
        this.nid.uFlags &= ~(constants_1.WindowsAPIConstant.NIF_INFO);
        this.nid.dwInfoFlags = 0;
        this.nid.uVersion = version;
        return result;
    }
    iconMessageHandlerV3(iconID, messageID) {
        this.iconMessageHandlerV4(iconID, messageID, 0, 0);
    }
    iconMessageHandlerV4(iconID, eventID, x, y) {
        if (iconID != this.nid.uID) {
            return;
        }
        switch (eventID) {
            case constants_1.WindowsAPIConstant.WM_MOUSEMOVE: {
                this.emit(`MouseMove`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_LBUTTONDOWN: {
                this.emit(`MouseLeftButtonDown`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_LBUTTONUP: {
                this.emit(`MouseLeftButtonUp`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_LBUTTONDBLCLK: {
                this.emit(`MouseLeftButtonDoubleClick`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_RBUTTONDOWN: {
                this.emit(`MouseRightButtonDown`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_RBUTTONUP: {
                this.emit(`MouseRightButtonUp`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_RBUTTONDBLCLK: {
                this.emit(`MouseRightButtonDoubleClick`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_MBUTTONDOWN: {
                this.emit(`MouseMiddleButtonDown`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_MBUTTONUP: {
                this.emit(`MouseMiddleButtonUp`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_MBUTTONDBLCLK: {
                this.emit(`MouseMiddleButtonDoubleClick`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.WM_CONTEXTMENU: {
                this.emit(`ContextMenu`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_POPUPOPEN: {
                this.emit(`PopupOpen`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_POPUPCLOSE: {
                this.emit(`PopupClose`);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_SELECT: {
                this.emit(`Select`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_KEYSELECT: {
                this.emit(`KeySelect`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_BALLOONSHOW: {
                this.emit(`BalloonShow`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_BALLOONHIDE: {
                this.emit(`BalloonHide`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_BALLOONTIMEOUT: {
                this.emit(`BalloonTimeout`, x, y);
                break;
            }
            case constants_1.WindowsAPIConstant.NIN_BALLOONUSERCLICK: {
                this.emit(`BalloonUserClick`, x, y);
                break;
            }
            default: {
                console.log(`Unhandled notify icon id: ${iconID}, event: ${eventID}, x: ${x}, y: ${y}`);
                break;
            }
        }
    }
    windowMessageHandler(wParam, lParam) {
        switch (this.nid.uVersion) {
            case 0:
            case constants_1.WindowsAPIConstant.NOTIFYICON_VERSION: {
                let iconID = wParam.readUInt32LE();
                let messageID = lParam.readUInt32LE();
                this.iconMessageHandlerV3(iconID, messageID);
                break;
            }
            case constants_1.WindowsAPIConstant.NOTIFYICON_VERSION_4: {
                let x = wParam.readUInt16LE(0);
                let y = wParam.readUInt16LE(2);
                let eventID = lParam.readUInt16LE(0);
                let iconID = lParam.readUInt16LE(2);
                this.iconMessageHandlerV4(iconID, eventID, x, y);
                break;
            }
            default: {
                console.log(`Unknown notify icon data version: ${this.nid.uVersion}`);
                break;
            }
        }
    }
}
exports.Electray = Electray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlY3RyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZWxlY3RyYXkvZWxlY3RyYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMsdUNBQXlCO0FBSXpCLGlEQUFtQztBQUNuQywyQ0FBaUQ7QUFDakQsNkRBQStEO0FBRS9ELE1BQU0sMkJBQTJCLEdBQVcsTUFBTSxDQUFDO0FBQ25ELE1BQU0sNkJBQTZCLEdBQVcsOEJBQWtCLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0FBRXZHLE1BQU0sc0JBQXNCLEdBQVcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDbEUsTUFBTSx5QkFBeUIsR0FBVyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztBQXdCeEUsTUFBYSxRQUFTLFNBQVEsTUFBTSxDQUFDLFlBQVk7SUFPN0MsWUFBWSxPQUFvQztRQUM1QyxLQUFLLEVBQUUsQ0FBQztRQUxKLGNBQVMsR0FBaUIsTUFBTSxDQUFDO1FBQ2pDLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBS25DLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUU3QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksb0NBQWUsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsWUFBWSxJQUFJLDJCQUEyQixDQUFDO1FBQ25FLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLDhCQUFrQixDQUFDLFdBQVcsR0FBRyw4QkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFDL0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FB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