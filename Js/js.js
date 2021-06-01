// JavaScript Document
// Autor: Bernardo Castán Martínez
// Declaración de variables del juego
let jugador = null;
let color = "";
let MRojo = "";
let MAzul = "";
let ronda = 0;
let tresEnRaya = false;
let jugadas = new Array();
let hover="";

// Declaración de los elementos de juego que hay en el HTML:
let casillasTablero = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
let bolasJugador1 = [ 0, 1, 2];
let bolasJugador2 = [ 0, 1, 2];

// Declaro que hay un tablero
const Tablero = document.getElementById('Tablero');
let hayTablero = false;
// Declaramos las cajas de las bolas de los jugadores
const CajaP1 = document.getElementById('CajaP1');
const CajaP2 = document.getElementById('CajaP2');

document.getElementById("status").innerHTML="Bienvenid@s a 3 en Raya";
//


// Función principal;
function nuevaPartida(){
	document.getElementById("nuevaPartida").disabled = true;
	document.getElementById("ganador").innerHTML="Partida en curso";
	pintabolasInicio();
	jugador = true;
	avisaTurnoyRonda();	
}

// Cambiamos de turno de jugador y habilitamos o deshabilitamos bolas
function cambiaTurnoJugador(){
	let j = "";
	let jc = "";
	if (jugador){
		// Le toca a jugador 2
		jugador = false;
		j="A-";
		jc="R-";
		
	} else {
		// Le toca a jugador 1
		jugador = true;
		j="R-";
		jc="A-";
	}
	
	for (i=0; i<3; i++) {
		
		// Habilitamos y Deshabilitamos las bolas correspondientes
		document.getElementById(j+i).draggable=true;
		document.getElementById(jc+i).draggable=false;
	}
	ronda++;
}

function avisaTurnoyRonda(){
	var mensaje="";
	
		if (jugador){ color = "Rojo"; }else{ color = "Azul"; }

		if (ronda < 7){
			mensaje = " Turno Jugador " + color + "! <br /> Haga click en una de las bolas su cajita y arrástrela al tablero en alguna posición libre.\n (Ronda número " + (ronda+1) + " de 20)"  ;
		}else{
			mensaje = " Turno Jugador " + color + "! <br /> (Ronda número " + (ronda+1) + " de 20)" ;
		}
	
	document.getElementById("status").innerHTML=mensaje;
}


function compruebaArray(){
	if (jugador){ colorbola = "R"; }else{ colorbola = "A"; }
	// Posiciones Ganadoras Horizontales:
	if ( (casillasTablero[0]==colorbola) && (casillasTablero[1]==colorbola) && (casillasTablero[2]==colorbola) ) {tresEnRaya = true;}
	if ( (casillasTablero[3]==colorbola) && (casillasTablero[4]==colorbola) && (casillasTablero[5]==colorbola) ) {tresEnRaya = true;}
	if ( (casillasTablero[6]==colorbola) && (casillasTablero[7]==colorbola) && (casillasTablero[8]==colorbola) ) {tresEnRaya = true;}
	
	// Posiciones Ganadoras Verticales:
	if ( (casillasTablero[0]==colorbola) && (casillasTablero[3]==colorbola) && (casillasTablero[6]==colorbola) ) {tresEnRaya = true;}
	if ( (casillasTablero[1]==colorbola) && (casillasTablero[4]==colorbola) && (casillasTablero[7]==colorbola) ) {tresEnRaya = true;}
	if ( (casillasTablero[2]==colorbola) && (casillasTablero[5]==colorbola) && (casillasTablero[8]==colorbola) ) {tresEnRaya = true;}
	
	// Posiciones Ganadoras Diagonales:
	if ( (casillasTablero[0]==colorbola) && (casillasTablero[4]==colorbola) && (casillasTablero[8]==colorbola) ) {tresEnRaya = true;}
	if ( (casillasTablero[6]==colorbola) && (casillasTablero[4]==colorbola) && (casillasTablero[2]==colorbola) ) {tresEnRaya = true;}

	var mensaje ="";
		if (tresEnRaya == true){
			if (jugador){ 
				MRojo++;
			}else{ 
				MAzul++; 
			}
			
			if (MRojo>MAzul){ mensaje="Gana la ronda el jugador Rojo!" }
			if (MRojo<MAzul){ mensaje="Gana la ronda el jugador Azul!" }
			
				let r = "R-";
				let a = "A-";
				// Deshabilitamos las bolas correspondientes
			
				for (i=0; i<3; i++) {
					document.getElementById(r+i).draggable=false;
					document.getElementById(a+i).draggable=false;
				}
			
		}

		document.getElementById("status").innerHTML="3 en Raya !!!";	
		document.getElementById("ganador").innerHTML=mensaje;
		document.getElementById("nuevaPartida").disabled = true;
}

function pintabolasInicio(){
	let i = 0;
	
	for (i=0; i<3; i++) {
		const img = document.createElement('img');
        img.className = 'bolaJ1';
        img.id = "R-" + bolasJugador1[i] ;
        img.draggable = true;
        img.src = "Imgs/bola1.png";
		indice = "CP1-" + i;
        document.getElementById(indice).appendChild(img);
    }
	
	for (i=0; i<3; i++){
		const img = document.createElement('img');
        img.className = 'bolaJ2';
        img.id = "A-" + bolasJugador2[i];
        img.draggable = false;
        img.src = "Imgs/bola2.png";
		indice = "CP2-" + i;
        document.getElementById(indice).appendChild(img);
	}
	
	/* Para pintar el tablero: */
	if (!hayTablero){
	for (let i = 0; i < 9; i++) {
            const div = document.createElement('div');
            div.className = 'casillaTablero';
            div.dataset.id = "T" + i;
            Tablero.appendChild(div);
        }
		hayTablero = true;
	}
	
	setearVariables();
}

function quitabolasFinaliza(){
	location.reload();
	setearVariables();
	document.getElementById("nuevaPartida").disabled = false;
}

function setearVariables(){
	
	jugador = null;
	color = "";
	ronda = 0;
	tresEnRaya = false;
	
	casillasTablero = new Array (0, 0, 0, 0, 0, 0, 0, 0, 0);
	
	document.getElementById("status").innerHTML="Juego Seteado a cero";
}

function resultados(){
	
	if (tresEnRaya) { 
		document.getElementById("ganador").innerHTML="Gana el Jugador " + color + " !! ";
	}
}

// Funciones Asociadas a los eventos:

		CajaP1.addEventListener('dragstart', e => { e.dataTransfer.setData('id', e.target.id); });

		CajaP2.addEventListener('dragstart', e => { e.dataTransfer.setData('id', e.target.id); });

		Tablero.addEventListener('dragstart', e => { e.dataTransfer.setData('id', e.target.id); });

		Tablero.addEventListener('dragover', e => { 
			e.preventDefault(); 
			if (jugador){ hover ="hoverr"; }else{ hover ="hovera"; }
			e.target.classList.add(hover); });
		
		Tablero.addEventListener('dragleave', e => { 
			if (jugador){ hover ="hoverr"; }else{ hover ="hovera"; }
			e.target.classList.remove(hover); });

		Tablero.addEventListener('drop', e => {
			
            e.target.classList.remove(hover);
			//id de img bola
			const id = e.dataTransfer.getData('id');
			//id de la casilla del tablero
			const id2 = e.target.dataset.id;
			
			// Si aún quedan rondas! ...
			if(ronda<=19){
				try{
					var casilla = id2.charAt(id2.length-1);
				}
				catch (error){ }

						// Comprobar si la casilla está libre
						if (casillasTablero[casilla]==0){

							// Si lo está, asignamos el color de la bola en el array
							var colorbola = "";
							if (jugador){ colorbola = "R"; }else{ colorbola = "A"; }
							casillasTablero[casilla] = colorbola;

							// Liberamos la casilla de procedencia a partir de la ronda 6:
							if (ronda>5){
								for (var i = jugadas.length-1; i>=0 ; i--){
									var cadenaBola = jugadas[i].substr(0,3);
									if (cadenaBola==id){
										var cadenaCasilla = jugadas[i].substr(-1);
										casillasTablero[cadenaCasilla] = 0;
										break ;
									}
								}
							}

							// Almacenamos la jugada
							jugadas[ronda]= id + ":" + id2;
		
							// Permitimos el drop:			
							e.target.appendChild(document.getElementById(id));

							// Comprobamos si hay tres en raya:
							compruebaArray();

							if (tresEnRaya == false){
								cambiaTurnoJugador();
								avisaTurnoyRonda();

								// Bloqueamos las bolas del tablero en las 6 primeras rondas
								if (ronda<6){

									for (var i = 0; i< jugadas.length; i++){
										var cadenaBola = jugadas[i].substr(0,3);
										document.getElementById(cadenaBola).draggable=false;

									}

								}
							}
						}
			}else{
				document.getElementById("status").innerHTML="Límite de turnos alcanzado !!!";	
				document.getElementById("ganador").innerHTML="La ronda acaba en Empate.";
				document.getElementById("nuevaPartida").disabled = true;
			}
        });
