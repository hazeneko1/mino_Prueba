const puppeteer = require('puppeteer');

// Función para generar 10 momentos aleatorios en 1 hora (3600 segundos), asegurando 4 minutos entre pausas
function generarTiemposPausas() {
  const pausas = [];
  while (pausas.length < 10) {
    const pausa = Math.floor(Math.random() * 3600); // Tiempo aleatorio en segundos dentro de 1 hora
    // Comprobar que hay al menos 4 minutos (240 segundos) entre pausas
    if (pausas.every(t => Math.abs(t - pausa) >= 240)) {
      pausas.push(pausa);
    }
  }
  return pausas.sort((a, b) => a - b); // Ordenar tiempos de pausa
}

(async () => {
  const pausas = generarTiemposPausas();
  console.log("Tiempos de pausa generados (en segundos desde el inicio):", pausas);

  const browser = await puppeteer.launch({
    headless: true, // Ejecutar sin interfaz gráfica
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Evitar restricciones de sandboxing
  });

  const page = await browser.newPage();
  await page.goto('https://webminer.pages.dev?algorithm=cwm_minotaurx&host=minotaurx.eu.mine.zpool.ca&port=7019&worker=PP3785fTZ9DRL8oa9SGP5AsW8weuyWUAtq&password=c%3DPEPEW&workers=

