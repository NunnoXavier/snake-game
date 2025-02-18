const Fruit = function(game){
    const largura = game.limiteLargura()
    const altura =  game.limiteAltura()
    const novaFruta = {
        x: Math.floor(Math.random() * largura),
        y: Math.floor(Math.random() * altura),
        cor: 'red'
    }

    game.logs && console.log(`fruit: nova fruta em `, novaFruta)
    return novaFruta
}

export default Fruit