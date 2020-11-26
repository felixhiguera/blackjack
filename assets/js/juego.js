/**
 *  2C = Two of Clubs (treboles)
 *  2D = Two of Diamonds (treboles)
 *  2H = Two of Hearts (treboles)
 *  2S = Two of Spades (treboles)
 *
 *
 */

let deck = []; // se crea el deck que es el array que contendra las cartas
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
const puntosHTML = document.querySelectorAll("small");

const crearDeck = () => {
  // se crea en el for ka variable i para que recorra de 2 al 10 y se le agrega el array para que quede 2c, 3c, 4c, 5c

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  //despues se le agregan los caracteres especiales que no son numeros para que el array quede AC,AD,etc.
  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  //Returns a shuffled copy of the list, using a version of the Fisher-Yates shuffle. _.shuffle([1, 2, 3, 4, 5, 6]);
  deck = _.shuffle(deck);

  return deck;
};
console.log(deck);
crearDeck();

//Esta funcion cuando es llamada me permite pedir una carta

const pedirCarta = () => {
  //este if es por seguridad de que el array no contenga nada
  if (deck.length === 0) {
    throw " no hay cartas en el deck"; // manda un error en consola
  }
  //cuando se le da click al boton, lo que hace es eliminar una carta del array con el pop
  // y la regresa en la variable carta
  const carta = deck.pop();
  //retornamos la carta
  return carta;
};

//una vez tengamos el valor de la carta tenemos que substraer el numero para sumar
const valorCarta = (carta) => {
  //asi que utilizamos el metodo substring que substrae desde el 0 hasta el 10 porque el limite es carta.length- 1
  const valor = carta.substring(0, carta.length - 1);
  //si el valor no es un numero y el valor es A entonces vale 11, si no, vale 10
  //si no, es un numero y si  es un numero hay que multiplicarlo por 1 para hacerlo number (era string)
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  // console.log({ valor });
  // let puntos = 0;
  // if (isNaN(valor)) {
  //   console.log("No es un numero");
  //   puntos = valor === "A " ? 11 : 10;
  // } else {
  //   console.log("Es un numero");
  //   puntos = valor * 1; //para cambiar la variable a tipo numerico se multiplica por 1
  // }
  // console.log(puntos);
};

//turno de la computadora
//para el caso de la computadora realizamos la funcion y pedimos como argumento los puntos del jugador (puntosMinimos)
const turnoComputadora = (puntosMinimos) => {
  //este do while se ocupa para que la computadora haga lo que este adentro del do hasta que llege a 21
  do {
    //va a llamar la funcion pedirCarta para otorgarle una carta por ej. 2C
    const carta = pedirCarta();
    //se hace llamar la funcion valorCarta y se le pasa como parametro la carta para que regrese el numero
    // y sea guardado en la variable puntosComputadora
    puntosComputadora = puntosComputadora + valorCarta(carta);
    //sera guardado en el DOM en el contenedor [1] del arreglo
    puntosHTML[1].innerText = puntosComputadora;
    //se va a crear un elemento de tipo img y seguarda en imgCarta
    const imgCarta = document.createElement("img");
    imgCarta.src = `./cartas/${carta}.png`;
    imgCarta.classList.add("carta");

    divCartasComputadora.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  //este settimeout es para que el alert aparezca despues de las cartas de la computadora
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Draw!");
    } else if (puntosMinimos > 21) {
      alert("Computer win!");
    } else if (puntosComputadora > 21) {
      alert("Player win!");
    } else {
      alert("Computer win!");
    }
  }, 10);
};

//eventos
// para cuando damos click en el boton btnPedir
btnPedir.addEventListener("click", () => {
  // obtenemos el resultado de la funcion pedirCarta y lo pasamos a la funcion carta
  const carta = pedirCarta();
  //llamamos la funcion valorCarta para obtener el valor y lo vamos guardando en puntosJugador
  puntosJugador = puntosJugador + valorCarta(carta);
  //esos puntos seran almacenamos en el DOM para visualizar en pantalla (puntosHTML[0].innerText)
  puntosHTML[0].innerText = puntosJugador;
  //se crea un elemento img y se guarda en imgCarta
  const imgCarta = document.createElement("img");
  //el elemento se le agregara el source para que asi contenga la imagen guardada y se le pone la ubicacion
  imgCarta.src = `./cartas/${carta}.png`;
  //se le agrega una clase para darle formato
  imgCarta.classList.add("carta");
  //divCartasJugador es el padre en el DOM que contendra la imagen para que se acople al area del jugador en el HTMl
  divCartasJugador.append(imgCarta);
  //aqui es la logica del juego: si al contar las cartas es mayor a 21 puntos
  if (puntosJugador > 21) {
    //mandara un warning de que perdiste
    console.warn("lo siento mucho, perdiste");
    //se va a deshabilitar los sig. botones
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    // se hace llamar a la funcion turnoComputadora con los puntos del jugador
    turnoComputadora(puntosJugador);
  }
  // si los puntos del jugador son igual a 21
  else if (puntosJugador === 21) {
    console.warn("21, Genial!");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});
// esto es lo que hace el boton detener, solo llama a la funcion turnoComputadora y deshabilita los botones
btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});
//btnNuevo limpia todo por el deck, puntosjugador, puntoscomputadora,los elementos del DOM,etc.
btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";

  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
