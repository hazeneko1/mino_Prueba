 
____ - Instalar pupeter

npm install puppeteer


_____ - Instalar chrome

npx puppeteer browsers install


_____ - Instalar dependencias

sudo apt update
sudo apt install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxrandr2 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxshmfence1 \
    libgbm1 \
    libasound2 \
    libdrm2 \
    libxkbcommon0 \
    libpango1.0-0 \
    libpangocairo-1.0-0

Si con estas no va, abajo son las mismas, pero agrega alguna mas.

_____________________________________ 
_____________________________________

# Actualizar lista de paquetes y dependencias necesarias
sudo apt update
sudo apt install -y \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libxrandr2 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxshmfence1 \
    libgbm1 \
    libasound2 \
    libdrm2 \
    libxkbcommon0 \
    libpango1.0-0 \
    libpangocairo-1.0-0 \
    gconf-service \
    libappindicator3-1 \
    xdg-utils \
    fonts-liberation


______ - Ejecutar script 

node 6.js