import Inputs from '../controlers/inputs.js'
import { pegarIdPlayer } from '../index.js'
import Snake from './snake.js'
import Fruit from './fruit.js'
import { atualizarPontos, atualizarHiScore, mostrarIdPlayer, mostrarGameOver, mostrarHiScore,
    atualizarVelocidade } from '../index.js'

export const gameStatus = Object.freeze({
    wait: 0,
    run: 1,
    over: 2,
    pause: 3
})

export const gameMode = Object.freeze({
    parede: 0,
    teletransporte: 1
})

let regras = {}
let motor1
let inputs

const Game = function(){
    return {
        idCurrentPlayer: 'snake1',
        status: gameStatus.wait,
        alturaTela: 0,
        larguraTela: 0,
        limiteAltura: function(){
             return Math.floor(this.alturaTela / this.zoom) -1
        },

        limiteLargura: function(){
            return Math.floor(this.larguraTela / this.zoom) -1
        },

        zoom: 25,
        players: {},
        frutas: [],
        hiScore: 0,
        carregarRegras: function(pRegras){
            regras = pRegras
        },
        carregarVisual: function(pMotor1){
            motor1 = pMotor1
        },

        addVelocidade: function(){
            this.players[this.idCurrentPlayer].velocidade < 16 ? this.players[this.idCurrentPlayer].velocidade += 1 : this.players[this.idCurrentPlayer].velocidade = 16
            atualizarVelocidade()
        },
        dimVelocidade: function(){
            this.players[this.idCurrentPlayer].velocidade > 1 ? this.players[this.idCurrentPlayer].velocidade -= 1 : this.players[this.idCurrentPlayer].velocidade = 1
            atualizarVelocidade()
        },
        
        getVelocidade: function(){
            return this.players[this.idCurrentPlayer].velocidade
        },

        setVelocidade: function(novaVelocidade = 1){
            this.players[this.idCurrentPlayer].velocidade = novaVelocidade
            atualizarVelocidade()
        },

        iniciar: async function(){
            if(this.status == gameStatus.run || this.status == gameStatus.pause) return
            this.status = gameStatus.run
            this.idCurrentPlayer = await pegarIdPlayer()
            this.players = []
            this.players[this.idCurrentPlayer] = Snake(this.idCurrentPlayer)            
            
            inputs = Inputs(this)
            inputs.ativarTeclas(document)            
            
            this.frutas = []
            this.frutas.push(Fruit(this))
            
            atualizarPontos(0)
            atualizarVelocidade()
            atualizarHiScore(this.hiScore)
            mostrarIdPlayer(this.idCurrentPlayer)
            mostrarGameOver('')
            mostrarHiScore('')
            motor1.rodarFrames()

        },
    
        pausar: function(){
            if(this.status === gameStatus.run){
                this.status = gameStatus.pause
            }else if(this.status === gameStatus.pause){
                this.status = gameStatus.run
                motor1.rodarFrames()
            }
        },
    
        verificaSeComeuFruta: function(player){
            let frutaComida = -1
            this.frutas.forEach(( fruta, indice ) => {
                if(this.players[player].calda[0].x === fruta.x && this.players[player].calda[0].y === fruta.y){
                    frutaComida = indice
                }
            })
            if ( frutaComida > -1 ){
                regras.comerFruta(player, frutaComida)
            }        
            return frutaComida
        },
        verificaSeColidiuParede: function(player){
            let colidiu = false
            if(
                this.players[player].calda[0].x > this.limiteLargura() 
              | this.players[player].calda[0].x < 0
              | this.players[player].calda[0].y > this.limiteAltura()
              | this.players[player].calda[0].y < 0
            ){
                colidiu = true
            }
            if (colidiu) regras.colisaoParede(player)
            return colidiu
        },

        verificaSeColidiuCalda: function(idPlayer){            
            let colidiu = false
            for(let player in this.players){
                this.players[player].calda.forEach((celula, indice)=>{
                    if( indice === 0 && player === idPlayer){
                        return
                    }

                    if(                        
                        this.players[idPlayer].calda[0].x === celula.x 
                        && this.players[player].calda[0].y === celula.y
                    ){
                        colidiu = true
                    }
                })
            }
            if (colidiu) regras.colisaoCalda(idPlayer)
            return colidiu
        },

        verificarPassos: function(idPlayer){
            regras.passos(this.players[idPlayer])
        },

        verificaPontuacao: function(idPlayer){
            regras.pontuacao(this.players[idPlayer])
        },

        modo: gameMode,
        logs: true
    }
}

export default Game


