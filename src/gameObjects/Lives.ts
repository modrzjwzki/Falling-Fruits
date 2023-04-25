import { BaseTexture, SCALE_MODES, Sprite, Spritesheet, Texture } from "pixi.js";
import GameObject from "../core/GameObject";
import { Assets } from "@pixi/assets";

export default class Lives extends GameObject {

    public lives = 10;

    constructor(
        public spriteSheet: Spritesheet
    ) {
        super();
    }

    public async setup() {
        for (let i = 0; i < this.lives; i++) {
            this.addHeart();
        }
    }

    public addHeart() {
        const texture = this.spriteSheet.textures['knight iso char_idle_0'];
        texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
        const heart = new Sprite(texture);
        heart.anchor.set(0.5, 0.5);
        heart.scale.set(0.5);

        heart.position.x = 50 * this.children.length;
        this.addChild(heart);
    }

    public removeHeart() {
        this.removeChild(this.children[this.children.length - 1]);
        this.lives -= 1;

        if (this.lives <= 0) {
            this.emit('gameOver');
        }
    }
}