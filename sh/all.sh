#!/bin/bash

ignores="release"
VERSION=0.0.1
APPVERSION=0.0.1
APPNAME=WeTop
ICON=./lib/frontend/images/app.icns
RELEASE=./release
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
electron-packager . $APPNAME --all --app-version=$APPVERSION \
--asar=true --icon=$ICON --prune --overwrite --out=$RELEASE