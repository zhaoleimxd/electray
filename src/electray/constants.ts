export enum WindowsAPIConstant {
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
