import GameObject from "../core/GameObject";
import { SCALE_MODES, Sprite, Spritesheet } from "pixi.js";
import Utils from "../Utils/Utils";
import { Renderer } from "../core/Renderer";
export default class Fruit extends GameObject {


    public randomRotation = Utils.randomNumber(-0.01, 0.01)

    public fruitPoints = Utils.randomNumber(1, 3);

    private renderer: Renderer = Renderer.getInstance();

    constructor(
        public spritesheet: Spritesheet,
        public fruitSpeed: number) {
        super();
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

        this.addChild(fruitSprite);


    }

    public update(delta: number): void {

        this.position.y += this.fruitSpeed * delta;
        this.rotation += this.randomRotation * delta;

        if (this.position.y > this.renderer.pixiRenderer.screen.height) {
            this.emit('destroy');
        }


    }
}