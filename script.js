let canvas = document.getElementById("myCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");
let particleArray = [];
let hue = 0;

// ctx.fillStyle = "red";
// ctx.beginPath();
// ctx.arc(300, 300, 50, 0, Math.PI * 2);
// ctx.fill();
// console.log(ctx);
const mouse = {
  x: null,
  y: null,
};

canvas.addEventListener("click", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 20; i++) {
    particleArray.push(new Particle());
  }
});
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.height;
    // this.y = Math.random() * canvas.width;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ",100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particleArray.push(new Particle());
//   }
// }
// init();

canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particleArray.push(new Particle());
  }
});
function handleParticle() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
    for (let j = 0; j < particleArray.length; j++) {
      let dx = particleArray[i].x - particleArray[j].x;
      let dy = particleArray[i].y - particleArray[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particleArray[i].color;
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
    if (particleArray[i].size <= 0.3) {
      particleArray.splice(i, 1);
      i--;
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.02)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  handleParticle();
  hue+=2;
}

animate();
