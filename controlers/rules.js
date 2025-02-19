import Fruit from "../models/fruit.js"
import { gameMode, gameStatus } from "../models/game.js"
import { atualizarPontos, mostrarGameOver, mostrarHiScore, atualizarVelocidade } from "../index.js"

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
            game.players[idPlayer].pontos += game?.frutas[idFruta].pontos
            atualizarPontos(game.players[idPlayer].pontos)
            game?.frutas?.splice(idFruta, 1)
            const novaFruta = Fruit(game)
            game?.frutas?.push(novaFruta)

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
        passos: function(player){

        },
        pontuacao: function(player){
            if(player = game.players[game.idCurrentPlayer]){
                game.setVelocidade(Math.floor(player.pontos / 50) +1 )
            }
        }
    }

    return p
}

export default Rules