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

            if (!fruit.isPoisoned) {
                this.lives?.removeHeart();
            }
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
            if (fruit.getBounds().intersects(this.player!.getBounds())) {

                if (!fruit.consumed) {
                    this.points.addPoints(fruit.fruitPoints);
                    fruit.consumed = true;

                    if (fruit.isPoisoned) {
                        this.lives?.removeHeart();
                    }
                    this.player?.emit('hit');

                    setTimeout(() => {

                        fruit.destroy();
                        delete this.fruits[this.fruits.indexOf(fruit)];

                    }, 200)
                }


                const playerX = this.player!.position.x;
                const fruitX = fruit.position.x;
                const distance = playerX - fruitX;
                const speed = 10;
                fruit.position.x += distance / speed * delta;
                fruit.position.y += distance / speed * delta;
                fruit.scale.x *= 0.5 * delta;
                fruit.scale.y *= 0.5 * delta;
            }

        })

    }
}