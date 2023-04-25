import { Renderer as PixiRenderer } from "pixi.js";

export class Renderer  {

    private static instance: Renderer;

    public renderer: PixiRenderer = new PixiRenderer({
        autoDensity: true,
        antialias: true,
    });

    public static getInstance(): Renderer {
        if (!Renderer.instance) {
            Renderer.instance = new Renderer();
        }
        return new Renderer();
    }

    constructor() {
        this.renderer.backgroundColor = 0x000000;
        // this.renderer.view.style.position = "absolute";
        // this.renderer.view.style.display = "block";
        // this.renderer.view.style.left = "0";
        // this.renderer.view.style.top = "0";
        // this.renderer.resize(window.innerWidth, window.innerHeight);
    }

    public get pixiRenderer() {
        return this.renderer;
    }
   
}