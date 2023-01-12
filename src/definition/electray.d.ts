/**
 * Author: zhaoleimxd
 */

import * as events from 'events';
import * as electron from 'electron';

/**
 * Icon use of notify icon tray.
 * @remarks `none`: Empty icon.
 * @remarks `default`: Windows system default application icon.
 * @remarks `window`: Use icon of window from  construction options, this window must has icon settled.
 * @remarks Buffer: A buffer has a .ico file inside.
 */
export declare type ElectrayIcon = `none` | `default` | `window` | Buffer;

/**
 * Electray construction options
 * @remarks `window` can not be undefined or null.
 */
export interface ElectrayConstructionOptions {
    /**
     * Window to receive notify icon tray messages.
     * Electray use this window to receive notify icon tray messages.
     * This property can not be undefined or null.
     */
    window: electron.BrowserWindow;

    /**
     * Custom icon ID.
     * @remarks Range: 0 - 65535, default value: 0x1409.
     * @remarks This ID will be used in Windows message loop to differentiate icons.
     */
    customIconID?: number;

    /**
     * Custom callback message ID in windows message loop.
     * @remarks Range: 1024 - 65535, default value: WM_USER + 0x1409.
     * @remarks This ID will be used in Windows message loop to differentiate events,
     * Set the value bigger can prevent collison.
     */
    customCallbackMessageID?: number;

    /**
     * Icon use of notify icon tray.
     * @remarks `none`: Empty icon.
     * @remarks `default`: Windows system default application icon.
     * @remarks `window`: Use icon of window from  construction options, this window must has icon settled.
     * @remarks Buffer: A buffer has a .ico file inside.
     */
    icon?: ElectrayIcon;

    /**
     * Specifics whether the icon will be show or not.
     */
    showIcon?: boolean;

    /**
     * Tips content to popup when user cursor stay at the icon.
     * @remarks `PopupOpen` and `PopupClose` event can be trigger only if `tips` has been set.
     */
    tips?: string;
    
    /**
     * Specifics whether the tips will be show or not when user cursor stay at the icon.
     */
    showTips?: boolean;
}

/**
 * Options when popup notify icon tray balloon.
 */
export interface ElectrayBalloonOptions {
    /**
     * Popup message title.
     */
    title: string;

    /**
     * Popup message content.
     */
    information: string;
    /**
     * Popup message icon.
     * @remarks `none`: No icon.
     * @remarks `info`: Information icon.
     * @remarks `warning`: Warning icon.
     * @remarks `error`: Error icon.
     * @remarks Buffer: A buffer has a .ico file inside.
     */
    icon?: `none` | `info` | `warning` | `error` | Buffer;

    /**
     * Do not play sound while popup.
     */
    noSound?: boolean;

    /**
     * Try to find a large icon in icon group.
     */
    largeIcon?: boolean;

    /**
     * In Windows 7 and later, if system is set to quiet time, balloon will not popup.
     */
    respectQuietTime?: boolean;

    /**
     * Valid only in Windows 2000 and Windows XP.
     */
    timeoutMilliSeconds?: number;
}

/**
 * Electron notify icon tray operation class.
 */
export declare class Electray extends events.EventEmitter {

    constructor(options: ElectrayConstructionOptions);

    /**
     * Specifics whether the tips will be show or not when user cursor stay at the icon.
     */
    public showTips: boolean;

    /**
     * Tips content to popup when user cursor stay at the icon.
     * @remarks `PopupOpen` and `PopupClose` event can be trigger only if `tips` has been set.
     */
    public tips: string;

    /**
     * Specifics whether the icon will be show or not.
     */
    public showIcon: boolean;

    /**
     * Icon use of notify icon tray.
     * @remarks `none`: Empty icon.
     * @remarks `default`: Windows system default application icon.
     * @remarks `window`: Use icon of window from  construction options, this window must has icon settled.
     * @remarks Buffer: A buffer has a .ico file inside.
     */
    public icon: ElectrayIcon;
    
    /**
     * Popup a balloon to display messages.
     */
    showBalloon(options: ElectrayBalloonOptions): boolean;

    /**
     * Mouse click select tray icon.
     */
    on(event: `Select`, listener: (x: number, y: number) => void): this;
    /**
     * Keyboard select tray icon
     */
    on(event: `KeySelect`, listener: (x: number, y: number) => void): this;
    /**
     * Mouse right click on icon or context menu key pressed
     */
    on(event: `ContextMenu`, listener: (x: number, y: number) => void): this;
    
    /**
     * Popup tips when cursor stay at notify tray icon.
     * @remarks This event can be trigger only if tips has been set.
     */
    on(event: `PopupOpen`, listener: (x: number, y: number) => void): this;
    /**
     * Popup tips closed.
     */
    on(event: `PopupClose`, listener: () => void): this;
    
    on(event: `BalloonShow`, listener: (x: number, y: number) => void): this;
    on(event: `BalloonHide`, listener: (x: number, y: number) => void): this;
    on(event: `BalloonTimeout`, listener: (x: number, y: number) => void): this;
    on(event: `BalloonUserClick`, listener: (x: number, y: number) => void): this;

    on(event: `MouseMove`, listener: (x: number, y: number) => void): this;

    on(event: `MouseLeftButtonDown`, listener: (x: number, y: number) => void): this;
    on(event: `MouseLeftButtonUp`, listener: (x: number, y: number) => void): this;
    on(event: `MouseLeftButtonDoubleClick`, listener: (x: number, y: number) => void): this;
    
    on(event: `MouseRightButtonDown`, listener: (x: number, y: number) => void): this;
    on(event: `MouseRightButtonUp`, listener: (x: number, y: number) => void): this;
    on(event: `MouseRightButtonDoubleClick`, listener: (x: number, y: number) => void): this;
    
    on(event: `MouseMiddleButtonDown`, listener: (x: number, y: number) => void): this;
    on(event: `MouseMiddleButtonUp`, listener: (x: number, y: number) => void): this;
    on(event: `MouseMiddleButtonDoubleClick`, listener: (x: number, y: number) => void): this;
}
