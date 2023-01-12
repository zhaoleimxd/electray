
export declare type Handle = Buffer;

export function initialize(): void;

export function getIconHandleNone(): Handle;
export function getIconHandleDefault(): Handle;
export function getIconHandleByWindowHandle(windowHandle: Handle): Handle;
export function getIconHandleByPath(path: string): Handle;
export function getIconHandleByBuffer(buffer: Buffer): Handle;

declare global {
    export namespace Shell32 {
        export function Shell_NotifyIconW(dwMessage: number, lpData: Buffer): boolean;
    }

    export namespace User32 {
        export function DestroyIcon(hIcon: Handle): boolean;
    }
}
