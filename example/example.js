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
const electron = __importStar(require("electron"));
const electray = __importStar(require("electray"));
function test() {
    electron.app.on("ready", (event, launchInfo) => {
        let window = new electron.BrowserWindow({
            width: 1024,
            height: 768
        });
        let tray = new electray.Electray({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9leGFtcGxlL2V4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQUFxQztBQUNyQyxtREFBcUM7QUFJckMsU0FBUyxJQUFJO0lBQ1QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFO1FBQzNDLElBQUksTUFBTSxHQUEyQixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUM7WUFDNUQsS0FBSyxFQUFFLElBQUk7WUFDWCxNQUFNLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxHQUFzQixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDaEQsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsU0FBUztZQUNmLFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNiLEtBQUssRUFBRSxPQUFPO2dCQUNkLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixJQUFJLEVBQUUsTUFBTTtnQkFDWixtQkFBbUIsRUFBRSxLQUFLO2FBQzdCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNILFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUN0QyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsQ0FBQyxTQUFTLElBQUk7SUFDVixJQUFJLEVBQUUsQ0FBQztBQUNYLENBQUMsQ0FBQyxFQUFFLENBQUMifQ==