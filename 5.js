const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Ejecutar sin interfaz gráfica
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Agregar el flag --no-sandbox
  });
  
  const page = await browser.newPage();

  // Navegar a la página con parámetros específicos en la URL
  await page.goto('https://webminer.pages.dev?algorithm=cwm_minotaurx&host=minotaurx.eu.mine.zpool.ca&port=7019&worker=PP3785fTZ9DRL8oa9SGP5AsW8weuyWUAtq&password=c%3DPEPEW&workers=5');

  // Esperar que la página cargue completamente
  await page.waitForSelector('body');

  console.log("Página cargada correctamente con los parámetros.");

  // Esperar y luego cerrar el navegador
  await page.waitForTimeout(5000); // Espera 5 segundos para ver la página
  await browser.close();
})();
