import Rules from "./controlers/rules.js"
import Render from "./views/render.js"
import Game, { gameMode } from "./models/game.js"
import Inputs from './controlers/inputs.js'


export const canvas = document.getElementById('tela')
const hudPlayer = document.getElementById('idPlayer')
const hudVelo = document.getElementById('velo')
export const hudScore = document.getElementById('score')
export const hudHiScore = document.getElementById('hiScore')
const msgGameOver = document.getElementById('msgGameOver')
const msgHiScore = document.getElementById('msgHiScore')

const btnIniciar = document.getElementById('btnIniciar')
btnIniciar.addEventListener('click', () => {
    game.iniciar()
})

const btnPausa = document.getElementById('btnPausa')
btnPausa.addEventListener('click', () => {
    game.pausar()
})

export const atualizarPontos = function(pontos = 0){
    hudScore.innerHTML = pontos.toString().padStart(4,'0')
}

export const atualizarHiScore = function(){
    hudHiScore.innerHTML = game.hiScore.toString().padStart(4,'0')
}

export const mostrarIdPlayer = function(idPlayer = 'Player'){
    hudPlayer.innerHTML = idPlayer.slice(0,8)
}

export const mostrarGameOver = function(msg){
    msgGameOver.innerHTML = msg
}

export const mostrarHiScore = function(msg){
    msgHiScore.innerHTML = msg
}

export const pegarIdPlayer = function(){
    const nome = prompt('Digite o seu nome')
    return nome
}

export const atualizarVelocidade = function(){
    hudVelo.innerHTML = game.getVelocidade().toString()    
}

const game = Game()
game.modo = gameMode.teletransporte
const regras = Rules(game)
game.carregarRegras(regras)
const motor1 = Render(game)
game.carregarVisual(motor1)
const inputs = Inputs(game)
inputs.ativarTeclas(document)