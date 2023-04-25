import TestScene from "../scenes/TestScene";
import { Engine } from "./Engine";
import Scene from "./Scene";
import { EventEmitter } from "events";


export default class SceneManager {

    public scenes: { scene: Scene, name: string }[];

    public engine: Engine;

    public activeScene: Scene | null;

    public activeSceneIndex: number | null = null;

    public hasStarded: boolean = false;

    constructor(scenes: { scene: Scene, name: string }[], engine: Engine) {
        this.scenes = scenes;
        this.engine = engine;
        this.activeScene = this.scenes[0].scene;
        this.engine.application.ticker.add((delta) => this.update(delta));
    }
    
    public start(name: string) : void {
        this.scenes.forEach((scene, index) => {
            if (scene.name === name) {
                this.stop();
                this.activeScene = scene.scene;
                this.activeSceneIndex = index;
                this.engine.application.stage.addChild(this.activeScene);
                this.activeScene.setup();
            }
        })
    }

    public stop() {
        this.engine.application.stage.removeChildren();
    }

    public add(scene: {scene: Scene, name: string}) : void {
        this.scenes.push(scene);
    }

    public update(delta: number) : void{
        if (this.activeScene) {
            this.engine.renderer.pixiRenderer.render(this.activeScene);
            this.activeScene?.update(delta);
            this.activeScene.name = this.currentSceneName as string;
        }
    }

    public get sceneNames(): string[] {
        let names: string[] = [];
        this.scenes.forEach((scene) => {
            names.push(scene.name);
        })
        return names;
    }

    public get currentSceneName(): string | null {
        if (this.activeScene) {
            return this.scenes[this.activeSceneIndex as number].name;
        }
        return null;
    }

 
}