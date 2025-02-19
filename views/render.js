import { canvas } from "../index.js"
import { gameStatus } from "../models/game.js"

export const deviceDimension = { 
    heigth: window.innerHeight,
    width: window.innerWidth
}

let piscar = 0

const brilho = function(){
    if(piscar >= 9){
        return 'gold'
    }
    else if(piscar >= 3){
        return 'red'
    }
    else if(piscar >= 1){
        return 'black'
    }
}

const Render = function(game){
    let frame = 16
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
        piscar === 9? piscar = 0 : piscar ++
        tela.clearRect(0,0, game.alturaTela, game.larguraTela)
        
        for(const player in game.players){           
            
            if( frame === game.players[player].velocidade ){
                game.players[player].andar()
                game.verificarPassos(player)
                frame = 16
            }else{
                frame <= 1? frame = 16 : frame --
                
            }
            
            game.verificaSeComeuFruta(player)    
            game.verificaSeColidiuParede(player)    
            game.verificaSeColidiuCalda(player)
            game.verificaPontuacao(player)

            game.players[player].calda.forEach((celula) =>{
                //tela.fillStyle = game.players[player].cor
                tela.fillStyle = game.players[player].cor === 'brilho'? brilho() : game.players[player].cor
                tela.fillRect(celula.x, celula.y, 1, 1)
            })

            game.logs && console.log('frames')
        }
        
        game.frutas.forEach((fruta) => {        
            tela.fillStyle = fruta.cor === 'brilho'? brilho() : fruta.cor
            tela.fillRect(fruta.x, fruta.y, 1, 1)
        })
        
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