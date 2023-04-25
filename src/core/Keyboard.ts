import EventEmitter from "eventemitter3";

export default class Keyboard extends EventEmitter{

    private keys: {[key: string]: boolean} = {};

    public static instance: Keyboard;

    constructor() {
        super();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    public static getInstance(): Keyboard {
        if (!Keyboard.instance) {
            Keyboard.instance = new Keyboard();
        }
        return new Keyboard();
    }

    private onKeyDown(event: KeyboardEvent) {
        this.keys[event.key] = true;
        this.emit("keydown", event);
    }

    private onKeyUp(event: KeyboardEvent) {
        this.keys[event.key] = false;
        this.emit("keyup", event);
    }

    public isDown(key: string) {
        return this.keys[key] === true;
    }

    public isUp(key: string) {
        return this.keys[key] === false;
    }

}