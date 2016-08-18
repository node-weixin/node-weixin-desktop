#!/bin/bash

ignores="release"
PLATFORM=$1
ARCH=$2
VERSION=$3
APPVERSION=$4
APPNAME=WeTop
if [ $1='darwin' ];
then # if/then branch
  ICON=./lib/frontend/images/app.png
else # else branch
  ICON=./lib/frontend/images/app.icns
fi
RELEASE=./release
echo $ICON

ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/

electron-packager . $APPNAME --platform=$PLATFORM --arch=$ARCH --app-version=$APPVERSION \
--asar=true --icon=$ICON --prune --overwrite --out=$RELEASE