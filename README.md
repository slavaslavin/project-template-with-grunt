# project-template-with-grunt
Projekt klonen
```bash
git clone https://github.com/slavaslavin/project-template-with-grunt.git <new name of the project>
```

nvm-Installation für Linux
```bash
sudo apt-get update
sudo apt-get install build-essential libssl-dev
```
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
oder
```bash
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
wenn nötig
```bash
source ~/.profile
```
für Windows das Installationspaket von https://github.com/coreybutler/nvm-windows/releases downloaden

installiert Node.js der Version aus ".nvmrc"
```bash
nvm install
```

stellt Node.js auf die Version aus ".nvmrc"
```bash
nvm use
```

installiert Node.js-Packete aus "package.json"
```bash
npm install
```

watch-Task ausführen
```bash
grunt
```

prod-Task ausführen
```bash
grunt prod
```
