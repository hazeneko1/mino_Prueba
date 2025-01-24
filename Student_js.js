const puppeteer = require('puppeteer');

(async () => {
  // Abre Chromium (puedes usar "headless" para no abrir la ventana)
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navegar a la página
  await page.goto('https://webminer.pages.dev/');

  // Esperar que la página cargue completamente
  await page.waitForSelector('body');

  // Buscar el botón "Start Mining"
  const button = await page.$('button:contains("Start Mining")');
  
  if (button) {
    console.log("Botón 'Start Mining' encontrado.");
    await button.click();
    console.log("Hice clic en el botón.");
  } else {
    console.log("No se encontró el botón.");
  }

  // Esperar y luego cerrar el navegador
  await page.waitForTimeout(5000); // Espera 5 segundos
  await browser.close();
})();