// Canvas setup
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = 560
canvas.height = 350

let score = 0
let gameFrame = 0
ctx.font = "35px Georgia"

let canvasPosition = canvas.getBoundingClientRect()
// Mouse Interactivity
const mouse = {
    x: canvas.width/2,
    y: canvas.height/2,
    click: false, 
}
canvas.addEventListener('mousedown', function(event){
    mouse.click = true
    mouse.x = event.x - canvasPosition.left
    mouse.y = event.y - canvasPosition.top
})
canvas.addEventListener('mouseup', function(){
    mouse.click = false
}) 
// Player
class Player {
    constructor() {
        this.x = canvas.width
        this.y = canvas.height/2
        this.radius = 35
        this.angle = 0
        this.frameX = 0 
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 1
        this.spriteHeight = 1
    }
    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        if (mouse.x != this.x) {
            this.x -= dx/20
        }
        if (mouse.y != this.y) {
            this.y -= dy/20
        }  
    }
    draw() {
        /* if (mouse.click) {
            ctx.lineWidth = 5
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
            //ctx.strokeStyle = 'red'
        } */
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        ctx.fill()
        ctx.closePath() 
    }
}
const player = new Player()
console.log(player.x,player.spriteWidth)
//Bubbles
const bubblesArray = []
class Bubble {
    constructor() {
        this.x = Math.random()*canvas.width
        this.y = canvas.height + 100 //+ Math.random()*canvas.height
        this.radius = 35
        this.speed = Math.random()*4.2 + 0.85
        this.distance;
        this.counted = false
    }
    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw() {
        ctx.fillStyle = 'blue'
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        ctx.fill()
        ctx.closePath()
        //ctx.stroke()
    }
} 
function handleBubbles() {
    if (gameFrame%50==0) {
        bubblesArray.push(new Bubble())
        console.log(bubblesArray.length)
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update()
        bubblesArray[i].draw()
    }
    for (let i = 0; i < bubblesArray.length; i++) {
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius) {
            bubblesArray.splice(i,1)
        }
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
            var audio = new Audio('audio/')
            audio.play()
            bubblesArray.splice(i,1)
            score++
        }
    }
}
let time = 0
function win() {
    if (score>20&&time<50) {
        ctx.fillStyle = 'red'
        ctx.fillText('you win', 101,101)
    } else if (score<=20&&time>50) {
        ctx.fillStyle = 'blue'
        ctx.fillText('you lose',101,101)
    }
}
function showtime() {
    if (gameFrame%60==0) {
        time++
    }
    ctx.fillText('time: ' + time,350,50)
}
//Animation Loop
function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    handleBubbles()
    player.update()
    player.draw()
    ctx.fillStyle = 'black'
    ctx.fillText('score: ' + score, 8.5, 35)
    gameFrame++
    win()
    showtime()
   /*  score++ */
    requestAnimationFrame(animate)
}
animate()

//document.write(Math.sqrt(16+29))















/* const player = new Player()
function animate() { 
    requestAnimationFrame(animate) 
    player.draw()
    // requestAnimationFrame(animate)
} 
animate() */
// Bubbles
// Animation Loop