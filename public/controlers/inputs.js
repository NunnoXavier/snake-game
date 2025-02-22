
const Inputs = function(game){

    function callback(event){
        if (setDirecao(event.key)){
            game.players[game.idCurrentPlayer].andar()
        }
        const player = game.idCurrentPlayer
        game.verificaSeComeuFruta(player)    
        game.verificaSeColidiuParede(player)    
        game.verificaSeColidiuCalda(player)
    }
    
    function setDirecao(tecla){
        let result = false
        const plr = game.players[game.idCurrentPlayer]
        switch (tecla) {
            case 'ArrowUp':
                if(plr.direcao != 'baixo'){
                    plr.direcao = 'cima'
                    result = true
                }
                break
            case 'ArrowDown':
                if(plr.direcao != 'cima'){
                    plr.direcao = 'baixo'
                    result = true
                }
                break
            case 'ArrowLeft':
                if(plr.direcao != 'direita'){
                    plr.direcao = 'esquerda'
                    result = true
                }
                break
            case 'ArrowRight':
                if(plr.direcao != 'esquerda'){
                    plr.direcao = 'direita'
                    result = true
                }
                break      
            default:
                break
        }
        return result
    }
    
    return {
        ativarTeclas: function(element ){
            element.removeEventListener('keydown', callback)
            element.addEventListener('keydown', callback)
        }
    }
}

export default Inputs