

const Inputs = function(player){
    
    function setDirecao(tecla){
        switch (tecla) {
            case 'ArrowUp':
                player.direcao = 'cima'            
                break;
            case 'ArrowDown':
                player.direcao = 'baixo'                                
                break;
            case 'ArrowLeft':
                player.direcao = 'esquerda'                                 
                break;
            case 'ArrowRight':
                player.direcao = 'direita'                          
                break;
        
            default:
                break;
        }
    }

    return {
        ativarTeclas: function(element){
            element.addEventListener('keydown',(event) => {
                setDirecao(event.key)
            })
        }
    }
}

export default Inputs