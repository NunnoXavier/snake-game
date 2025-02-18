export const gameStatus = Object.freeze({
    wait: 0,
    run: 1,
    over: 2,
    pause: 3
})

export const gameMode = Object.freeze({
    parede: 0,
    teletransporte: 1
})

let regras = {}
let motor1

const Game = function(){
    return {
        status: gameStatus.wait,
        alturaTela: 0,
        larguraTela: 0,
        limiteAltura: function(){
             return Math.floor(this.alturaTela / this.zoom) -1
        },

        limiteLargura: function(){
            return Math.floor(this.larguraTela / this.zoom) -1
        },

        zoom: 25,
        velocidade: 1,
        players: {},
        frutas: [],
        hiScore: 0,
        carregarRegras: function(pRegras){
            regras = pRegras
        },
        carregarVisual: function(pMotor1){
            motor1 = pMotor1
        },

        addVelocidade: function(){
            this.velocidade < 16 ? this.velocidade += 1 : this.velocidade = 16
        },
        dimVelocidade: function(){
            this.velocidade > 1 ? this.velocidade -= 1 : this.velocidade = 1
        },
        iniciar: function(){
            if(this.status == gameStatus.run || this.status == gameStatus.pause) return
            this.status = gameStatus.run
            regras.inicio()
            motor1.rodarFrames()
        },
    
        pausar: function(){
            if(this.status === gameStatus.run){
                this.status = gameStatus.pause
            }else if(this.status === gameStatus.pause){
                this.status = gameStatus.run
                motor1.rodarFrames()
            }
        },
    
        verificaSeComeuFruta: function(player){
            let frutaComida = -1
            this.frutas.forEach(( fruta, indice ) => {
                if(this.players[player].calda[0].x === fruta.x && this.players[player].calda[0].y === fruta.y){
                    frutaComida = indice
                }
            })
            if ( frutaComida > -1 ){
                regras.comerFruta(player, frutaComida)
            }        
            return frutaComida
        },
        verificaSeColidiuParede: function(player){
            let colidiu = false
            if(
                this.players[player].calda[0].x > this.limiteLargura() 
              | this.players[player].calda[0].x < 0
              | this.players[player].calda[0].y > this.limiteAltura()
              | this.players[player].calda[0].y < 0
            ){
                colidiu = true
            }
            if (colidiu) regras.colisaoParede(player)
            return colidiu
        },

        verificaSeColidiuCalda: function(idPlayer){            
            let colidiu = false
            for(let player in this.players){
                this.players[player].calda.forEach((celula, indice)=>{
                    if( indice === 0 && player === idPlayer){
                        return
                    }

                    if(                        
                        this.players[idPlayer].calda[0].x === celula.x 
                        && this.players[player].calda[0].y === celula.y
                    ){
                        colidiu = true
                    }
                })
            }
            if (colidiu) regras.colisaoCalda(idPlayer)
            return colidiu
        },

        modo: gameMode,
        logs: true
    }
}

export default Game


