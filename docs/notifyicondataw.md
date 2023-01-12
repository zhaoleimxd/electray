### members of [NOTIFYICONDATAW](https://learn.microsoft.com/zh-cn/windows/win32/api/shellapi/ns-shellapi-notifyicondataw)
|name|type|offset|size|offset(64)|size(64)|
|----|----|-----:|:---|---------:|:-------|
cbSize|DWORD|0|4|0|4
hWnd|HWND|4|4|8|8
uID|UINT|8|4|16|4
uFlags|UINT|12|4|20|4
uCallbackMessage|UINT|16|4|24|4
hIcon|HICON|20|4|32|8
szTip|WCHAR[128]|24|256|40|256
dwState|DWORD|280|4|296|4
dwStateMask|DWORD|284|4|300|4
szInfo|WCHAR[256]|288|512|304|512
uTimeout or uVersion|UINT|800|4|816|4
szInfoTitle|WCHAR[64]|804|128|820|128
dwInfoFlags|DWORD|932|4|948|4
guidItem|GUID|936|16|952|16
hBalloonIcon|HICON|952|4|968|8

