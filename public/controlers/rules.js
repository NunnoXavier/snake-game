import Snake from '../models/snake.js'
import Inputs from '../controlers/inputs.js'
import Fruit from "../models/fruit.js"
import { gameMode, gameStatus } from "../models/game.js"
import { atualizarPontos, mostrarGameOver, mostrarHiScore, atualizarHiScore, 
    pegarIdPlayer, mostrarIdPlayer } from "../index.js"

const Rules = function(game){
    
    const teletransportar = function(p){
        const celula = p.calda[0]
        if(p.direcao === 'direita'){
            celula.x = 0
        }else if(p.direcao === 'esquerda'){
            celula.x = game.limiteLargura()
        }else if(p.direcao === 'baixo'){
            celula.y = 0      
        }else if(p.direcao ==='cima'){
            celula.y = game.limiteAltura()
        }        
    }
    
    const p = {
        comerFruta: function(idPlayer, idFruta){
            game?.players[idPlayer]?.adicionarCalda()
            game.players[idPlayer].pontos += 1
            game?.frutas?.splice(idFruta, 1)
            game?.frutas?.push(Fruit(game))
            atualizarPontos(game.players[idPlayer].pontos)

            game.logs && console.log(`Rules: ${idPlayer} - pontuação: ${game.players[idPlayer].pontos}`)
        },
        
        colisaoParede: function(idPlayer){
            switch (game.modo) {
                case gameMode.parede:
                    game.logs && console.log(`Rules: ${idPlayer} colidiu com a parede`)
                    game.status = gameStatus.over
                    mostrarGameOver('GAME OVER')
                    if(game.hiScore < game.players[idPlayer].pontos){
                        game.hiScore = game.players[idPlayer].pontos
                        mostrarHiScore(`NEW HI-SCORE ${game.hiScore}`)
                    }
                    game.logs && console.log(`rules: score: ${game.players[idPlayer].pontos} | hi-score: ${game.hiScore}`)
                    break;
                case gameMode.teletransporte:
                    game.logs && console.log(`Rules: ${idPlayer} se teletransportou`)
                    teletransportar(game.players[idPlayer])
                break;
            
                default:
                    game.logs && console.log(`Rules: ${idPlayer} se teletransportou`)
                    break;
            }
        },
        colisaoCalda: function(idPlayer){
            game.logs && console.log(`Rules: ${idPlayer} colidiu com a calda`)
            game.status = gameStatus.over
            mostrarGameOver('GAME OVER')
            if(game.hiScore < game.players[idPlayer].pontos){
                game.hiScore = game.players[idPlayer].pontos
                mostrarHiScore(`NEW HI-SCORE ${game.hiScore}`)
            }
            game.logs && console.log(`rules: score: ${game.players[idPlayer].pontos} | hi-score: ${game.hiScore}`)
        },

        inicio: async function(){
            const idPlayer = await pegarIdPlayer()
            game.players = []
            game.players[idPlayer] = Snake(idPlayer)
            const inputs = Inputs(game.players[idPlayer])
            inputs.ativarTeclas(document)            
            
            game.frutas = []
            game.frutas.push(Fruit(game))
            
            atualizarPontos(0)
            atualizarHiScore(game.hiScore)
            mostrarIdPlayer(idPlayer)
            mostrarGameOver('')
            mostrarHiScore('')

        }
    }

    return p
}

export default Rules