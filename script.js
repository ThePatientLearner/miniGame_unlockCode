const canvas = document.getElementById("juegoCanvas");
const ctx = canvas.getContext("2d");

let jugador = { x: canvas.width / 2, y: canvas.height - 30, ancho: 30, alto: 30, velocidad: 5 };
let circulos = [];
let segundosRestantes = 70;
let juegoIniciado = false;

function iniciarJuego() {
  juegoIniciado = true;
  setInterval(actualizarJuego, 1000 / 100); // 60 fps
  setInterval(generarCirculo, 300);
  setInterval(contarTiempo, 1000);
  document.addEventListener("keydown", moverJugador);
}

function actualizarJuego() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dibujarJugador();
  moverCirculos();
  verificarColision();
  dibujarContador();
}

function dibujarJugador() {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(jugador.x, jugador.y);
  ctx.lineTo(jugador.x + jugador.ancho / 2, jugador.y - jugador.alto);
  ctx.lineTo(jugador.x - jugador.ancho / 2, jugador.y - jugador.alto);
  ctx.fill();
  ctx.closePath();
}

function moverJugador(evento) {
  if (juegoIniciado) {
    if (evento.key === "ArrowLeft" && jugador.x - jugador.velocidad > 0) {
      jugador.x -= jugador.velocidad*8;
    } else if (evento.key === "ArrowRight" && jugador.x + jugador.velocidad < canvas.width) {
      jugador.x += jugador.velocidad*3;
    }
  }
}

function generarCirculo() {
  const radio =30;
  const velocidad = Math.random() * 2 + 1 + (60 - segundosRestantes) / 10; // velocidad aumenta con el tiempo
  const posX = Math.random() * (canvas.width - radio * 2) + radio;
  const posY = -radio;
  circulos.push({ x: posX, y: posY, radio: radio, velocidad: velocidad });
}

function moverCirculos() {
  for (let i = 0; i < circulos.length; i++) {
    circulos[i].y += circulos[i].velocidad;
    if (circulos[i].y > canvas.height) {
      circulos.splice(i, 1);
      i--;
    }
  }

  for (const circulo of circulos) {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(circulo.x, circulo.y, circulo.radio, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function verificarColision() {
  for (const circulo of circulos) {
    const distancia = Math.sqrt(Math.pow(jugador.x - circulo.x, 2) + Math.pow(jugador.y - circulo.y, 2));
    if (distancia < jugador.alto + circulo.radio-20) {
      reiniciarJuego();
      return;
    }
  }
}

function contarTiempo() {
  if (juegoIniciado) {
    segundosRestantes--;
    if (segundosRestantes <= 0) {
      ganarJuego();
    }
  }
}

function dibujarContador() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Tiempo: ${segundosRestantes}s`, 10, 30);
}

function reiniciarJuego() {
  juegoIniciado = false;
  jugador.x = canvas.width / 2;
  circulos = [];
  segundosRestantes = 70;
  alert("¡Perdiste! DEJA DE FEEDEAR!");
}

function ganarJuego() {
  juegoIniciado = false;
  alert("PREMIO! Lol rp codigo: EPAQ4MQ47NW");
}
