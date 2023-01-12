@echo off
if exist notice.txt (
    cd ..
)
type scripts\notice.txt
pause

echo Cleaning...
rd /S /Q build
rd /S /Q lib
rd /S /Q bin

echo Installing node modules...
cmd /c npm install

echo Building native module(ia32)...
cmd /c scripts\build-native-ia32.bat
rename bin\native.node native.ia32.node

echo Building native module(x64)...
cmd /c scripts\build-native-x64.bat
rename bin\native.node native.x64.node

echo Compiling TypeScript...
cmd /c scripts\build-typescripts.bat

echo.
echo All done.
