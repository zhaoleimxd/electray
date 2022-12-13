/**
 * Windows托盘图标操作Electron封装类
 * 作者：zhaoleimxd
 * 原理：使用Node FFI调用Windows API，封装为TypeScript类提供给Electron调用
 * NPM依赖：
 *      electron
 *      ffi-napi
 * 导出类名：Electray
 */
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="ref-napi" />
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
y: number) => void;
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
    showBalloon(options: ElectrayBalloonConfig): boolean;
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
export declare class Electray extends events.EventEmitter {
    hWndBuffer: Buffer;
    is64Process: boolean;
    notifyIconData: NotifyIconDataW;
    constructor(options: ElectrayConstructorOptions);
    get hWnd(): number;
    notifyIconCallbackMessageDispatcherV3(iconID: number, messageID: number): void;
    notifyIconCallbackMessageDispatcherV4(iconID: number, eventID: number, x: number, y: number): void;
    notifyIconCallbackMessageHandler(wParam: Buffer, lParam: Buffer): void;
}
/**
 * This class is for automatic binary editing of NotifyIconDataW struct from <shellapi.h>
 * need more information about this struct please view the page below:
 * https://learn.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataw
 */
declare class NotifyIconDataW {
    private is64Process;
    private notifyIconDataBuffer;
    constructor(is64Process: boolean);
    get pointer(): number;
    get cbSize(): number;
    set cbSize(value: number);
    get hWnd(): number;
    set hWnd(value: number);
    get uID(): number;
    set uID(value: number);
    get uFlags(): number;
    set uFlags(value: number);
    get uCallbackMessage(): number;
    set uCallbackMessage(value: number);
    get hIcon(): number;
    set hIcon(value: number);
    get szTip(): string;
    set szTip(value: string);
    get dwState(): number;
    set dwState(value: number);
    get dwStateMask(): number;
    set dwStateMask(value: number);
    get szInfo(): string;
    set szInfo(value: string);
    get uVersion(): number;
    set uVersion(value: number);
    get uTimeout(): number;
    set uTimeout(value: number);
    get szInfoTitle(): string;
    set szInfoTitle(value: string);
    get dwInfoFlags(): number;
    set dwInfoFlags(value: number);
    get guidItem(): Buffer;
    set guidItem(value: Buffer);
    get hBalloonIcon(): number;
    set hBalloonIcon(value: number);
}
export {};
