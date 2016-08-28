#!/bin/bash

git checkout -b gh-pages-prep
npm run doc
git add -f doc
git commit -m 'adding in the doc dir'
git push +$(git subtree split --prefix=doc):gh-pages
git checkout master 
git branch -D gh-pages-prep
