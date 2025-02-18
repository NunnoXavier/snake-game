import { canvas } from "../index.js"
import { gameStatus } from "../models/game.js"


export const deviceDimension = { 
    heigth: window.innerHeight,
    width: window.innerWidth
}


const Render = function(game){
    let frame = 0
    const tela = canvas.getContext('2d')
    
    const definirTamanhoDaTela = function(){
        game.alturaTela = deviceDimension.heigth >=  900? 700 : deviceDimension.heigth - Math.floor(deviceDimension.heigth * 0.25)
        game.larguraTela = deviceDimension.width >= 1024 ? 900 : deviceDimension.width - Math.floor(deviceDimension.width * 0.1)
        canvas.height = game.alturaTela
        canvas.width = game.larguraTela
        game.logs && console.log(deviceDimension)
    }
    
    definirTamanhoDaTela()
    tela.scale(game.zoom,game.zoom)    
    const render = function(){
        frame ++

        
        if (frame >= Math.floor(60 / game.velocidade)) {
            tela.clearRect(0,0, game.alturaTela, game.larguraTela)
            
            for(const player in game.players){           
                game.players[player].andar()
                game.verificaSeComeuFruta(player)    
                game.verificaSeColidiuParede(player)    
                game.verificaSeColidiuCalda(player)  
                
                game.players[player].calda.forEach((celula) =>{
                    tela.fillStyle = game.players[player].cor
                    tela.fillRect(celula.x, celula.y, 1, 1)
                })

                game.logs && console.log(`render: player ${ player }`, game.players[player].calda[0])
            }
            
            game.frutas.forEach((fruta) => {
                tela.fillStyle = fruta.cor
                tela.fillRect(fruta.x, fruta.y, 1, 1)            
            })
            frame = 0
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
        rodarFrames: r
    }
}

export default Render