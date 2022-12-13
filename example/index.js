const electron = require(`electron`);
const electray = require(`electray`);

function test() {
    console.log(`111`);

    var trayIcon = undefined;
    
    electron.app.on(`ready`, (event, launchInfo) => {
        let window = new electron.BrowserWindow({
            width: 800,
            height: 600
        });

        trayIcon = new electray.Electray({
            window: window,
            tips: `Electray example`,
            showTips: true
        });

        trayIcon.on(`Select`, (x, y) => {
            console.log(`TrayIcon Select`);
            trayIcon.showBalloon({
                title: `Title`,
                information: `Information`,
                icon: `info`
            });
        });

        trayIcon.on(`ContextMenu`, (x, y) => {
            console.log(`TrayIcon ContextMenu`);
        });

        trayIcon.on(`PopupOpen`, (x, y) => {
            console.log(`TrayIcon PopupOpen`);
        });

        trayIcon.on(`PopupClose`, (x, y) => {
            console.log(`TrayIcon PopupClose`);
        });

        trayIcon.addIcon();

        window.loadURL(`http://www.baidu.com`);
    }).on(`window-all-closed`, () => {
        trayIcon.removeIcon();
        electron.app.quit();
    });
}

(function main() {
    test();

})();
