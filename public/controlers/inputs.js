
const Inputs = function(game){
    
    function setDirecao(tecla){
        switch (tecla) {
            case 'ArrowUp':
                game.players[game.idCurrentPlayer].direcao = 'cima'            
                break;
            case 'ArrowDown':
                game.players[game.idCurrentPlayer].direcao = 'baixo'                                
                break;
            case 'ArrowLeft':
                game.players[game.idCurrentPlayer].direcao = 'esquerda'                                 
                break;
            case 'ArrowRight':
                game.players[game.idCurrentPlayer].direcao = 'direita'                          
                break;
        
            default:
                break;
        }
    }

    return {
        ativarTeclas: function(element ){
            element.addEventListener('keydown',(event) => {
                setDirecao(event.key)
                const player = game.idCurrentPlayer
                game.players[player].andar()
                game.verificaSeComeuFruta(player)    
                game.verificaSeColidiuParede(player)    
                game.verificaSeColidiuCalda(player)
            })
        }
    }
}

export default Inputs