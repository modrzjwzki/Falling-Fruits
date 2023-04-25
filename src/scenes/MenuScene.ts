import { Graphics, Text } from "pixi.js";
import Scene from "../core/Scene";
import { Renderer } from "../core/Renderer";

export default class MenuScene extends Scene {

    private renderer: Renderer = Renderer.getInstance();

    public score: number | null = null;

    public gameOver: Text;

    public scoreText: Text;

    constructor() {
        super();
        this.gameOver = new Text('Game Over', {
            fontFamily: 'Arial',
            fontSize: 30,
            fontWeight: 'bold',
            fill: 0xf70000,
            align: 'center',
        });
        this.scoreText = new Text(`Score: ${this.score}`, {
            fontFamily: 'Arial',
            fontSize: 30,
            fontWeight: 'bold',
            fill: 0xffffff,
            align: 'center',
        })
        this.scoreText.position.y = 50;
        this.scoreText.position.x = this.renderer.pixiRenderer.screen.width / 2 - this.scoreText.width / 2;
        this.gameOver.position.x = this.renderer.pixiRenderer.screen.width / 2 - this.gameOver.width / 2;
        this.gameOver.position.y = 10;

        this.gameOver.visible =false;
        this.scoreText.visible =false;

        this.addChild(this.gameOver);
        this.addChild(this.scoreText);

        
        const level1 = this.makeButton(300, 80, 'Easy');
        level1.position.x = this.renderer.pixiRenderer.screen.width / 2 - level1.width / 2;
        level1.y = 100;

        const level2 = this.makeButton(300, 80, 'Medium');
        level2.position.x = this.renderer.pixiRenderer.screen.width / 2 - level2.width / 2;
        level2.y = 200;

        const level3 = this.makeButton(300, 80, 'Hard');
        level3.position.x = this.renderer.pixiRenderer.screen.width / 2 - level2.width / 2;
        level3.y = 300;

        level1.on('pointerdown', () => {
            this.emit('levelSelected', 1);
        });


        level2.on('pointerdown', () => {
            this.emit('levelSelected', 2);
     
        });


        level3.on('pointerdown', () => {
            this.emit('levelSelected', 3);
     
        });

        this.addChild(level1, level2, level3)
    }

    public setup() {

        if (this.score !== null) {
            this.scoreText.visible = true;
            this.gameOver.visible = true;
            this.scoreText.text = `Score: ${this.score}`;
         }

       

    }

    public makeButton(width: number, height: number, text?: string) {
        const button = new Graphics();

        button.beginFill(0x0e3675);

        // set the line style to have a width of 5 and set the color to red
        button.lineStyle(5, 0xFF0000);

        // draw a rectangle
        button.drawRect(0, 0, width, height);

        if (text) {
            const label = new Text(text, {
                fontFamily: 'Arial',
                fontSize: 30,
                fontWeight: 'bold',
                fill: 0xffffff,
                align: 'center',
            });
            label.position.x = width / 2 - label.width / 2;
            label.position.y = height / 2 - label.height / 2;

            button.addChild(label);
        }

        button.interactive = true;
        button.buttonMode = true;
        return button;
    }

    public update(delta: number) {
        super.update(delta);
    }
}