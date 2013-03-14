/**
 * Created with JetBrains WebStorm.
 * User: Lam Do
 * Date: 3/12/13
 * Time: 7:44 AM
 * To change this template use File | Settings | File Templates.
 */

var self;
var GameView = Backbone.View.extend({
    stage: null,
    assets:[],
    sky:null, grant:null, ground:null, hill:null, hill2:null,
    w:0, h:0,

    initialize: function() {
        self = this;
        this.stage = new createjs.Stage("main");
        this.w = $("#main").width();
        this.h = $("#main").height();
        var loader = new createjs.LoadQueue(false);
        loader.onFileLoad = this.fileLoadHandler;
        loader.onComplete = this.completeHandler;

        loader.loadManifest(this.model.get("manifest"));

        this.stage.autoClear = false;

        var spriteSheet ={  "animations": {"run": [0, 25], "jump": [26, 63]},
                            "images": ["assets/images/runningGrant.png"],
                            "frames": {"regX": 0, "height": 292.5, "count": 64, "regY": 0, "width": 165.75}};

        var ss = new createjs.SpriteSheet(spriteSheet);
        this.grant = new createjs.BitmapAnimation(ss);

        // Set up looping
        ss.getAnimation("run").next = "run";
        ss.getAnimation("jump").next = "run";
        this.grant.gotoAndPlay("run");

        // Position the Grant sprite
        this.grant.x = -200;
        this.grant.y = 90;
        this.grant.scaleX = this.grant.scaleY = 0.8;


        $(document).keydown(function(evt){
            switch(evt.keyCode){
                case 32:
                    self.grantJumpingHandler();
                    break;

                default:
                    break;
            }
        });
    },

    render: function() {
        this.stage.update();
    },

    fileLoadHandler: function(event) {
        self.assets.push(event.item);
    },

    completeHandler: function() {
        for(var i=0;i<self.assets.length;i++) {
            var item = self.assets[i];
            var id = item.id;
            var result = this.getResult(id);

            if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            switch (id) {
                case "sky":
                    self.sky = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,self.w,self.h));
                    break;

                case "ground":
                    self.ground = new createjs.Shape();
                    var g = self.ground.graphics;
                    g.beginBitmapFill(result);
                    g.drawRect(0, 0, self.w+330, 79);
                    self.ground.y = self.h-79;
                    break;

                case "hill":
                    self.hill = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,282,59));
                    self.hill.x = Math.random() * self.w;
                    self.hill.scaleX = self.hill.scaleY = 3;
                    self.hill.y = 144;
                    break;

                case "hill2":
                    self.hill2 = new createjs.Shape(new createjs.Graphics().beginBitmapFill(result).drawRect(0,0,212,50));
                    self.hill2.x = Math.random() * self.w;
                    self.hill2.scaleX = self.hill2.scaleY = 3;
                    self.hill2.y = 171;
                    break;

                default:
                    break;
            }
        }

        self.stage.addChild(self.sky, self.ground, self.hill, self.hill2, self.grant);
        createjs.Ticker.setFPS(self.model.get("framerate"));
        createjs.Ticker.addEventListener("tickHandler", self.tickHandler);
    },

    tickHandler: function() {
        var outside = self.w + 20;
        var position = self.grant.x + 2.5;
        self.grant.x = (position >= outside) ? -200 : position;

        self.ground.x = (self.ground.x-15) % 330;
        self.hill.x = (self.hill.x - 0.8);
        if (self.hill.x + 838 <= 0) { self.hill.x = outside; }
        self.hill2.x = (self.hill2.x - 1.2);
        if (self.hill2.x + 633 <= 0) { self.hill2.x = outside; }

        self.stage.update();
    },

    grantJumpingHandler: function() {
        self.grant.gotoAndPlay("jump");
    }
});