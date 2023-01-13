const os = require('os');
const fs = require('fs');
const path = require('path');

function findFileInParentDirs(fileName) {
    let parentDir = path.resolve(`./`);
    let lastDir = ``;
    do {
        lastDir = parentDir;
        parentDir = path.resolve(`${parentDir}/../`);
        let pjPath = path.resolve(`${parentDir}/${fileName}`);
        if (fs.existsSync(pjPath)) {
            return pjPath;
        }
    }
    while (lastDir != parentDir)

    return undefined;
}

function selectArch() {
    let osArch = os.arch();
    let pjArch = undefined;
    let rcArch = undefined;

    let pjPath = findFileInParentDirs(`package.json`);
    if (fs.existsSync(pjPath)) {
        let pjStr = fs.readFileSync(pjPath, {
            encoding: `utf8`
        });
        let pj = JSON.parse(pjStr);
        if (pj[`config`] != undefined) {
            pjArch = pj[`config`][`arch`]
        }
    }

    let rcPath = findFileInParentDirs(`.npmrc`);
    if (fs.existsSync(rcPath)) {
        let rcStr = fs.readFileSync(rcPath, {
            encoding: `utf8`
        });
        let pattern = /arch=(.+)\n/;
        if (pattern.test(rcStr)) {
            let ea = pattern.exec(rcStr);
            rcArch = ea[1];
        }
    }

    let arch = undefined;
    if (pjArch != undefined) {
        arch = pjArch;
        console.log(`Use arch in ${pjPath}: ${arch}`);
    }
    else if (rcArch != undefined) {
        arch = rcArch;
        console.log(`Use arch in ${rcPath}: ${arch}`);
    }
    else {
        arch = osArch;
        console.log(`Use OS arch: ${arch}`);
    }

    return arch;
}

function copyFiles() {
    let arch = selectArch();
    if (fs.existsSync(`lib`) == false) {
        fs.mkdirSync(`lib`);
    }

    fs.copyFile(`src/electray/native.d.ts`, `lib/native.d.ts`, (error) => {
        if (error == null) {
            console.log(`lib/native.d.ts copied.`);
        }
        else {
            console.log(`Error in copying file.`);
        }
        fs.copyFile(`bin/native.${arch}.node`, `lib/native.node`, (error) => {
            if (error == null) {
                console.log(`lib/native.node copied.`);
            }
            else {
                console.log(`Error in copying file.`);
            }
            console.log(`Postinstall done.`);
        });
    });
}

(function main() {
    copyFiles();
})();
