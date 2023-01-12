# Develop guide

## Prepare enviroments
To develop this package, you need to make sure you have these enviroments installed.
|Name|Version|Note|
|----|-------|----|
|NodeJS|>= 10||
|Typescript||You can install by `npm install typescript -g`|
|node-gyp||You can install by `npm install node-gyp -g`|
|Python|>= 3.7||
|Visual Studio|2019|MSVC2019 or Windows build tools.|
|Visual Studio Code||IDE|

## Get started
If you have all the enviroments, you can start develop by following these steps.
### 1. Change work directory to electray source root.
```
cd electray
```

### 2. Move `node-gyp` project file.
```
move src\native\binding.gyp .\
```
I have moved this `binding.gyp` file into subdir to prevent `npm` auto build native modules during `npm install`, to develop the native module, you need to move this file out to root dir.

### 3. Generate solution
```
node-gyp configure
```
You can add a option to determine the arch you want to generate.
```
node-gyp configure --arch=ia32
node-gyp configure --arch=x64
```

### 4. Build native module
```
node-gyp build
```
If no error occurred, You can get native module in path `bin\native.node`

## Developing
I have already configured VSCode tasks, developer can just press `Ctrl + Shift + B` to start the Typescript watch tasks.

## Source structure
```
electray
├─.vscode           // VSCode tasks and launch configure files
├─bin               // Pre-build native node add-on modules
├─docs              // Docs about electray
├─example           // Example project of Electron
├─lib               // Package export directory
├─scripts           // Build scripts and postinstall script
└─src
    ├─definition    // Source of electray.d.ts
    ├─electray      // Source of electray
    ├─example       // Source of example
    └─native        // Source of native node add-on module
```

## Remark
* `src\definition\electray.d.ts` is human written definition, it will auto copy to `lib` directory by build script.
* Build scripts can be run only when `Working Directory` in electray package root directory.
