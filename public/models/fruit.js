const Fruit = function(game){
    const larguraTela = Math.floor(game.larguraTela / game.zoom)
    const alturaTela = Math.floor(game.alturaTela / game.zoom)
    return {
        x: Math.floor(Math.random() * larguraTela),
        y: Math.floor(Math.random() * alturaTela),
        cor: 'red'
    }
}

export default Fruit