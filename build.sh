#!/bin/bash

ignores="release"
PLATFORM=$1
ARCH=$2
VERSION=$3
APPVERSION=$4
APPNAME=WeTop
ICON=./lib/frontend/images/app.icns
RELEASE=./release

ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/

electron-packager . $APPNAME --platform=$PLATFORM --arch=$ARCH --app-version=$APPVERSION \
--asar=true --icon=$ICON --overwrite --out=$RELEASE