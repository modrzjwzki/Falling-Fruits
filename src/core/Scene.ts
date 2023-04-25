import { Application, Ticker } from "pixi.js";
import { Engine } from "./Engine";
import GameObject from "./GameObject";

export interface IGameObject {
    update(delta: number): void;
    setup(): void;
}


export default class Scene extends GameObject implements IGameObject {
    public app: Application;

    public ticker: Ticker = Ticker.shared;

    constructor() {
        super();
        this.app = Engine.getInstance().application;
    }

    public update(delta: number): void {
        this.updateChildren(delta);
    }


}

