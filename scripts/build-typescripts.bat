@echo off
copy src\definition\electray.d.ts lib\electray.d.ts
tsc -build tsconfig.electray.json
tsc -build tsconfig.example.json
