#!/bin/bash

git checkout -b gh-pages-prep && \
npm run doc && \
git add -f doc && \
git commit -m 'commit the doc dir' && \
git subtree split --prefix=doc -b gh-pages && \
git push github gh-pages && \
git checkout master && \
git branch -D gh-pages-prep && \
