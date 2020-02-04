echo '---pull and checkout repo---'
git pull origin master
git checkout master

echo '---install and build---'
npm install
git checkout package-lock.json
npm run migrate
npm run build

echo '---restart nextjs---'
npm run restart
