import GameObject from "../core/GameObject";
import { SCALE_MODES, Sprite, Spritesheet } from "pixi.js";
import Utils from "../Utils/Utils";
import { Renderer } from "../core/Renderer";
export default class Fruit extends GameObject {


    public randomRotation = Utils.randomNumber(-0.01, 0.01)

    public fruitPoints = Utils.randomNumber(1, 3);

    private renderer: Renderer = Renderer.getInstance();

    public consumed: boolean = false;

    public isPoisoned: boolean ;

    constructor(
        public spritesheet: Spritesheet,
        public fruitSpeed: number) {
        super();

        this.isPoisoned = Math.random() < 0.1;
    }

    public async setup(): Promise<void> {
        const textures = this.spritesheet.textures;

       

        const keys = Object.keys(textures);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomTexture = textures[randomKey];

        randomTexture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

        const fruitSprite = new Sprite(randomTexture);
        fruitSprite.anchor.set(0.5, 0.5);
        fruitSprite.scale.set(3);

        if (this.isPoisoned) {
            fruitSprite.tint = 0x093b00;
        }

        this.addChild(fruitSprite);


    }

    public update(delta: number): void {

        this.position.y += this.fruitSpeed * delta;
        this.rotation += this.randomRotation * delta;

        if (this.position.y > this.renderer.pixiRenderer.screen.height + 50) {
            this.emit('destroy');
        }


    }
}