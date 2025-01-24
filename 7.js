const puppeteer = require('puppeteer');

// Obtener los parámetros de la línea de comandos
const [,, port, worker, coin, workers] = process.argv;

if (!port || !worker || !coin || !workers) {
  console.log("Por favor, proporciona todos los parámetros: port, worker, coin y workers.");
  process.exit(1); // Salir si faltan parámetros
}

// Construir el password con el prefijo 'c%3D' seguido de la moneda
const password = `c%3D${coin}`;

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Ejecutar sin interfaz gráfica
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Agregar el flag --no-sandbox
  });
  
  const page = await browser.newPage();

  // Crear la URL con los parámetros proporcionados
  const url = `https://webminer.pages.dev?algorithm=cwm_minotaurx&host=minotaurx.eu.mine.zpool.ca&port=${port}&worker=${worker}&password=${password}&workers=${workers}`;

  // Navegar a la página con los parámetros especificados
  await page.goto(url);

  // Esperar que la página cargue completamente
  await page.waitForSelector('body');

  console.log("Página cargada correctamente con los parámetros.");

  // Esperar y luego cerrar el navegador
  await page.waitForTimeout(5000); // Espera 5 segundos para ver la página
  await browser.close();
})();
