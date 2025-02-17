import Snake from '../models/snake.js'
import Inputs from '../controlers/inputs.js'
import Fruit from "../models/fruit.js"
import { gameMode, gameStatus } from "../models/game.js"
import { atualizarPontos, mostrarGameOver, mostrarHiScore, atualizarHiScore, 
    pegarIdPlayer, mostrarIdPlayer } from "../index.js"

const Rules = function(game){
    const p = {
        comerFruta: function(idPlayer, idFruta){
            game?.players[idPlayer]?.adicionarCalda()
            game.players[idPlayer].pontos += 1
            game?.frutas?.splice(idFruta, 1)
            game?.frutas?.push(Fruit(game))
            atualizarPontos(game.players[idPlayer].pontos)

            console.log(`Rules: ${idPlayer} - pontuação: ${game.players[idPlayer].pontos}`)
        },
        
        colisaoParede: function(idPlayer){
            switch (game.modo) {
                case gameMode.parede:
                    console.log(`Rules: ${idPlayer} colidiu com a parede`)
                    game.status = gameStatus.over
                    mostrarGameOver('GAME OVER')
                    if(game.hiScore < game.players[idPlayer].pontos){
                        game.hiScore = game.players[idPlayer].pontos
                        mostrarHiScore(`NEW HI-SCORE ${game.hiScore}`)
                    }
                    console.log(`rules: score: ${game.players[idPlayer].pontos} | hi-score: ${game.hiScore}`)
                    break;
                case gameMode.teletransporte:
                    console.log(`Rules: ${idPlayer} se teletransportou`)
                break;
            
                default:
                    console.log(`Rules: ${idPlayer} se teletransportou`)
                    break;
            }
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