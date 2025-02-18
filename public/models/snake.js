
const Snake = function( id ){
    const movimentarCabeca = function( celula ){
        if(p.direcao === 'direita'){
            celula.x = celula.x +1
        }else if(p.direcao === 'esquerda'){
            celula.x = celula.x -1 
        }else if(p.direcao === 'baixo'){
            celula.y = celula.y +1      
        }else if(p.direcao ==='cima'){
            celula.y = celula.y -1
        }        
    }
    
    const posicaoAtual = function(celula){
        return {
            x: celula.x,
            y: celula.y
        }
    }
    
    const p = {
        
        id: id,
        calda: [{ x: 3, y:1 }, { x:2, y:1 }],
        direcao: 'direita',
        cor: 'white',
        adicionarCalda: function(){
            this.calda.push({
                x: this.calda[this.calda.length -1].x, 
                y: this.calda[this.calda.length -1].y
            })
        },
        posicaoAtual: function(){
            return posicaoAtual(this.calda[0])
        },

        posicaoAtualCalda: function(){
            let pos = []
            this.calda.forEach((celula)=>{
                pos.push(posicaoAtual(celula))
            })

            return pos
        },

        andar: function(){
            for(let i = this.calda.length -1; i > 0; i--){
                // o segredo é mudar as posiçoes da calda na decrescente
                this.calda[i].x = this.calda[i-1].x
                this.calda[i].y = this.calda[i-1].y
            }
            movimentarCabeca(this.calda[0])            
        },
        pontos: 0
    }
    




    return p
}

export default Snake