const sectionSelAtaque = document.getElementById('sel-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const btnMascota = document.getElementById('btn-mascota');
const btnReiniciar = document.getElementById('btn-reiniciar')

const sectionSelMascota = document.getElementById('sel-mascota')
// const inputLangostelvis = document.getElementById('langostelvis')
// const inputTucapalma = document.getElementById('tucapalma')
// const inputPydos = document.getElementById('pydos')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')


const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensaje = document.getElementById('resultado')
const ataquesdelJugador = document.getElementById('ataque-jugador')
const ataquesdelEnemigo = document.getElementById('ataque-enemigo')

const contenedorCard = document.getElementById('contenedorCard')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let mokeponesEnemigos = []
let opcionDeMokepones
let ataquesMokeponEnemigo

let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon

let inputZenitsu
let inputTanjiro
let inputInosuke

let btnFuego
let btnAgua
let btnTierra
let botones

let ataqueJugador = []
let ataqueEnemigo = []

let indexAtaqueJugador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0

let vidasJugador = 3
let vidasEnemigo = 3

let jugadorId = null
let enemigoId = null


let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './images/mapa.png'

let alturaPantalla
let anchoPantalla = window.innerWidth - 20

const anchoMaxMapa = 800

if (anchoPantalla > anchoMaxMapa) {
    anchoPantalla = anchoMaxMapa - 20
} else {
    anchoPantalla = 350
}

alturaPantalla = anchoPantalla * 600 / 800

mapa.width = anchoPantalla
mapa.height = alturaPantalla

class Mokepon {
    constructor(nombre, sprite, foto, color, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.sprite = sprite
        this.foto = foto
        this.color = color
        this.vida = vida
        this.ataques = []
        this.ancho = anchoPantalla * 80 / 800
        this.alto = alturaPantalla * 80 / 600
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = sprite
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let zenitsu = new Mokepon('Zenitsu', './images/sprite-zenitsu.png', './images/tj-austria-zenitsu-1k.gif', "#490801", 5)
let tanjiro = new Mokepon('Tanjiro', './images/sprite-tanjiro.png', './images/tj-austria-tanjiro.gif', "#030e20", 5)
let inosuke = new Mokepon('Inosuke', './images/sprite-inosuke.png', './images/tj-austria-inosuke.gif', "#003c41", 5)

const tanjiroAtaques = [{
    nombre: '💧',
    id: 'btn-agua'
}, {
    nombre: '💧',
    id: 'btn-agua'
}, {
    nombre: '💧',
    id: 'btn-agua'
}, {
    nombre: '🌱',
    id: 'btn-tierra'
}, {
    nombre: '🔥',
    id: 'btn-fuego'
}]

const inosukeAtaques = [{
    nombre: '🌱',
    id: 'btn-tierra'
}, {
    nombre: '🌱',
    id: 'btn-tierra'
}, {
    nombre: '🌱',
    id: 'btn-tierra'
}, {
    nombre: '💧',
    id: 'btn-agua'
}, {
    nombre: '🔥',
    id: 'btn-fuego'
}]
const zenitsuAtaques = [{
    nombre: '🔥',
    id: 'btn-fuego'
}, {
    nombre: '🔥',
    id: 'btn-fuego'
}, {
    nombre: '🔥',
    id: 'btn-fuego'
}, {
    nombre: '🌱',
    id: 'btn-tierra'
}, {
    nombre: '💧',
    id: 'btn-agua'
}]

tanjiro.ataques.push(...tanjiroAtaques)
inosuke.ataques.push(...inosukeAtaques)
zenitsu.ataques.push(...zenitsuAtaques)

mokepones.push(zenitsu, tanjiro, inosuke)


window.addEventListener('load', () => {


    sectionSelAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'

    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
       <input type="radio" name="mascota" id=${mokepon.nombre} />
       <label class="card-mokepon" style="background-color: ${mokepon.color};" for=${mokepon.nombre}>
           <p>${mokepon.nombre}</p>
           <img src=${mokepon.foto} alt=${mokepon.nombre}>
       </label>
       `
        contenedorCard.innerHTML += opcionDeMokepones

        inputZenitsu = document.getElementById('Zenitsu')
        inputTanjiro = document.getElementById('Tanjiro')
        inputInosuke = document.getElementById('Inosuke')
    })

    btnMascota.addEventListener('click', selMascota);

    btnReiniciar.addEventListener('click', reiniciarJuego)

    joinGame()
})

function joinGame() {
    fetch("http://192.168.1.74:8080/join")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        jugadorId = respuesta
                    })
            }
        })
}


function selMascota() {

    sectionVerMapa.style.display = 'flex'

    sectionSelMascota.style.display = 'none'

    if (inputZenitsu.checked) {
        spanMascotaJugador.innerHTML = inputZenitsu.id
        mascotaJugador = inputZenitsu.id
    } else if (inputTanjiro.checked) {
        spanMascotaJugador.innerHTML = inputTanjiro.id
        mascotaJugador = inputTanjiro.id
    } else if (inputInosuke.checked) {
        spanMascotaJugador.innerHTML = inputInosuke.id
        mascotaJugador = inputInosuke.id
    } // else if (inputLangostelvis.checked) {
    //     spanMascotaJugador.innerHTML = 'Langostelvis'
    // } else if (inputTucapalma.checked) {
    //     spanMascotaJugador.innerHTML = 'Tucapalma'
    // } else if (inputPydos.checked) {
    //     spanMascotaJugador.innerHTML = 'Pydos'
    // }
    else {
        alert("Selecciona un personaje")
        reiniciarJuego()
    }

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador) {
    fetch("http://192.168.1.74:8080/mokepon/" + jugadorId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques

    for (let i = 0; i < mokepones.length; i++) {

        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }

    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="btn-ataque bAtaques">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon
    })

    btnFuego = document.getElementById('btn-fuego')
    btnAgua = document.getElementById('btn-agua')
    btnTierra = document.getElementById('btn-tierra')

    botones = document.querySelectorAll('.bAtaques')


}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#ccc'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#ccc'
                boton.disabled = true
            } else if (e.target.textContent === '🌱') {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#ccc'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5 ) {
                enviarAtaques()
            }

        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.74:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.74:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function selMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques

    secuenciaAtaque()

}


function ataqueAleatorioEnemigo() {
    let numAtaqueEnemigo = aleatorio(0, ataquesMokeponEnemigo.length - 1)

    if (numAtaqueEnemigo == 0 || numAtaqueEnemigo == 1) {
        ataqueEnemigo.push('FUEGO')
    } else if (numAtaqueEnemigo == 3 || numAtaqueEnemigo == 4) {
        ataqueEnemigo.push('AGUA')

    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexOponentes(i, i)
            crearMensaje('EMPATE')

        } else if (ataqueJugador[i] === 'FUEGO' && ataqueEnemigo[i] === 'TIERRA' ||
            ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO' ||
            ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA') {

            indexOponentes(i, i)
            crearMensaje('GANASTE')
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexOponentes(i, i)
            crearMensaje('PERDISTE')
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
    }

    //REVISAR VIDAS
    revisarVidas()
}


function revisarVidas() {
    if (victoriasJugador == victoriasEnemigo) {
        crearMensaje('EMPATE')
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensaje('GANASTE')
    } else {
        crearMensaje('PERDISTE')
    }
}

function crearMensaje(resultado) {
    let nAtaqueJugador = document.createElement('p')
    let nAtaqueEnemigo = document.createElement('p')

    sectionMensaje.innerHTML = resultado
    nAtaqueJugador.innerHTML = indexAtaqueJugador
    nAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesdelJugador.appendChild(nAtaqueJugador)
    ataquesdelEnemigo.appendChild(nAtaqueEnemigo)
    sectionReiniciar.style.display = 'block'
}


function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY


    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function (mokepon) {
        if (mokepon != undefined) {
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
    })
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.1.74:8080/mokepon/${jugadorId}/posicion`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({
                        enemigos
                    }) {
                        let mokeponEnemigo = null
                        mokeponesEnemigos = enemigos.map(function (enemigo) {
                            if (enemigo.mokepon != undefined) {

                            const mokeponNombre = enemigo.mokepon.nombre || ""

                                if (mokeponNombre == "Zenitsu") {
                                    mokeponEnemigo = new Mokepon('Zenitsu', './images/sprite-zenitsu.png', './images/tj-austria-zenitsu-1k.gif', "#490801", 5,enemigo.id)
                                } else if (mokeponNombre == "Tanjiro") {
                                    mokeponEnemigo = new Mokepon('Tanjiro', './images/sprite-tanjiro.png', './images/tj-austria-tanjiro.gif', "#030e20", 5,enemigo.id)
                                } else if (mokeponNombre == "Inosuke") {
                                    mokeponEnemigo = new Mokepon('Inosuke', './images/sprite-inosuke.png', './images/tj-austria-inosuke.gif', "#003c41", 5,enemigo.id)
                                }
                                mokeponEnemigo.x = enemigo.x
                                mokeponEnemigo.y = enemigo.y
    
                                return mokeponEnemigo
                            }

                        })
                    })
            }
        })
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5

}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}

function detenerMovimiento() {

    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function PresionoTecla(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moverArriba()
            break;
        case "ArrowDown":
        case "s":
            moverAbajo()
            break;
        case "ArrowLeft":
        case "a":
            moverIzquierda()
            break;
        case "ArrowRight":
        case "d":
            moverDerecha()
            break;
        default:
            break;
    }
}

function iniciarMapa() {
    mascotaJugadorObjeto = obtenerMascotas(mascotaJugador)

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', PresionoTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerMascotas() {
    for (let i = 0; i < mokepones.length; i++) {

        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }

    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const IzquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const IzquierdaMascota = mascotaJugadorObjeto.x


    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < IzquierdaEnemigo ||
        IzquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId =enemigo.id
    sectionSelAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    selMascotaEnemigo(enemigo)
}