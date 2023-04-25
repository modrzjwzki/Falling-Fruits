import { Sprite } from "pixi.js";
import Scene from "../core/Scene";

export default class TestScene extends Scene {


    // public sprite = Sprite.from("public/player.png");

    constructor() {
        super();
    }

    public setup() {
        // this.sprite.anchor.set(0.5);
        // this.sprite.position.x = window.innerWidth / 2;
        // this.sprite.position.y = window.innerHeight / 2;
        // this.addChild(this.sprite);
    }

    public update(delta: number) {
        // this.sprite.rotation += 0.01 * delta;
    };


   

}