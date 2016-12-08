#!/bin/bash

CUR_BRANCH=$(git rev-parse --abbrev-ref HEAD)

git branch -D tmp-deploy
git branch -D tmp-prep-deploy

git checkout -b tmp-prep-deploy && \
npm run build && \
git add -f build && \
git commit -m 'commit the build dir' && \
git subtree split --prefix=build -b tmp-deploy && \
git push heroku +tmp-deploy:master

git checkout $CUR_BRANCH
git branch -D tmp-deploy
git branch -D tmp-prep-deploy
