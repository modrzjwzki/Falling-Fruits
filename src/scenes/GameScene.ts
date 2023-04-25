import { Assets } from "@pixi/assets";
import Fruit from "../gameObjects/Fruit";
import Player from "../gameObjects/Player";
import Scene from "../core/Scene";
import { BaseTexture, Spritesheet } from "pixi.js";
import { Renderer } from "../core/Renderer";
import Utils from "../Utils/Utils";
import Points from "../gameObjects/Points";
import Lives from "../gameObjects/Lives";

export default class GameScene extends Scene {


    public player: Player | null = null;

    private renderer: Renderer = Renderer.getInstance();

    private fruits: Array<Fruit> = [];

    private points = new Points();

    private lives: Lives | null = null;

    public interval: number = 5;

    private spritesheet: Spritesheet | null = null;

    public fruitMaxSpeed = 3;

    public fruitMinSpeed = 1;

    private timer: number = 0;

    private playerSpritesheet: Spritesheet | null = null;

    constructor() {
        super();
        const asset = Assets.load('food.json').then((asset) => {
            this.spritesheet = new Spritesheet(BaseTexture.from(asset.meta.image), asset);
            this.spritesheet.parse();
        });

        const playerJson = Assets.load('player.json').then((playerJson) => {
            this.playerSpritesheet = new Spritesheet(BaseTexture.from(playerJson.meta.image), playerJson);
            this.playerSpritesheet.parse();
        });

        
    }

    public async setup() {
     
        this.player = new Player(this.playerSpritesheet!);

        this.addChild(this.player);

        this.lives = new Lives(this.playerSpritesheet!);
        this.lives.position.y = 50;
        this.lives.position.x = 50;

        this.lives.on('gameOver', this.gameOver);


        this.addChild(this.lives);

        this.points.position.x = this.renderer.pixiRenderer.screen.width / 2;
        this.points.position.y = 100;
        this.addChild(this.points);

        
    }

    public gameOver = () => {
        this.emit('gameOver', this.points.points);
        this.points.reset();
        this.fruits.forEach((fruit) => {
            this.removeChild(fruit);
        });

        this.removeChild(this.lives!);
        this.removeChild(this.points!);
        this.removeChild(this.player!);
        this.fruits = [];
    }

    public spawnFruit() {
        const fruit = new Fruit(this.spritesheet!, Utils.randomNumber(this.fruitMinSpeed, this.fruitMaxSpeed));
        fruit.position.x = Utils.randomNumber(0, this.renderer.pixiRenderer.screen.width);
        this.fruits.push(fruit);

        fruit.addListener('destroy', () => {
            this.lives?.removeHeart();
            fruit.destroy();
            delete this.fruits[this.fruits.indexOf(fruit)];
        })
        this.addChild(fruit);
    }

    public update(delta: number): void {
        super.update(delta);

        this.timer += delta;
        if (this.timer >= this.interval) {
            this.timer -= this.interval;
            this.spawnFruit();
        }


        this.fruits.forEach((fruit) => {
            if (this.hitTestRectangle(this.player, fruit)) {
                this.points.addPoints(fruit.fruitPoints);
                this.player?.emit('hit');
                fruit.destroy();
                delete this.fruits[this.fruits.indexOf(fruit)];
            }
        })


    }

    public hitTestRectangle(r1: any, r2: any) {
        r1.left = r1.x;
        r1.right = r1.x + r1.width;
        r1.top = r1.y;
        r1.bottom = r1.y + r1.height;

        r2.left = r2.x;
        r2.right = r2.x + r2.width;
        r2.top = r2.y;
        r2.bottom = r2.y + r2.height;

        return !(r1.bottom < r2.top ||
            r1.top > r2.bottom ||
            r1.right < r2.left ||
            r1.left > r2.right);
    }

}