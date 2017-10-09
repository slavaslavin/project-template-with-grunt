# project-template-with-grunt

# Node.js, nvm, Grunt
# für Linux
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
# oder
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

# installiert Node.js der Version aus ".nvmrc"
nvm install

# installiert Node.js auf die Version aus ".nvmrc"
nvm use

# installiert Grunt mit den Packeten aus "package.json"
grunt install

# watch-Task ausführen
grunt

# prod-Task ausführen
grunt prod
