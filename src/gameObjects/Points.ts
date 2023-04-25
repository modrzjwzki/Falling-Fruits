import GameObject from "../core/GameObject";
import { Text } from 'pixi.js';

export default class Points extends GameObject {
    
    public points: number = 0;

    public text = new Text(this.points, {
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: 0xffffff,
        align: 'center',
    });

    public setup() {
        this.text.anchor.set(0.5, 0.5);
        this.addChild(this.text);
    }

    public addPoints(points: number) {
        this.points += points;
        this.text.text = this.points.toString();
    }

    public reset() {
        this.points = 0;
        this.text.text = this.points.toString();
    }
}