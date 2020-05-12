var c = document.getElementById("c");
var ctx = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var particles = [];
var max = 1000;
var clearColor = "#fbfbfb"; //bg color
var fov = 20;
var hue = 0;
var frame = 0;
var start = 300;


function random(min, max) {
    return (Math.random() * (max - min)) + min;
}


function P() {
    this.startZ = start;
    start += .18;
}



P.prototype.init = function () {
    this.x = random(-w * 4, w * 4);
    this.y = 500;
    this.z = this.startZ || 500;
    this.startZ = null;
    this.vx = 0;
    this.vy = 0;
    this.vz = 2;
    this.color = "hsla(" + hue + ", 100%, 50%, .8)";
    this.size = 10;
};

P.prototype.draw = function () {
    var scale = fov / (fov + this.z);
    var x2d = this.x * scale + w / 2;
    var y2d = this.y * scale + h / 2;
    ctx.fillStyle = "#212120"; //color fixed 
    // ctx.fillStyle = this.color;
    ctx.fillRect(x2d, y2d, this.size * scale, this.size * scale);

    if (x2d < 0 || x2d > w || y2d < 0 || y2d > h) {
        this.init();
    }

    this.update();
};


P.prototype.update = function () {
    this.z -= this.vz;
    this.x += this.vx;
    this.y += this.vy;
    if (this.z < -fov) {
        this.init();
    }
};

for (var i = 0; i < max; i++) {
    (function (x) {
        setTimeout(function () {
            var p = new P();
            p.init();
            particles.push(p);
        }, x * 3)
    })(i)
}

window.addEventListener("resize", function () {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
})


function anim() {
    ctx.fillStyle = clearColor;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(0, 0, w, h);

    for (var i in particles) {
        particles[i].draw();
    }

    hue += .1;
    frame = window.requestAnimationFrame(anim);
}


anim();
