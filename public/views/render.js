import { canvas } from "../index.js"
import { gameStatus } from "../models/game.js"


const Render = function(game){
    let frame = 0

    canvas.height = game.alturaTela
    canvas.width = game.larguraTela
    
    const tela = canvas.getContext('2d')
    tela.scale(game.zoom,game.zoom)    
    
    
    const render = function(){
        frame ++

        if (frame >= Math.floor(10 / game.velocidade)) {
            frame = 0
            tela.clearRect(0,0, game.alturaTela, game.larguraTela)
            
            for(const player in game.players){           
                game.players[player].andar()
                game.verificaSeComeuFruta(player)    
                game.verificaSeColidiuParede(player)    
                
                game.players[player].calda.forEach((celula) =>{
                    tela.fillStyle = game.players[player].cor
                    tela.fillRect(celula.x, celula.y, 1, 1)
                })
            }
            
            game.frutas.forEach((fruta) => {
                tela.fillStyle = fruta.cor
                tela.fillRect(fruta.x, fruta.y, 1, 1)            
            })
        }    
            
        requestAnimationFrame(r)
    }    

    const r = function(){
        switch (game.status) {
            case gameStatus.run:
                render()
                break;
            case gameStatus.pause:
                break            
            case gameStatus.wait:
                break            
            case gameStatus.over:
                break            
            default:
                break;
        }        
    }    

    return{
        rodarFrames: r,
    }
}

export default Render