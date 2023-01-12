"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowsAPIConstant = void 0;
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
})(WindowsAPIConstant = exports.WindowsAPIConstant || (exports.WindowsAPIConstant = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VsZWN0cmF5L2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFZLGtCQXdFWDtBQXhFRCxXQUFZLGtCQUFrQjtJQUMxQiw2QkFBNkI7SUFDN0IsNkRBQVMsQ0FBQTtJQUNULDJEQUFRLENBQUE7SUFFUiw4QkFBOEI7SUFDOUIscUZBQXVCLENBQUE7SUFFdkIsT0FBTztJQUNQLG1FQUFZLENBQUE7SUFDWix1RUFBYyxDQUFBO0lBQ2QseUVBQWUsQ0FBQTtJQUVmLG1CQUFtQjtJQUNuQixpRkFBdUIsQ0FBQTtJQUN2Qix5RUFBbUIsQ0FBQTtJQUVuQiw2RUFBcUIsQ0FBQTtJQUNyQixpRkFBdUIsQ0FBQTtJQUN2Qiw2RUFBcUIsQ0FBQTtJQUNyQixxRkFBeUIsQ0FBQTtJQUN6QixpRkFBdUIsQ0FBQTtJQUN2Qiw2RUFBcUIsQ0FBQTtJQUNyQixxRkFBeUIsQ0FBQTtJQUN6QixpRkFBdUIsQ0FBQTtJQUN2Qiw2RUFBcUIsQ0FBQTtJQUNyQixxRkFBeUIsQ0FBQTtJQUV6QixvRUFBZ0IsQ0FBQTtJQUVoQixtQkFBbUI7SUFDbkIseUVBQXdCLENBQUE7SUFDeEIsbUVBQXFCLENBQUE7SUFDckIsaUVBQW9CLENBQUE7SUFDcEIscUVBQXNCLENBQUE7SUFDdEIsb0VBQXFCLENBQUE7SUFDckIsb0VBQXFCLENBQUE7SUFDckIsNEVBQXlCLENBQUE7SUFDekIsMkVBQXdCLENBQUE7SUFFeEIsMkJBQTJCO0lBQzNCLHFFQUFzQixDQUFBO0lBQ3RCLHFFQUFzQixDQUFBO0lBQ3RCLDJFQUF5QixDQUFBO0lBQ3pCLHVFQUF1QixDQUFBO0lBQ3ZCLHFFQUFzQixDQUFBO0lBQ3RCLGdGQUEyQixDQUFBO0lBQzNCLDRFQUF5QixDQUFBO0lBQ3pCLGtGQUE0QixDQUFBO0lBQzVCLG1HQUFvQyxDQUFBO0lBRXBDLDZDQUE2QztJQUM3Qyx1RkFBc0IsQ0FBQTtJQUN0QiwyRkFBd0IsQ0FBQTtJQUV4QixzQkFBc0I7SUFDdEIsaUVBQW9CLENBQUE7SUFDcEIsdUVBQXVCLENBQUE7SUFDdkIsdUVBQXVCLENBQUE7SUFDdkIsMkVBQXlCLENBQUE7SUFDekIsK0VBQTJCLENBQUE7SUFFM0Isc0JBQXNCO0lBQ3RCLDBFQUF3QixDQUFBO0lBQ3hCLG1FQUFjLENBQUE7SUFDZCxnRkFBdUMsQ0FBQTtJQUN2QyxvRkFBK0IsQ0FBQTtJQUMvQixvRkFBK0IsQ0FBQTtJQUMvQiwwRkFBa0MsQ0FBQTtJQUNsQyw4RkFBb0MsQ0FBQTtJQUNwQyxnRkFBNkIsQ0FBQTtJQUM3QixrRkFBOEIsQ0FBQTtBQUNsQyxDQUFDLEVBeEVXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBd0U3QiJ9