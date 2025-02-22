const Audio = function(){
    
    
    return{
        playGameOver: function(){
            const audioGameOver = document.getElementById('gameOver')
            audioGameOver.play()
        },
        playGulp: function(){
            const audioGulp = document.getElementById('gulp')
            audioGulp.play()
        },
        playLevelUp: function(){
            const audioLevelUp = document.getElementById('levelUp')
            audioLevelUp.play()
        },
        playStart: function(){
            const audioStart = document.getElementById('start')
            audioStart.play()
        }
    }
}

export default Audio