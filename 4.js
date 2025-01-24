const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  // Navegar a la página
  await page.goto('https://webminer.pages.dev/');

  // Esperar que la página cargue completamente
  await page.waitForSelector('body');

  // Buscar el botón usando la clase CSS
  const button = await page.$('.css-17yhhjv.ant-btn.ant-btn-primary');
  
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