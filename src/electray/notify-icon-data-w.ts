/**
 * Author: zhaoleimxd
 */

/**
 * Handle type has different length in different arch.
 * @ia32 length: 4 bytes
 * @x64 length: 8 bytes
 */
export declare type Handle = Buffer;

/**
* This class is for automatic binary editing of NotifyIconDataW struct from <shellapi.h>.
* need more information about this struct please view the page below:
* https://learn.microsoft.com/en-us/windows/win32/api/shellapi/ns-shellapi-notifyicondataw
*/
export class NotifyIconDataW {

    private buffer: Buffer;
    private is64BitProcess: boolean = false;
    private handleLength: number = 4;

    constructor() {
        if (process.arch == 'ia32') {
            this.buffer = Buffer.alloc(956, 0);
            this.cbSize = 956;
        }
        else if (process.arch == 'x64') {
            this.buffer = Buffer.alloc(976, 0);
            this.cbSize = 976;
            this.is64BitProcess = true;
            this.handleLength = 8;
        }
        else {
            throw new Error(`Arch not support: ${process.arch}`);
        }
    }

    public getBuffer(): Buffer {
        return this.buffer;
    }

    public get cbSize(): number {
        return this.buffer.readUInt32LE(0);
    }
    public set cbSize(value: number) {
        this.buffer.writeUInt32LE(value, 0);
    }

    public get hWnd(): Handle {
        let offset: number = this.is64BitProcess == true ? 8 : 4;
        return this.buffer.slice(offset, offset + this.handleLength);
    }
    public set hWnd(value: Handle) {
        let offset: number = this.is64BitProcess == true ? 8 : 4;
        value.copy(this.buffer, offset, 0, this.handleLength);
    }

    public get uID(): number {
        let offset: number = this.is64BitProcess == true ? 16 : 8;
        return this.buffer.readUInt32LE(offset);
    }
    public set uID(value: number) {
        let offset: number = this.is64BitProcess == true ? 16 : 8;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get uFlags(): number {
        let offset: number = this.is64BitProcess == true ? 20 : 12;
        return this.buffer.readUInt32LE(offset);
    }
    public set uFlags(value: number) {
        let offset: number = this.is64BitProcess == true ? 20 : 12;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get uCallbackMessage(): number {
        let offset: number = this.is64BitProcess == true ? 24 : 16;
        return this.buffer.readUInt32LE(offset);
    }
    public set uCallbackMessage(value: number) {
        let offset: number = this.is64BitProcess == true ? 24 : 16;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get hIcon(): Handle {
        let offset: number = this.is64BitProcess == true ? 32 : 20;
        return this.buffer.slice(offset, offset + this.handleLength);
    }
    public set hIcon(value: Handle) {
        let offset: number = this.is64BitProcess == true ? 32 : 20;
        value.copy(this.buffer, offset, 0, this.handleLength);
    }

    public get szTip(): string {
        let offset: number = this.is64BitProcess == true ? 40 : 24;
        return this.buffer.toString('utf16le', offset, offset + 256);
    }
    public set szTip(value: string) {
        let offset: number = this.is64BitProcess == true ? 40 : 24;
        Buffer.from(value, `utf16le`).copy(this.buffer, offset, 0, 256 - 2);
    }

    public get dwState(): number {
        let offset: number = this.is64BitProcess == true ? 296 : 280;
        return this.buffer.readUInt32LE(offset);
    }
    public set dwState(value: number) {
        let offset: number = this.is64BitProcess == true ? 296 : 280;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get dwStateMask(): number {
        let offset: number = this.is64BitProcess == true ? 300 : 284;
        return this.buffer.readUInt32LE(offset);
    }
    public set dwStateMask(value: number) {
        let offset: number = this.is64BitProcess == true ? 300 : 284;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get szInfo(): string {
        let offset: number = this.is64BitProcess == true ? 304 : 288;
        return this.buffer.toString('utf16le', offset, offset + 512);
    }
    public set szInfo(value: string) {
        let offset: number = this.is64BitProcess == true ? 304 : 288;
        Buffer.from(value, `utf16le`).copy(this.buffer, offset, 0, 512 - 2);
    }

    public get uTimeout(): number {
        let offset: number = this.is64BitProcess == true ? 816 : 800;
        return this.buffer.readUInt32LE(offset);
    }
    public set uTimeout(value: number) {
        let offset: number = this.is64BitProcess == true ? 816 : 800;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get uVersion(): number {
        let offset: number = this.is64BitProcess == true ? 816 : 800;
        return this.buffer.readUInt32LE(offset);
    }
    public set uVersion(value: number) {
        let offset: number = this.is64BitProcess == true ? 816 : 800;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get szInfoTitle(): string {
        let offset: number = this.is64BitProcess == true ? 820 : 804;
        return this.buffer.toString('utf16le', offset, offset + 128);
    }
    public set szInfoTitle(value: string) {
        let offset: number = this.is64BitProcess == true ? 820 : 804;
        Buffer.from(value, `utf16le`).copy(this.buffer, offset, 0, 128 - 2);
    }

    public get dwInfoFlags(): number {
        let offset: number = this.is64BitProcess == true ? 948 : 932;
        return this.buffer.readUInt32LE(offset);
    }
    public set dwInfoFlags(value: number) {
        let offset: number = this.is64BitProcess == true ? 948 : 932;
        this.buffer.writeUInt32LE(value, offset);
    }

    public get guidItem(): Buffer {
        let start: number = this.is64BitProcess == true ? 952 : 936;
        return this.buffer.slice(start, start + 16);
    }
    public set guidItem(value: Buffer) {
        let start: number = this.is64BitProcess == true ? 952 : 936;
        value.copy(this.buffer, start, 0, 16);
    }

    public get hBalloonIcon(): Handle {
        let offset: number = this.is64BitProcess == true ? 968 : 952;
        return this.buffer.slice(offset, offset + this.handleLength);
    }
    public set hBalloonIcon(value: Handle) {
        let offset: number = this.is64BitProcess == true ? 968 : 952;
        value.copy(this.buffer, offset, 0, this.handleLength);
    }
}
