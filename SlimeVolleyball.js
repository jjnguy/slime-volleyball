

var SlimeGame = function (canvas) {
    var self = this;

    var ctx = canvas.getContext('2d');
    var $canvas = $(canvas);

    var height = $canvas.height();
    var width = $canvas.width();

    var slime1 = new Slime(self, 'green');
    var slime2 = new Slime(self, 'red');

    self.paint = function () {
        paintSlime(slime1);
    }

    self.advance = function(){
        applyInput();

        advanceSlime(slime1);
        advanceSlime(slime2);
        // console.log(slime1);
    };

    var X_SLOW_RATE = 2;
    var GRAVITY = -10;
    var MAX_X_VELOCITY = 20;

    function applyInput(){
        if (keys[65]){
            slime1.moveLeft();
        }if (keys[68]){
            slime1.moveRight();
        }if (keys[87]){
            slime1.jump();
        }
    };

    function advanceSlime(slime){
        eraseSlime(slime);

        slime.position.x += slime.velocity.x;
        slime.velocity.x -= slime.velocity.x == 0 ? 0: (slime.velocity.x / Math.abs(slime.velocity.x)) * X_SLOW_RATE;
        if (Math.abs(slime.velocity.x) < .001){
            slime.velocity.x = 0;
        }

        if (slime.velocity.x < 0 && slime.velocity.x < -MAX_X_VELOCITY){
            slime.velocity.x = -MAX_X_VELOCITY;
        } else if (slime.velocity.x > 0 && slime.velocity.x > MAX_X_VELOCITY){
            slime.velocity.x = MAX_X_VELOCITY;
        }

        slime.position.x = Math.min(slime.position.x, width);
        slime.position.x = Math.max(slime.position.x, 0);

        slime.position.y += slime.velocity.y;
        slime.velocity.y -= GRAVITY;
        slime.position.y = Math.min(0, slime.position.y);

        paintSlime(slime);
    }

    function paintSlime(slime) {
        var btm = slime.bottomLeftPosition();

        btm = translateCoordinates(btm);

        ctx.beginPath();
        ctx.fillStyle = slime.color;
        ctx.arc(btm.x, btm.y, slime.height, 0, Math.PI, true);
        ctx.lineTo(btm.x, btm.y);
        ctx.fill();
    }

    function eraseSlime(slime) {
        var btm = slime.bottomLeftPosition();
        btm = translateCoordinates(btm);

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.arc(btm.x, btm.y, slime.height, 0, Math.PI, true);
        ctx.lineTo(btm.x, btm.y);
        ctx.fill();
    }

    function translateCoordinates(coord){
        return {
            x: coord.x,
            y: coord.y + height
        }
    }

    function moveSlimeLeft(){
        slime.moveLeft();
    }

    function moveSlimeRight(){
        slime.moveRight();
    }

    var keys = {};
    $canvas.keydown(function (evt) {
        var key = evt.which;
        //console.log(key + ' pressed');
        
        keys[key] = true;
    });
    $canvas.keyup(function (evt) {
        var key = evt.which;
        //console.log(key + ' up');
        
        delete keys[key];
    });
}

var Slime = function (parent, color) {

    var self = this;

    self.height = 60;
    self.width = 100;

    self.color = color;

    self.position = {x: 100, y: 100};

    self.velocity = {x:0, y: 0};

    var MOVE_FACTOR = 8;

    self.moveLeft = function () {
        self.velocity.x -= MOVE_FACTOR;
    };

    self.moveRight = function () {
        self.velocity.x += MOVE_FACTOR;
    };

    self.jump = function(){
       // console.log(self.position.y);
        if (self.position.y == 0){
            self.velocity.y = -30;
        }
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