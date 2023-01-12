import * as events from 'events';
import * as fs from 'fs';

import * as electron from 'electron';

import * as native from './native';
import { WindowsAPIConstant } from './constants';
import { Handle, NotifyIconDataW } from './notify-icon-data-w';

const ElectrayDefaultNotifyIconId: number = 0x1409;
const ElectrayWindowCallbackMessage: number = WindowsAPIConstant.WM_USER + ElectrayDefaultNotifyIconId;

const ElectrayIconHandleNone: Handle = native.getIconHandleNone();
const ElectrayIconHandleDefault: Handle = native.getIconHandleDefault();

export declare type ElectrayIcon = `none` | `default` | `window` | Buffer;

export interface ElectrayConstructionOptions {
    window: electron.BrowserWindow;
    customIconID?: number;
    customCallbackMessageID?: number;
    icon?: ElectrayIcon;
    showIcon?: boolean;
    tips?: string;
    showTips?: boolean;
}

export interface ElectrayBalloonOptions {
    title: string;
    information: string;
    icon?: `none` | `info` | `warning` | `error` | Buffer;
    noSound?: boolean;
    largeIcon?: boolean;
    respectQuietTime?: boolean;
    timeoutMilliSeconds?: number;
}

export class Electray extends events.EventEmitter {
    private window: electron.BrowserWindow;
    private nid: NotifyIconDataW;
    private innerIcon: ElectrayIcon = 'none';
    private innerShowIcon: boolean = false;
    private innerShowTips: boolean = false;

    constructor(options: ElectrayConstructionOptions) {
        super();

        this.window = options.window;

        this.nid = new NotifyIconDataW();
        this.nid.hWnd = this.window.getNativeWindowHandle();
        this.nid.uID = options.customIconID || ElectrayDefaultNotifyIconId;
        this.nid.uFlags = WindowsAPIConstant.NIF_MESSAGE | WindowsAPIConstant.NIF_ICON;
        this.nid.uCallbackMessage = options.customCallbackMessageID || ElectrayWindowCallbackMessage;
        //this.nid.hIcon = getIconHandle(options.icon, this.nid.hWnd);
        //this.nid.szTip = ElectrayDefaultTip;
        this.nid.dwState = 0;
        this.nid.dwStateMask = 0;
        //this.nid.szInfo = ElectrayDefaultInfo;
        this.nid.uVersion = WindowsAPIConstant.NOTIFYICON_VERSION_4;
        //this.nid.szInfoTitle = ElectrayDefaultInfoTitle;
        this.nid.dwInfoFlags = 0;
        //this.notifyIconData.guidItem;
        //this.nid.hBalloonIcon = ElectrayDefaultIconHandle;

        this.window.hookWindowMessage(this.nid.uCallbackMessage, (wParam: any, lParam: any) => {
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

    public get showTips(): boolean {
        return this.innerShowTips;
    }
    public set showTips(value: boolean) {
        if (value == true) {
            if (this.innerShowTips == false) {
                this.nid.uFlags |= WindowsAPIConstant.NIF_SHOWTIP | WindowsAPIConstant.NIF_TIP;
            }
        }
        else {
            if (this.innerShowTips == true) {
                this.nid.uFlags &= ~(WindowsAPIConstant.NIF_SHOWTIP | WindowsAPIConstant.NIF_TIP);
            }
        }

        if (value != this.innerShowTips) {
            if (this.innerShowIcon == true) {
                Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
            }
        }

        this.innerShowTips = value;
    }

    public get tips(): string {
        return this.nid.szTip;
    }
    public set tips(value: string) {
        this.nid.szTip = value;
        if (this.innerShowIcon == true) {
            Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
        }
    }

    public get showIcon(): boolean {
        return this.innerShowIcon;
    }
    public set showIcon(value: boolean) {
        if (value == true) {
            if (this.innerShowIcon == false) {
                Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_ADD, this.nid.getBuffer());
                let setVersionResult: boolean = Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_SETVERSION, this.nid.getBuffer());
                if (setVersionResult == false) {
                    this.nid.uVersion = WindowsAPIConstant.NOTIFYICON_VERSION;
                }
            }
        }
        else {
            if (this.innerShowIcon == true) {
                Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_DELETE, this.nid.getBuffer());
            }
        }

        this.innerShowIcon = value;
    }

    public get icon(): ElectrayIcon {
        return this.innerIcon;
    }
    public set icon(value: ElectrayIcon) {
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
                if (typeof(value) == 'string') {
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
            Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());
        }
    }

    public showBalloon(options: ElectrayBalloonOptions): boolean {
        this.nid.uFlags |= WindowsAPIConstant.NIF_INFO;

        switch (options.icon) {
            case 'none': {
                this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_NONE;
                break;
            }
            case 'info': {
                this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_INFO;
                break;
            }
            case 'warning': {
                this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_WARNING;
                break;
            }
            case 'error': {
                this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_ERROR;
                break;
            }
            default: {
                if (typeof(options.icon) == 'string') {
                    if (fs.existsSync(options.icon) == true) {
                        let iconHandle: Handle = native.getIconHandleByPath(options.icon);
                        this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_USER;
                        this.nid.hBalloonIcon = iconHandle;
                        break;
                    }
                }
                else if (options.icon instanceof Buffer) {
                    let iconHandle: Handle = native.getIconHandleByBuffer(options.icon);
                    this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_USER;
                    this.nid.hBalloonIcon = iconHandle;
                    break;
                }

                this.nid.dwInfoFlags = WindowsAPIConstant.NIIF_NONE;
            }
        }
        
        if (options.noSound == true) {
            this.nid.dwInfoFlags |= WindowsAPIConstant.NIIF_NOSOUND;
        }

        if (options.largeIcon == true) {
            this.nid.dwInfoFlags |= WindowsAPIConstant.NIIF_LARGE_ICON;
        }

        if (options.respectQuietTime == true) {
            this.nid.dwInfoFlags |= WindowsAPIConstant.NIIF_RESPECT_QUIET_TIME;
        }

        let version: number = this.nid.uVersion;
        if (options.timeoutMilliSeconds != undefined && options.timeoutMilliSeconds >= 0) {
            this.nid.uTimeout = options.timeoutMilliSeconds;
        }

        this.nid.szInfoTitle = options.title;
        this.nid.szInfo = options.information;

        let result = Shell32.Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.nid.getBuffer());

        this.nid.uFlags &= ~(WindowsAPIConstant.NIF_INFO);
        this.nid.dwInfoFlags = 0;
        this.nid.uVersion = version;

        return result;
    }

    private iconMessageHandlerV3(iconID: number, messageID: number) {
        this.iconMessageHandlerV4(iconID, messageID, 0, 0);
    }

    private iconMessageHandlerV4(iconID: number, eventID: number, x: number, y: number) {
        if (iconID != this.nid.uID) {
            return;
        }
        switch (eventID) {
            case WindowsAPIConstant.WM_MOUSEMOVE: {
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
                this.emit(`PopupClose`);
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

    private windowMessageHandler(wParam: any, lParam: any) {
        switch (this.nid.uVersion) {
            case 0:
            case WindowsAPIConstant.NOTIFYICON_VERSION: {
                let iconID: number = wParam.readUInt32LE();
                let messageID: number = lParam.readUInt32LE();

                this.iconMessageHandlerV3(iconID, messageID);
                break;
            }
            case WindowsAPIConstant.NOTIFYICON_VERSION_4: {
                let x: number = wParam.readUInt16LE(0);
                let y: number = wParam.readUInt16LE(2);
                let eventID: number = lParam.readUInt16LE(0);
                let iconID: number = lParam.readUInt16LE(2);

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
