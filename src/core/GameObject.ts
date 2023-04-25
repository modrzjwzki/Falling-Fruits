import { Container, DisplayObject, IDestroyOptions, Renderer, Sprite } from "pixi.js";
import { Engine } from "./Engine";
import Scene from "./Scene";
import Keyboard from "./Keyboard";

interface IGameObject {
    update(delta: number): void;
    setup(): void;
}

export class EventEmitterObject extends Container {
    constructor() {
        super();
    }
}

export default class GameObject extends EventEmitterObject implements IGameObject {

    public engine?: Engine;

    public keyboard?: Keyboard;

    private _children: Array<GameObject> = [];

    protected gameObjects: GameObject[] = [];

    protected events: { [key: string]: Function[] } = {};


    public name: string;

    constructor(protected sceneManager?: Scene) {
        super();
        this.name = Math.random().toString();
        this.keyboard = Keyboard.getInstance();
    }

    public setup(): void { }

    public update(delta: number): void { }

    public addChild(...children: DisplayObject[]): DisplayObject {
        for (const child of children) {
            if (child instanceof GameObject) {
                this._children.push(child);
                child.setup();
                if (this.sceneManager) {
                    child.sceneManager = this.sceneManager;
                }
            }
            super.addChild(child);
        }
        return children[0];
    }

    public removeChild(...children: DisplayObject[]): DisplayObject {
        for (const child of children) {
            const index = this._children.indexOf(child as GameObject);
            if (index !== -1) {
                this._children.splice(index, 1);
            }
            super.removeChild(child);
        }
        return children[0];
    }



    public destroy(options?: boolean | IDestroyOptions | undefined): void {
        super.destroy(options);
        this._children = [];
    }

    protected updateChildren(delta: number): void {
        const queue: GameObject[] = [...this._children];

        while (queue.length > 0) {
            const gameObject = queue.shift()!;
            gameObject.update(delta);
            if (gameObject instanceof GameObject) {
                for (const child of gameObject._children) {
                    queue.push(child as GameObject);
                }
            }
        }
    }
}