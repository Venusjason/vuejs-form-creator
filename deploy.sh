#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vuepress/dist

git add -A
git commit -m 'deploy'

git push -f git@github.com:Venusjason/vuejs-form-creator.git master:q-former