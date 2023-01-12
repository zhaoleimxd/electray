/**
 * Author: zhaoleimxd
 * interface exports of this file defined in <src/electray/native.d.ts>
 * */

#include <node_api.h>

#include <Windows.h>
#include <strsafe.h>

napi_value undefined;
napi_value global;
napi_value value_true;
napi_value value_false;

napi_value global_shell32;
napi_value global_user32;

#define node_initialize_name "initialize"
napi_value node_initialize_function;
napi_value node_initialize(napi_env env, napi_callback_info cbinfo)
{
	return undefined;
}

#define node_getIconHandleNone_name "getIconHandleNone"
napi_value node_getIconHandleNone_function;
napi_value node_getIconHandleNone(napi_env env, napi_callback_info cbinfo)
{
	void* buf = 0;
	napi_value result;
	if (napi_create_buffer(env, sizeof(HICON), &buf, &result) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_buffer failed.");
		return 0;
	}
	
	*(HICON*)buf = NULL;
	return result;
}

#define node_getIconHandleDefault_name "getIconHandleDefault"
napi_value node_getIconHandleDefault_function;
napi_value node_getIconHandleDefault(napi_env env, napi_callback_info cbinfo)
{
	HICON hIcon = LoadIcon(NULL, IDI_APPLICATION);
	if (hIcon == NULL)
	{
		napi_throw_error(env, "Fatal Error", "LoadIcon failed.");
		return 0;
	}

	void* buf = 0;
	napi_value result;
	if (napi_create_buffer(env, sizeof(HICON), &buf, &result) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_buffer failed.");
		return 0;
	}

	*(HICON*)buf = hIcon;
	return result;
}

#define node_getIconHandleByWindowHandle_name "getIconHandleByWindowHandle"
napi_value node_getIconHandleByWindowHandle_function;
napi_value node_getIconHandleByWindowHandle(napi_env env, napi_callback_info cbinfo)
{
	size_t argc = 1;
	napi_value argv[1];
	napi_value arg_this;
	if (napi_get_cb_info(env, cbinfo, &argc, argv, &arg_this, 0) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_cb_info failed.");
		return 0;
	}

	void* buf_hwnd;
	size_t buf_hwnd_size;
	if (napi_get_buffer_info(env, argv[0], &buf_hwnd, &buf_hwnd_size) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_buffer_info failed.");
		return 0;
	}

	if (buf_hwnd_size != sizeof(HWND))
	{
		napi_throw_error(env, "Fatal Error", "Invalid window handle.");
		return 0;
	}

	HWND hWnd = *(HWND*)buf_hwnd;
	HICON hIcon = (HICON)SendMessage(hWnd, WM_GETICON, ICON_SMALL2, (LPARAM)NULL);

	void* buf_hicon = 0;
	napi_value icon_handle;
	if (napi_create_buffer(env, sizeof(HICON), &buf_hicon, &icon_handle) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_buffer failed.");
		return 0;
	}

	*(HICON*)buf_hicon = hIcon;

	return icon_handle;
}

#define node_getIconHandleByPath_name "getIconHandleByPath"
napi_value node_getIconHandleByPath_function;
napi_value node_getIconHandleByPath(napi_env env, napi_callback_info cbinfo)
{
	size_t argc = 1;
	napi_value argv[1];
	napi_value arg_this;
	if (napi_get_cb_info(env, cbinfo, &argc, argv, &arg_this, 0) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_cb_info failed.");
		return 0;
	}

	WCHAR szPath[MAX_PATH] = { 0 };
	size_t size_written = 0;
	if (napi_get_value_string_utf16(env, argv[0], szPath, MAX_PATH, &size_written) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_value_string_utf16 failed.");
		return 0;
	}

	HICON hIcon = LoadImageW(NULL, szPath, IMAGE_ICON, 0, 0, LR_DEFAULTSIZE | LR_LOADFROMFILE | LR_SHARED);
	if (hIcon == NULL)
	{
		napi_throw_error(env, "Fatal Error", "LoadImageW failed.");
		return 0;
	}

	void* buf_hicon = 0;
	napi_value icon_handle;
	if (napi_create_buffer(env, sizeof(HICON), &buf_hicon, &icon_handle) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_buffer failed.");
		return 0;
	}

	*(HICON*)buf_hicon = hIcon;

	return icon_handle;
}

#define node_getIconHandleByBuffer_name "getIconHandleByBuffer"
napi_value node_getIconHandleByBuffer_function;
napi_value node_getIconHandleByBuffer(napi_env env, napi_callback_info cbinfo)
{
	size_t argc = 1;
	napi_value argv[1];
	napi_value arg_this;
	if (napi_get_cb_info(env, cbinfo, &argc, argv, &arg_this, 0) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_cb_info failed.");
		return 0;
	}

	void* buf;
	size_t buf_size;
	if (napi_get_buffer_info(env, argv[0], &buf, &buf_size) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_buffer_info failed.");
		return 0;
	}

	int nOffset = LookupIconIdFromDirectoryEx((PBYTE)buf, TRUE, 0, 0, LR_DEFAULTCOLOR);
	if (nOffset == 0)
	{
		napi_throw_error(env, "Fatal Error", "LookupIconIdFromDirectoryEx failed.");
		return 0;
	}

	HICON hIcon = CreateIconFromResourceEx(
		(PBYTE)buf + nOffset,
		buf_size - nOffset,
		TRUE,
		0x00030000,
		0, 0,
		LR_DEFAULTCOLOR | LR_DEFAULTSIZE | LR_SHARED
	);

	if (hIcon == NULL)
	{
		napi_throw_error(env, "Fatal Error", "CreateIconFromResourceEx failed.");
		return 0;
	}

	void* buf_hicon = 0;
	napi_value icon_handle;
	if (napi_create_buffer(env, sizeof(HICON), &buf_hicon, &icon_handle) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_buffer failed.");
		return 0;
	}

	*(HICON*)buf_hicon = hIcon;

	return icon_handle;
}

#define node_Shell_NotifyIconW_name "Shell_NotifyIconW"
napi_value node_Shell_NotifyIconW_function;
napi_value node_Shell_NotifyIconW(napi_env env, napi_callback_info cbinfo)
{
	size_t argc = 2;
	napi_value argv[2];
	napi_value arg_this;
	if (napi_get_cb_info(env, cbinfo, &argc, argv, &arg_this, 0) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_cb_info failed.");
		return 0;
	}

	napi_valuetype typeof_message;
	if (napi_typeof(env, argv[0], &typeof_message) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "Invalid argument: dwMessage.");
		return 0;
	}

	if (typeof_message != napi_number)
	{
		napi_throw_error(env, "Fatal Error", "Invalid dwMessage value type.");
		return 0;
	}

	DWORD dwMessage = 0;
	if (napi_get_value_uint32(env, argv[0], &dwMessage) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_value_uint32 dwMessage failed.");
		return 0;
	}

	void* buf_data = 0;
	size_t size_data = 0;
	if (napi_get_buffer_info(env, argv[1], &buf_data, &size_data) != napi_ok)
	{
		napi_extended_error_info* error;
		napi_get_last_error_info(env, &error);
		napi_throw_error(env, "Fatal Error", error->error_message);
		return 0;
	}

	if (size_data != sizeof(NOTIFYICONDATAW))
	{
		napi_throw_error(env, "Fatal Error", "Invalid lpData value.");
		return 0;
	}

	NOTIFYICONDATAW* lpData = (NOTIFYICONDATAW*)buf_data;
	BOOL bResult = Shell_NotifyIconW(dwMessage, lpData);

	napi_value result = bResult == TRUE ? value_true : value_false;

	return result;
}

#define node_DestroyIcon_name "DestroyIcon"
napi_value node_DestroyIcon_function;
napi_value node_DestroyIcon(napi_env env, napi_callback_info cbinfo)
{
	size_t argc = 1;
	napi_value argv[1];
	napi_value arg_this;
	if (napi_get_cb_info(env, cbinfo, &argc, argv, &arg_this, 0) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_cb_info failed.");
		return 0;
	}

	void* buf;
	size_t buf_size;
	if (napi_get_buffer_info(env, argv[0], &buf, &buf_size) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_buffer_info failed.");
		return 0;
	}

	if (buf_size != sizeof(HICON))
	{
		napi_throw_error(env, "Fatal Error", "Invalid icon handle.");
		return 0;
	}

	HICON hIcon = *(HICON*)buf;
	BOOL bResult = DestroyIcon(hIcon);

	return bResult == FALSE ? value_false : value_true;
}

napi_value Register(napi_env env, napi_value exports)
{
	if (napi_get_undefined(env, &undefined) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_undefined failed.");
		return 0;
	}
	if (napi_get_global(env, &global) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_global failed.");
		return 0;
	}
	if (napi_get_boolean(env, true, &value_true) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_boolean true failed.");
		return 0;
	}
	if (napi_get_boolean(env, false, &value_false) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_get_boolean false failed.");
		return 0;
	}

	if (napi_create_object(env, &global_shell32) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_object Shell32 failed.");
		return 0;
	}
	if (napi_create_object(env, &global_user32) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_object User32 failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_Shell_NotifyIconW, 0, &node_Shell_NotifyIconW_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function Shell_NotifyIconW failed.");
		return 0;
	}
	if (napi_set_named_property(env, global_shell32, node_Shell_NotifyIconW_name, node_Shell_NotifyIconW_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property Shell_NotifyIconW failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_DestroyIcon, 0, &node_DestroyIcon_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function DestroyIcon failed.");
		return 0;
	}
	if (napi_set_named_property(env, global_user32, node_DestroyIcon_name, node_DestroyIcon_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property DestroyIcon failed.");
		return 0;
	}

	if (napi_set_named_property(env, global, "Shell32", global_shell32) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property global.Shell32 failed.");
		return 0;
	}

	if (napi_set_named_property(env, global, "User32", global_user32) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property global.User32 failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_initialize, 0, &node_initialize_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function initialize failed.");
		return 0;
	}
	if (napi_set_named_property(env, exports, node_initialize_name, node_initialize_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property exports.initialize failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_getIconHandleNone, 0, &node_getIconHandleNone_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function getIconHandleNone failed.");
		return 0;
	}
	if (napi_set_named_property(env, exports, node_getIconHandleNone_name, node_getIconHandleNone_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property exports.getIconHandleNone failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_getIconHandleDefault, 0, &node_getIconHandleDefault_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function getIconHandleDefault failed.");
		return 0;
	}
	if (napi_set_named_property(env, exports, node_getIconHandleDefault_name, node_getIconHandleDefault_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property exports.getIconHandleDefault failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_getIconHandleByWindowHandle, 0, &node_getIconHandleByWindowHandle_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function getIconHandleByWindowHandle failed.");
		return 0;
	}
	if (napi_set_named_property(env, exports, node_getIconHandleByWindowHandle_name, node_getIconHandleByWindowHandle_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property exports.getIconHandleByWindowHandle failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_getIconHandleByPath, 0, &node_getIconHandleByPath_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function getIconHandleByPath failed.");
		return 0;
	}
	if (napi_set_named_property(env, exports, node_getIconHandleByPath_name, node_getIconHandleByPath_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property exports.getIconHandleByPath failed.");
		return 0;
	}

	if (napi_create_function(env, 0, NAPI_AUTO_LENGTH, node_getIconHandleByBuffer, 0, &node_getIconHandleByBuffer_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_create_function getIconHandleByBuffer failed.");
		return 0;
	}
	if (napi_set_named_property(env, exports, node_getIconHandleByBuffer_name, node_getIconHandleByBuffer_function) != napi_ok)
	{
		napi_throw_error(env, "Fatal Error", "napi_set_named_property exports.getIconHandleByBuffer failed.");
		return 0;
	}

	return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Register)
