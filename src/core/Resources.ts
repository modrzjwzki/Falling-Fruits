import { Assets } from "@pixi/assets";
import EventEmitter from "eventemitter3";
import { Loader } from "pixi.js";

export default class Resources extends EventEmitter {

    public static instance: Resources;

    public static getInstance(): Resources {
        if (!Resources.instance) {
            Resources.instance = new Resources();
        }
        return new Resources();
    }

    public loader: Loader = new Loader();

    public items: Array<any> = [];

    constructor() {
        super();
    }

    public async loaded() {
        return Promise.all([
            Assets.load('player.json')
        ])
    }

    public onProgress = (loader: Loader, resource: any) => {
        console.log("loading: " + resource.url);
    }

    public onLoad(loader: Loader, resource: any)  {
        console.log("loaded: " + resource.url);
        this.emit('loaded', resource);
        this.items.push(resource);
    }

}