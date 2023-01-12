@echo off
copy src\native\binding.gyp .\
node-gyp clean && node-gyp configure --arch=ia32 && node-gyp build && del binding.gyp && rd /S /Q build
