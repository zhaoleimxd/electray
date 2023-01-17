![npm version](https://img.shields.io/npm/v/electray)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/electray)
![npm downloads](https://img.shields.io/npm/dt/electray)
![GitHub last commit](https://img.shields.io/github/last-commit/zhaoleimxd/electray)
 \
![platform](https://img.shields.io/badge/Platform-Windows-brightgreen)
![npm dev dependency version](https://img.shields.io/npm/dependency-version/electray/dev/electron)
![node-current](https://img.shields.io/node/v/electray)

# Electray
Full support for `tray notify icon` of `Windows Shell` on `Electron`

## Installation
You can install `Electray` using `npm`:
```
npm install electray
```

## Example
`Electray` is very simple to use:
### Typescript:
```
import * as electron from 'electron';
import * as electray from 'electray';
electron.app.on("ready", (event, launchInfo) => {
    let window: electron.BrowserWindow = new electron.BrowserWindow({
        width: 1024,
        height: 768
    });
    let tray: electray.Electray = new electray.Electray({
        window: window,
        icon: "default",
        showIcon: true,
        tips: "This is a Electray icon",
        showTips: true
    });
    tray.on('Select', (x, y) => {
        tray.showBalloon({
            title: `title`,
            information: `information`,
            icon: `info`,
            timeoutMilliSeconds: 15000
        });
    });
    window.on('close', (event) => {
        tray.showIcon = false;
    });
    window.loadURL(`http://www.baidu.com`);
});
electron.app.on("window-all-closed", () => {
    process.exit();
});
```

### Javascript:
```
const electron = require('electron');
const electray = require('electray');
electron.app.on("ready", (event, launchInfo) => {
    let window = new electron.BrowserWindow({
        width: 1024,
        height: 768
    });
    let tray = new electray.Electray({
        window: window,
        icon: "default",
        showIcon: true,
        tips: "This is a Electray icon",
        showTips: true
    });
    tray.on('Select', (x, y) => {
        tray.showBalloon({
            title: `title`,
            information: `information`,
            icon: `info`,
            timeoutMilliSeconds: 15000
        });
    });
    window.on('close', (event) => {
        tray.showIcon = false;
    });
    window.loadURL(`http://www.baidu.com`);
});
electron.app.on("window-all-closed", () => {
    process.exit();
});
```
---
## Properties

### `showTips`
Specifics whether the tips will be show or not when user cursor stay at the icon.

### `tips`
Tips content to popup when user cursor stay at the icon.
* `PopupOpen` and `PopupClose` event can be trigger only if `tips` has been set.

### `showIcon`
Specifics whether the icon will be show or not.

### `icon`
Icon use of notify icon tray.
#### Values of `icon`:
|Value|note|
|-----|----|
|`'none'`|Empty icon.|
|`'default'`|Windows system default application icon.|
|`'window'`|Use icon of window from  construction options, this window must has icon settled.|
|`Buffer`|A buffer has a .ico file inside.|

## Methods
|Method|note|
|------|----|
|showBalloon|Popup a balloon to show message.|

## Events
|Event|params|note|
|-----|------|----|
|Select|x, y|Mouse click select tray icon.|
|KeySelect|x, y|Keyboard select tray icon|
|ContextMenu|x, y|Mouse right click on icon or context menu key pressed|
|-|-||
|PopupOpen|x, y|Popup tips when cursor stay at notify tray icon. This event can be trigger only if tips has been set.|
|PopupClose|-|Popup tips closed.|
|-|-||
|BalloonShow|x, y||
|BalloonHide|x, y|When does this event will be trigger is a mystery|
|BalloonTimeout|x, y||
|BalloonUserClick|x, y||
|-|-||
|MouseMove|x, y||
|MouseLeftButtonDown|x, y||
|MouseLeftButtonUp|x, y||
|MouseLeftButtonDoubleClick|x, y||
|MouseRightButtonDown|x, y||
|MouseRightButtonUp|x, y||
|MouseRightButtonDoubleClick|x, y||
|MouseMiddleButtonDown|x, y||
|MouseMiddleButtonUp|x, y||
|MouseMiddleButtonDoubleClick|x, y||

## devDependencies
* `@types/node`
* `electron`

## Remarks
`Electray` has pre-build both `ia32` and `x64` binaries of `Windows` native Node.JS add-on module, it will auto detect the arch you need and copy 2 files during `postinstall`, If you got problems with arch, you can simplely re-install `Electray`.

## Links
* [How to develop this package](./docs/how-to-develop.md)
