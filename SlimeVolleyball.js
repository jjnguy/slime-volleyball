

var SlimeGame = function (canvas) {
    var self = this;

    var ctx = canvas.getContext('2d');
    var $canvas = $(canvas);

    var slime1 = new Slime(self, 'green');
    var slime2 = new Slime(self, 'red');

    self.paint = function () {
        paintSlime(slime1);
    }

    function paintSlime(slime) {
        var btm = slime.bottomLeftPosition();

        ctx.beginPath();
        ctx.fillStyle = slime.color;
        ctx.arc(btm.x, btm.y, slime.height, 0, Math.PI, true);
        ctx.lineTo(btm.x, btm.y);
        ctx.fill();
    }

    function eraseSlime(slime) {
        var btm = slime.bottomLeftPosition();

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(btm.x, btm.y, slime.height, 0, Math.PI, true);
        ctx.lineTo(btm.x, btm.y);
        ctx.fill();
    }

    function moveSlimeLeft(){
        slime.moveLeft();
    }

    function moveSlimeRight(){
        slime.moveRight();
    }

    $canvas.keypress(function (evt) {
        var key = evt.which;
        console.log(key + ' pressed');
        if (key === 97) {
            // a
            eraseSlime(slime1);
            slime1.moveLeft(ctx);
            paintSlime(slime1);
        } else if (key === 100) {
            // d
            eraseSlime(slime1);
            slime1.moveRight(ctx);
            paintSlime(slime1);
        }
    });
}

var Slime = function (parent, color) {

    var self = this;

    self.height = 30;
    self.width = 50;

    self.color = color;

    self.position = {x: 100, y: 100};

    var MOVE_FACTOR = 8;

    self.moveLeft = function (ctx) {
        self.position.x -= MOVE_FACTOR;
        parent.paint();
    };

    self.moveRight = function (ctx) {
        self.position.x += MOVE_FACTOR;
        parent.paint();
    };

    self.bottomLeftPosition = function() {
        return {
            x: self.position.x - (self.width / 2),
            y: self.position.y
        }
    }
}

var Ball = function () {
    var self = this;


}