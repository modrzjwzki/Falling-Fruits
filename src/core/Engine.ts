import { Application, Container } from "pixi.js";
import { Renderer } from "./Renderer";
import TestScene from "../scenes/TestScene";
import SceneManager from "./SceneManager";
import GameScene from "../scenes/GameScene";
import { Assets } from "@pixi/assets";
import MenuScene from "../scenes/MenuScene";

export interface SceneSettings {
    index: number,
    name: string;
    scene: Container;
}

export class Engine {

    private static instance: Engine;

    public application: Application = new Application({ width: 800, height: 600 });

    public renderer: Renderer = new Renderer();

    public sceneManager: SceneManager | null = null;

    constructor() {
    }

    public async init() {

        Assets.load('food.json')

        const gameScene = new GameScene();

        const menuScene = new MenuScene();

        this.sceneManager = new SceneManager([
            { scene: new TestScene(), name: 'testScene' },
            { scene: gameScene, name: 'GameScene' },
            { scene: menuScene, name: 'MenuScene' }
        ], this);

        this.sceneManager.start('MenuScene');


        menuScene.on('levelSelected', (level) => {
            if (level === 1) {
                gameScene.fruitMinSpeed = 1;
                gameScene.fruitMaxSpeed = 3;
                gameScene.interval = 200;
                this.sceneManager?.start('GameScene')
            } else if (level === 2) {
                gameScene.fruitMinSpeed = 1;
                gameScene.fruitMaxSpeed = 3;
                gameScene.interval = 50;
                this.sceneManager?.start('GameScene')
            } else if (level === 3) {
                gameScene.fruitMaxSpeed = 5;
                gameScene.fruitMinSpeed = 3;
                gameScene.interval = 1;
                this.sceneManager?.start('GameScene')
            }
        })

        gameScene.on('gameOver', (points) => {
            menuScene.score = points;
            this.sceneManager?.start('MenuScene')
        })


        this.application.renderer = this.renderer.pixiRenderer;
        // this.application.resizeTo = window;
    }

    public static getInstance(): Engine {
        if (!Engine.instance) {
            Engine.instance = new Engine();
        }
        return new Engine();
    }

    public getCanvas() {
        return this.application.view;
    }

}