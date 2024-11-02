import { useState } from "react";
import Square from "./Square";
import { FaX } from "react-icons/fa6";
import { PiNumberCircleZeroBold } from "react-icons/pi";

const Tablero = () => {
  // Tablero  Un array de 9 elementos inicializado a null que representa las posiciones del tablero de juego.

  const [Tablero, setTablero] = useState(Array(9).fill(null));
  // turno  Un array que contiene los jugadores "X" y "O".
  const [turno, setTurno] = useState({
    X: <FaX className="size-6 text-blue-300" />,
    O: <PiNumberCircleZeroBold className="size-7 text-red-400" />,
  });
  // Almacena el ganador del juego si hay uno.
  const [ganador, setGanador] = useState(null);
  //Almacena si hay un empate.
  const [empate, setEmpate] = useState(null);
  // Almacena el jugador que tiene el turno actual, inicializado a turno.X que es "X"
  const [jugador, setJugador] = useState(turno.X);
  const [jugadorO, setJugadorO] = useState(0);
  const [jugadorX, setJugadorX] = useState(0);

  const combosGanadores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resulatado = (resultadoGanador) => {
    for (const combo of combosGanadores) {
      const [a, b, c] = combo;
      if (
        resultadoGanador[a] &&
        resultadoGanador[a] === resultadoGanador[b] &&
        resultadoGanador[a] === resultadoGanador[c]
      ) {
        return resultadoGanador[a];
      }
    }
  };
  const empezar = () => {
    setTablero(Array(9).fill(null));
    setGanador(null);
    setEmpate(null);
    setJugador(turno.X);
  };
  const nuevoContador = () => {
    setJugadorO(0);
    setJugadorX(0);
  };

  const actualizar = (index) => {
    // si ya hay algo en el tablero  no se puede actualizar el tablero en esa posicion
    if (Tablero[index] || ganador) return;
    // crear una copia de lo que hay en tablero
    const nuevoTablero = [...Tablero];
    // Actualiza la posición en el tablero con el jugador actual.
    nuevoTablero[index] = jugador;
    //Actualiza el estado del tablero con el nuevo tablero.
    setTablero(nuevoTablero);

    jugador === turno.X ? setJugador(turno.O) : setJugador(turno.X);
    const nuevoganador = resulatado(nuevoTablero);
    if (nuevoganador) {
      setGanador(nuevoganador);
      nuevoganador === turno.X
        ? setJugadorX(jugadorX + 1)
        : setJugadorO(jugadorO + 1);
    } else {
      const empate = nuevoTablero.every((valor) => valor !== null);
      if (empate) {
        setEmpate("Empate");
      }
    }
  };
  const reset =
    empate || ganador ? (
      <button
        type="submit"
        onClick={() => empezar()}
        className="mt-2  w-20 h-10 items-center text-white justify-center rounded-lg flex bg-blue-600"
      >
        nuevo
      </button>
    ) : (
      ""
    );

  return (
    <>
      <main className="w-full flex justify-center items-center flex-col">
        <h1 className="font-bold   flex justify-center  mt-44">TIC TAC TOE</h1>
        <h1 className="pt-3">Contador </h1>
        <div className="mt-3 flex flex-row gap-4">
          <span className="flex flex-row   items-center gap-1">
            <FaX className="size-6 text-blue-300" />=
            <p className="font-sans text-3xl ">{jugadorX}</p>
          </span>
          <span className="flex flex-row   items-center gap-1">
            <PiNumberCircleZeroBold className="size-7 text-red-400" />=
            <p className="font-sans text-3xl ">{jugadorO}</p>
          </span>
          <button
            className="w-16 h-10 items-center text-white justify-center rounded-lg flex bg-red-400 "
            onClick={() => nuevoContador()}
          >
            Nuevo
          </button>
        </div>
        <div className=" grid p-6  grid-cols-3 gap-4 justify-center items-center">
          {Tablero.map((valor, index) => {
            const handlerClick = () => {
              actualizar(index);
            };
            return (
              <Square key={index} index={index} actualizar={handlerClick}>
                {Tablero[index]}
              </Square>
            );
          })}
          {jugador && <div className="">Turno: {jugador}</div>}
        </div>

        <div className="flex items-center flex-col">
          {ganador && (
            <div className="flex flex-row gap-2">Ganador: {ganador}</div>
          )}
          {empate && <div className=""> {empate}</div>}
          {reset}
        </div>
      </main>
    </>
  );
};
export default Tablero;
