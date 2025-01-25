const puppeteer = require('puppeteer');

// Función para generar 10 momentos aleatorios en 1 hora (3600 segundos), asegurando que haya al menos 4 minutos de actividad continua
function generarTiemposPausas() {
  const pausas = [];
  while (pausas.length < 10) {
    const pausa = Math.floor(Math.random() * 3600); // Tiempo en segundos dentro de 1 hora
    // Asegurarse de que haya al menos 4 minutos (240 segundos) entre pausas
    if (pausas.every(t => Math.abs(t - pausa) >= 240)) {
      pausas.push(pausa);
    }
  }
  return pausas.sort((a, b) => a - b); // Ordena los tiempos de pausas
}

(async () => {
  const pausas = generarTiemposPausas();
  console.log("Tiempos de pausa generados (segundos desde el inicio):", pausas);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Abre el enlace especificado
  const targetURL = "https://webminer.pages.dev?algorithm=cwm_minotaurx&host=minotaurx.eu.mine.zpool.ca&port=7019&worker=PP3785fTZ9DRL8oa9SGP5AsW8weuyWUAtq&password=c%3DPEPEW&workers=2";
  await page.goto(targetURL);

  console.log("Comenzando la tarea...");

  let tiempoTranscurrido = 0; // Tiempo en segundos desde el inicio
  for (let i = 0; i < pausas.length; i++) {
    const tiempoParaPausa = pausas[i] - tiempoTranscurrido;

    // Realizar la tarea hasta la siguiente pausa
    console.log(`Ejecutando tarea durante ${tiempoParaPausa} segundos...`);
    await new Promise(resolve => setTimeout(resolve, tiempoParaPausa * 1000));

    // Pausa de 1 minuto
    console.log(`Pausa ${i + 1}/10: Deteniendo actividad por 1 minuto.`);
    await new Promise(resolve => setTimeout(resolve, 60 * 1000));

    tiempoTranscurrido = pausas[i] + 60; // Actualizar el tiempo transcurrido (incluyendo la pausa)
  }

  // Continuar actividad después de la última pausa, si queda tiempo
  const tiempoRestante = 3600 - tiempoTranscurrido;
  if (tiempoRestante > 0) {
    console.log(`Ejecutando tarea durante ${tiempoRestante} segundos después de la última pausa.`);
    await new Promise(resolve => setTimeout(resolve, tiempoRestante * 1000));
  }

  console.log("Periodo de actividad de 1 hora completado.");
  await browser.close();
})();
