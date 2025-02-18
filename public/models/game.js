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
let visual = {}

const Game = function(){
    return {
        status: gameStatus.wait,
        alturaTela: 700,
        larguraTela: 900,
        zoom: 20,
        velocidade: 1,
        players: {},
        frutas: [],
        hiScore: 0,
        carregarRegras: function(pRegras){
            regras = pRegras
        },
        carregarVisual: function(pVisual){
            visual = pVisual
        },

        addVelocidade: function(){
            this.velocidade < 10 ? this.velocidade += 1 : this.velocidade = 10
        },
        dimVelocidade: function(){
            this.velocidade > 1 ? this.velocidade -= 1 : this.velocidade = 1
        },
        iniciar: function(){
            if(this.status == gameStatus.run || this.status == gameStatus.pause) return
            this.status = gameStatus.run
            regras.inicio()
            visual.rodarFrames()
        },
    
        pausar: function(){
            if(this.status === gameStatus.run){
                this.status = gameStatus.pause
            }else if(this.status === gameStatus.pause){
                this.status = gameStatus.run
                visual.rodarFrames()
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
            const limiteAltura = Math.floor(this.alturaTela / this.zoom)-1
            const limiteLargura = Math.floor(this.larguraTela / this.zoom)-1
    
            let colidiu = false
            if(
                this.players[player].calda[0].x > limiteLargura 
              | this.players[player].calda[0].x < 0
              | this.players[player].calda[0].y > limiteAltura
              | this.players[player].calda[0].y < 0
            ){
                colidiu = true
            }
            if (colidiu) regras.colisaoParede(player)
            return colidiu
        },
        modo: gameMode,
    }
}

export default Game


