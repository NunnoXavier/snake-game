export const TiposFrutas = [
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'red', pontos: 1 },
    { cor: 'yellow', pontos: 3 },
    { cor: 'yellow', pontos: 3 },
    { cor: 'yellow', pontos: 3 },
    { cor: 'yellow', pontos: 3 },
    { cor: 'yellow', pontos: 3 },
    { cor: 'green', pontos: 5 },
    { cor: 'green', pontos: 5 },
    { cor: 'green', pontos: 5 },
    { cor: 'brilho', pontos: 10 },

]

const Fruit = function(game){
    const largura = game.limiteLargura()
    const altura =  game.limiteAltura()
    const tFruta = TiposFrutas[Math.floor(Math.random() * TiposFrutas.length)]
    const novaFruta = {
        x: Math.floor(Math.random() * largura),
        y: Math.floor(Math.random() * altura),
        cor: tFruta.cor,
        pontos: tFruta.pontos
    }

    game.logs && console.log(`fruit: nova fruta em `, novaFruta)
    return novaFruta
}

export default Fruit