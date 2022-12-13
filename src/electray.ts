/**
 * Windows托盘图标操作Electron封装类
 * 作者：zhaoleimxd
 * 原理：使用Node FFI调用Windows API，封装为TypeScript类提供给Electron调用
 * NPM依赖：
 *      electron
 *      ffi-napi
 * 导出类名：Electray
 */

/**
 * 托盘图标选项
 */
export interface ElectrayOptions {
    /**
     * 使用window参数所指定的窗口当前的图标，该窗口必须设置过图标才可以
     */
    useWindowIcon?: boolean;
    /**
     * 使用Windows系统默认的应用程序图标
     */
    useDefaultIcon?: boolean;
    /**
     * 使用空白图标
     */
    noIcon?: boolean;
    /**
     * 鼠标悬浮在托盘图标上时的提示信息，必须设置此字段后才能触发PopupOpen和PopupClose事件
     */
    tips?: string;
    /**
     * 鼠标悬浮在托盘图标上时，是否显示提示信息。
     */
    showTips?: boolean;
}

export interface ElectrayConstructorOptions extends ElectrayOptions {
    /**
     * 托盘图标所关联的窗口，Electray将会子类化该窗口以接收图标相关的事件通知
     */
    window: electron.BrowserWindow;
    /**
     * 自定义消息ID，在Windows消息循环中的消息ID，在出现消息冲突时请自定义此字段，范围：1024 - 65535，越大越好。
     */
    customCallbackMessageID?: number;
    /**
     * 自定义图标ID，同一个窗口拥有多个托盘图标实例时，需用不同的图标ID以区分。
     */
    customIconID?: number;
}

export interface ElectrayBalloonConfig {
    /**
     * 气泡通知的标题
     */
    title: string;
    /**
     * 气泡通知的内容
     */
    information: string;
    /**
     * 气泡通知的图标类型
     * info: 信息图标
     * warning: 警告图标
     * error: 错误图标
     * user: 用户自定义图标，此功能未做具体实现
     */
    icon?: `info` | `warning` | `error` | `user`;
    /**
     * 弹出时不播放声音
     */
    noSound?: boolean;
    /**
     * 在图标组中尽可能使用大图标资源
     */
    largeIcon?: boolean;
    /**
     * 如果Windows7及以上系统设置了免打扰，是否不弹出
     */
    respectQuietTime?: boolean;
    /**
     * 持续时间，不同Windows版本表现不同。
     */
    timeoutMilliSeconds?: number;
}

export declare type ElectrayEventHandler = (
    /**
     * 鼠标坐标x
     */
    x: number,
    /**
     * 鼠标坐标y
     */
    y: number
) => void;

export interface Electray extends events.EventEmitter {

    /**
     * 添加图标到托盘区域
     */
    addIcon(): boolean;

    /**
     * 更新托盘图标信息
     * @param options 托盘图标相关选项
     */
    updateIcon(options: ElectrayOptions): boolean;

    /**
     * 移除托盘图标
     */
    removeIcon(): boolean;

    /**
     * 在托盘区域显示气泡通知，在Win10及以上会显示为系统通知
     * @param options 托盘图标相关选项
     */
    showBalloon(options: ElectrayBalloonConfig): boolean

    // 托盘图标所有事件
    /**
     * 鼠标移动事件，鼠标在托盘图标上悬浮移动时触发。
     * @param event 鼠标移动事件
     * @param listener 事件回调
     */
    on(event: `MouseMove`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，左键按下。
     * @param event 鼠标左键按下事件
     * @param listener 事件回调
     */
    on(event: `MouseLeftButtonDown`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，左键弹起。
     * @param event 鼠标左键弹起事件
     * @param listener 事件回调
     */
    on(event: `MouseLeftButtonUp`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，左键双击。
     * @param event 鼠标左键双击事件
     * @param listener 事件回调
     */
    on(event: `MouseLeftButtonDoubleClick`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，右键按下。
     * @param event 鼠标右键按下事件
     * @param listener 事件回调
     */
    on(event: `MouseRightButtonDown`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，右键弹起。
     * @param event 鼠标右键弹起事件
     * @param listener 事件回调
     */
    on(event: `MouseRightButtonUp`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，右键双击。
     * @param event 鼠标右键双击事件
     * @param listener 事件回调
     */
    on(event: `MouseRightButtonDoubleClick`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，中键按下。
     * @param event 鼠标中键按下事件
     * @param listener 事件回调
     */
    on(event: `MouseMiddleButtonDown`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，中键弹起。
     * @param event 鼠标中键弹起事件
     * @param listener 事件回调
     */
    on(event: `MouseMiddleButtonUp`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，中键双击。
     * @param event 鼠标中键双击事件
     * @param listener 事件回调
     */
    on(event: `MouseMiddleButtonDoubleClick`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，右键按下并弹起。
     * @param event 鼠标右键按下并弹起事件
     * @param listener 事件回调
     */
    on(event: `ContextMenu`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上，即将弹出提示时。
     * @param event 弹出提示事件
     * @param listener 事件回调
     */
    on(event: `PopupOpen`, listener: ElectrayEventHandler): this;
    /**
     * 在弹出提示事件触发后，鼠标离开托盘区域图标时。
     * @param event 鼠标离开事件
     * @param listener 事件回调
     */
    on(event: `PopupClose`, listener: ElectrayEventHandler): this;
    /**
     * 鼠标悬浮在托盘图标上时，左键按下并弹起事件。
     * @param event 鼠标左键按下并弹起事件
     * @param listener 事件回调
     */
    on(event: `Select`, listener: ElectrayEventHandler): this;
    /**
     * 使用键盘将焦点切换至托盘区域，并选中图标，按下Space或Enter键事件。
     * @param event 键盘选中事件
     * @param listener 事件回调
     */
    on(event: `KeySelect`, listener: ElectrayEventHandler): this;
    /**
     * 气泡提示弹出事件
     * @param event 气泡提示弹出事件
     * @param listener 事件回调
     */
    on(event: `BalloonShow`, listener: ElectrayEventHandler): this;
    /**
     * 气泡提示隐藏事件
     * @param event 气泡提示隐藏事件
     * @param listener 事件回调
     */
    on(event: `BalloonHide`, listener: ElectrayEventHandler): this;
    /**
     * 气泡提示超时后自动隐藏
     * @param event 气泡提示超时事件
     * @param listener 事件回调
     */
    on(event: `BalloonTimeout`, listener: ElectrayEventHandler): this;
    /**
     * 用户点击气泡提示后触发
     * @param event 气泡提示点击事件
     * @param listener 事件回调
     */
    on(event: `BalloonUserClick`, listener: ElectrayEventHandler): this;
}

import * as electron from 'electron';
import * as events from 'events';
import * as ffi from 'ffi-napi';
import * as ref from 'ref-napi';

enum WindowsAPIConstant {
    // BOOL macros of windows SDK
    FALSE = 0,
    TRUE = 1,

    // Windows Resource Identifier
    IDI_APPLICATION = 32512,

    // Icon
    ICON_BIG = 1,
    ICON_SMALL = 0,
    ICON_SMALL2 = 2,

    // Windows Messages
    WM_CONTEXTMENU = 0x007B,
    WM_GETICON = 0x007F,

    WM_MOUSEMOVE = 0x0200,
    WM_LBUTTONDOWN = 0x0201,
    WM_LBUTTONUP = 0x0202,
    WM_LBUTTONDBLCLK = 0x0203,
    WM_RBUTTONDOWN = 0x0204,
    WM_RBUTTONUP = 0x0205,
    WM_RBUTTONDBLCLK = 0x0206,
    WM_MBUTTONDOWN = 0x0207,
    WM_MBUTTONUP = 0x0208,
    WM_MBUTTONDBLCLK = 0x0209,

    WM_USER = 0x0400,

    // NotifyIcon flags
    NIF_MESSAGE = 0x00000001,
    NIF_ICON = 0x00000002,
    NIF_TIP = 0x00000004,
    NIF_STATE = 0x00000008,
    NIF_INFO = 0x00000010,
    NIF_GUID = 0x00000020,
    NIF_REALTIME = 0x00000040,
    NIF_SHOWTIP = 0x00000080,

    // NotifyIcon Infotip flags
    NIIF_NONE = 0x00000000,
    NIIF_INFO = 0x00000001,
    NIIF_WARNING = 0x00000002,
    NIIF_ERROR = 0x00000003,
    NIIF_USER = 0x00000004,
    NIIF_ICON_MASK = 0x0000000F,
    NIIF_NOSOUND = 0x00000010,
    NIIF_LARGE_ICON = 0x00000020,
    NIIF_RESPECT_QUIET_TIME = 0x00000080,

    // set NOTIFYICONDATA.uVersion with 0, 3 or 4
    NOTIFYICON_VERSION = 3,
    NOTIFYICON_VERSION_4 = 4,

    // NotifyIcon Messages
    NIM_ADD = 0x00000000,
    NIM_MODIFY = 0x00000001,
    NIM_DELETE = 0x00000002,
    NIM_SETFOCUS = 0x00000003,
    NIM_SETVERSION = 0x00000004,

    // NotifyIcon Notifies
    NIN_SELECT = WM_USER + 0,
    NINF_KEY = 0x1,
    NIN_KEYSELECT = (NIN_SELECT | NINF_KEY),
    NIN_BALLOONSHOW = (WM_USER + 2),
    NIN_BALLOONHIDE = (WM_USER + 3),
    NIN_BALLOONTIMEOUT = (WM_USER + 4),
    NIN_BALLOONUSERCLICK = (WM_USER + 5),
    NIN_POPUPOPEN = (WM_USER + 6),
    NIN_POPUPCLOSE = (WM_USER + 7)

}

const ElectrayDefaultNotifyIconId: number = 0x1409;
const ElectrayWindowCallbackMessage: number = WindowsAPIConstant.WM_USER + ElectrayDefaultNotifyIconId;
const ElectrayDefaultTip: string = `Electray Tip`;
const ElectrayDefaultInfo: string = `Electray Information`;
const ElectrayDefaultInfoTitle: string = `Electray Information Title`;
var ElectrayDefaultIconHandle: number;

var LoadIconW: ffi.ForeignFunction<number, [instance: number, id: number]>;
var SendMessageW: ffi.ForeignFunction<number, [hWnd: number, uMsg: number, wParam: number, lParam: number]>;

var Shell_NotifyIconW_32: ffi.ForeignFunction<number, [dwMessage: number, lpData: number]>;
var Shell_NotifyIconW_64: ffi.ForeignFunction<number, [dwMessage: number, lpData: number]>;

let ffiInitialized: boolean = false;
function ffiInitialize(): void {
    var user32: ffi.DynamicLibrary = new ffi.DynamicLibrary(`user32.dll`);
    var shell32: ffi.DynamicLibrary = new ffi.DynamicLibrary(`shell32.dll`);

    LoadIconW = ffi.ForeignFunction(user32.get(`LoadIconW`), ref.types.uint, [ref.types.int, ref.types.int]);
    SendMessageW = ffi.ForeignFunction(user32.get(`SendMessageW`), ref.types.uint, [ref.types.uint, ref.types.uint, ref.types.uint, ref.types.uint]);

    Shell_NotifyIconW_32 = ffi.ForeignFunction(shell32.get(`Shell_NotifyIconW`), ref.types.uint, [ref.types.uint, ref.types.uint]);
    Shell_NotifyIconW_64 = ffi.ForeignFunction(shell32.get(`Shell_NotifyIconW`), ref.types.uint, [ref.types.uint, ref.types.uint64]);

    ElectrayDefaultIconHandle = LoadIconW(0, WindowsAPIConstant.IDI_APPLICATION);

    ffiInitialized = true;
}

function Shell_NotifyIconW(dwMessage: number, lpData: number): number {
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

export class Electray extends events.EventEmitter {
    hWndBuffer: Buffer;
    is64Process: boolean;

    notifyIconData: NotifyIconDataW;

    constructor(options: ElectrayConstructorOptions) {
        super();
        if (ffiInitialized == false) {
            ffiInitialize();
        }

        this.hWndBuffer = options.window.getNativeWindowHandle();
        this.is64Process = this.hWndBuffer.length == 8 ? true : false;
        this.notifyIconData = new NotifyIconDataW(this.is64Process);

        options.window.hookWindowMessage(ElectrayWindowCallbackMessage, (wParam: Buffer, lParam: Buffer) => {
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

    public get hWnd(): number {
        if (this.hWndBuffer.length == 8) {
            return this.hWndBuffer.readUInt64LE() as number;
        }
        else if (this.hWndBuffer.length == 4) {
            return this.hWndBuffer.readUInt32LE();
        }
        else {
            throw new Error(`Unknown handle format of native window, please make sure you are using Electray in windows.`);
        }
    }

    notifyIconCallbackMessageDispatcherV3(iconID: number, messageID: number) {
        this.notifyIconCallbackMessageDispatcherV4(iconID, messageID, 0, 0);
    }

    notifyIconCallbackMessageDispatcherV4(iconID: number, eventID: number, x: number, y: number) {
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

    notifyIconCallbackMessageHandler(wParam: Buffer, lParam: Buffer) {
        switch (this.notifyIconData.uVersion) {
            case 0:
            case WindowsAPIConstant.NOTIFYICON_VERSION: {
                let iconID: number = wParam.readUInt32LE();
                let messageID: number = lParam.readUInt32LE();

                this.notifyIconCallbackMessageDispatcherV3(iconID, messageID);
                break;
            }
            case WindowsAPIConstant.NOTIFYICON_VERSION_4: {
                let x: number = wParam.readUInt16LE(0);
                let y: number = wParam.readUInt16LE(2);
                let eventID: number = lParam.readUInt16LE(0);
                let iconID: number = lParam.readUInt16LE(2);

                this.notifyIconCallbackMessageDispatcherV4(iconID, eventID, x, y);
                break;
            }
            default: {
                console.log(`Unknown notify icon data version: ${this.notifyIconData.uVersion}`);
                break;
            }
        }
    }

    public addIcon(): boolean {
        let result: number = Shell_NotifyIconW(WindowsAPIConstant.NIM_ADD, this.notifyIconData.pointer);
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

    public updateIcon(options: ElectrayOptions): boolean {
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

        let result: number = Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.notifyIconData.pointer);
        return result == WindowsAPIConstant.TRUE;
    }

    public removeIcon(): boolean {
        let result: number = Shell_NotifyIconW(WindowsAPIConstant.NIM_DELETE, this.notifyIconData.pointer);
        if (result == WindowsAPIConstant.TRUE) {
            return true;
        }
        else {
            return false;
        }
    }

    public showBalloon(options: ElectrayBalloonConfig): boolean {
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

        let result: number = Shell_NotifyIconW(WindowsAPIConstant.NIM_MODIFY, this.notifyIconData.pointer);

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

/**
 * This class is for automatic binary editing of NotifyIconDataW struct from <shellapi.h>
 * need more information about this struct please view the page below:
 * https://learn.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataw
 */
class NotifyIconDataW {
    private is64Process: boolean;
    private notifyIconDataBuffer: Buffer;

    constructor(is64Process: boolean) {
        this.is64Process = is64Process;
        let notifyIconDataSize: number = this.is64Process ? 976 : 956;
        this.notifyIconDataBuffer = Buffer.alloc(notifyIconDataSize + 100);
        this.cbSize = notifyIconDataSize;
    }

    public get pointer(): number {
        return ref.address(this.notifyIconDataBuffer);
    }

    public get cbSize(): number {
        return this.notifyIconDataBuffer.readUInt32LE(0);
    }
    public set cbSize(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, 0);
    }

    public get hWnd(): number {
        if (this.is64Process) {
            return this.notifyIconDataBuffer.readUInt64LE(8) as number;
        }
        else {
            return this.notifyIconDataBuffer.readUInt32LE(4);
        }
    }
    public set hWnd(value: number) {
        if (this.is64Process) {
            this.notifyIconDataBuffer.writeUInt64LE(value, 8);
        }
        else {
            this.notifyIconDataBuffer.writeUInt32LE(value, 4);
        }
    }

    public get uID(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 16 : 8);
    }
    public set uID(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 16 : 8);
    }

    public get uFlags(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 20 : 12);
    }
    public set uFlags(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 20 : 12);
    }

    public get uCallbackMessage(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 24 : 16);
    }
    public set uCallbackMessage(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 24 : 16);
    }

    public get hIcon(): number {
        if (this.is64Process) {
            return this.notifyIconDataBuffer.readUInt64LE(32) as number;
        }
        else {
            return this.notifyIconDataBuffer.readUInt32LE(20);
        }
    }
    public set hIcon(value: number) {
        if (this.is64Process) {
            this.notifyIconDataBuffer.writeUInt64LE(value, 32);
        }
        else {
            this.notifyIconDataBuffer.writeUInt32LE(value, 20);
        }
    }

    public get szTip(): string {
        let start: number = this.is64Process ? 40 : 24;
        return this.notifyIconDataBuffer.toString(`utf16le`, start, start + 256);
    }
    public set szTip(value: string) {
        let buffer: Buffer = Buffer.from(value, `utf16le`);
        let buffer2: Buffer = Buffer.alloc(256, 0);
        Buffer.concat([
            buffer,
            buffer2
        ], 256).copy(this.notifyIconDataBuffer, this.is64Process ? 40 : 24, 0, 256);
    }

    public get dwState(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 296 : 280);
    }
    public set dwState(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 296 : 280);
    }

    public get dwStateMask(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 300 : 284);
    }
    public set dwStateMask(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 300 : 284);
    }

    public get szInfo(): string {
        let start: number = this.is64Process ? 304 : 288;
        return this.notifyIconDataBuffer.toString(`utf16le`, start, start + 512);
    }
    public set szInfo(value: string) {
        let buffer: Buffer = Buffer.from(value, `utf16le`);
        let buffer2: Buffer = Buffer.alloc(512, 0);
        Buffer.concat([
            buffer,
            buffer2
        ], 512).copy(this.notifyIconDataBuffer, this.is64Process ? 304 : 288, 0, 512);
    }

    public get uVersion(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 816 : 800);
    }
    public set uVersion(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 816 : 800);
    }

    public get uTimeout(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 816 : 800);
    }
    public set uTimeout(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 816 : 800);
    }

    public get szInfoTitle(): string {
        let start: number = this.is64Process ? 820 : 804;
        return this.notifyIconDataBuffer.toString(`utf16le`, start, start + 128);
    }
    public set szInfoTitle(value: string) {
        let buffer: Buffer = Buffer.from(value, `utf16le`);
        let buffer2: Buffer = Buffer.alloc(128, 0);
        Buffer.concat([
            buffer,
            buffer2
        ], 128).copy(this.notifyIconDataBuffer, this.is64Process ? 820 : 804, 0, 128);
    }

    public get dwInfoFlags(): number {
        return this.notifyIconDataBuffer.readUInt32LE(this.is64Process ? 948 : 932);
    }
    public set dwInfoFlags(value: number) {
        this.notifyIconDataBuffer.writeUInt32LE(value, this.is64Process ? 948 : 932);
    }

    public get guidItem(): Buffer {
        let start: number = this.is64Process ? 952 : 936;
        return this.notifyIconDataBuffer.slice(start, start + 16);
    }
    public set guidItem(value: Buffer) {
        let start: number = this.is64Process ? 952 : 936;
        value.copy(this.notifyIconDataBuffer, start, 0, 16);
    }

    public get hBalloonIcon(): number {
        if (this.is64Process) {
            return this.notifyIconDataBuffer.readUInt64LE(968) as number;
        }
        else {
            return this.notifyIconDataBuffer.readUInt32LE(952);
        }
    }
    public set hBalloonIcon(value: number) {
        if (this.is64Process) {
            this.notifyIconDataBuffer.writeUInt64LE(value, 968);
        }
        else {
            this.notifyIconDataBuffer.writeUInt32LE(value, 952);
        }
    }
}
