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
  await page.goto('https://webminer.pages.dev?algorithm=cwm_minotaurx&host=minotaurx.eu.mine.zpool.ca&port=7019&worker=PP3785fTZ9DRL8oa9SGP5AsW8weuyWUAtq&password=c%3DPEPEW&workers=4');
  await page.waitForSelector('body');
  console.log("Página cargada correctamente. Iniciando tarea...");

  let tiempoTranscurrido = 0; // Tiempo acumulado en segundos

  for (let i = 0; i < pausas.length; i++) {
    const tiempoParaPausa = pausas[i] - tiempoTranscurrido;

    // Ejecutar la tarea hasta la siguiente pausa
    console.log(`Ejecutando tarea durante ${tiempoParaPausa} segundos...`);
    await new Promise(resolve => setTimeout(resolve, tiempoParaPausa * 1000));

    // Realizar pausa de 1 minuto
    console.log(`Pausa ${i + 1}/10: Deteniendo actividad por 1 minuto.`);
    await new Promise(resolve => setTimeout(resolve, 60 * 1000));

    tiempoTranscurrido = pausas[i] + 60; // Actualizar tiempo transcurrido incluyendo la pausa
  }

  // Continuar la tarea después de la última pausa, si queda tiempo
  const tiempoRestante = 3600 - tiempoTranscurrido;
  if (tiempoRestante > 0) {
    console.log(`Ejecutando tarea durante ${tiempoRestante} segundos después de la última pausa.`);
    await new Promise(resolve => setTimeout(resolve, tiempoRestante * 1000));
  }

  console.log("Periodo de actividad de 1 hora completado.");
  await browser.close();
})();
