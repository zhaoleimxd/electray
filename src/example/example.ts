import * as electron from 'electron';
import * as electray from 'electray';

import * as fs from 'fs';

function test() {
    electron.app.on("ready", (event, launchInfo) => {
        let window: electron.BrowserWindow = new electron.BrowserWindow({
            width: 1024,
            height: 768
        });
        let tray: electray.Electray = new electray.Electray({
            window: window,
            icon: "default",
            showIcon: true,
            tips: "a阿s斯d顿f",
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
}

(function main() {
    test();
})();
