import GameObject from "../core/GameObject";
import { AnimatedSprite, Spritesheet } from "pixi.js";
import { Renderer } from "../core/Renderer";

export default class Player extends GameObject {

    public isMoving: { [key: string]: boolean } = {
        left: false,
        right: false,
        jumping: false
    }

    public movmentSpeed: number = 10;

    public lives: number = 10;

    public powerups: [] = [];

    private renderer: Renderer = Renderer.getInstance();

    public jumpStartY: number = this.renderer.pixiRenderer.screen.height;

    public jumpDuration: number = 10;

    public jumpHeight: number = 500;

    public jumpSpeed: number = this.jumpHeight / this.jumpDuration;

    private jumpProgress: number = 0;

    constructor(
        public spritesheet: Spritesheet
    ) {
        super();

        this.keyboard?.addListener('keydown', (keyEvent: KeyboardEvent) => {
            this.movePlayer(keyEvent)
        });

        this.keyboard?.addListener('keyup', (keyEvent: KeyboardEvent) => {
            if (keyEvent.key === 'a') {
                this.isMoving.left = false;
            } else if (keyEvent.key === 'd') {
                this.isMoving.right = false;
            }
        })

    }

    public async setup() {

        const playerSprite = new AnimatedSprite(this.spritesheet.animations['knight iso char_idle'], true);
        playerSprite.animationSpeed = 0.1;
        playerSprite.play();

        playerSprite.anchor.set(0.5, 1);

        this.position.y = this.renderer.pixiRenderer.screen.height;
        this.position.x = this.renderer.pixiRenderer.screen.width / 2;
        this.addChild(playerSprite);

        this.addListener('hit', () => this.hit(playerSprite))


        this.isMoving = this.createObservableObject(this.isMoving, (key: string, value: boolean) => {


            if (key === 'left' && value === true) {
                playerSprite.textures = this.spritesheet.animations['knight iso char_run left'];
                playerSprite.play();
            }

            if (key === 'right' && value === true) {
                playerSprite.textures = this.spritesheet.animations['knight iso char_run right'];
                playerSprite.play();
            }
            if ((key === 'left' || key === 'right') && value === false) {
                playerSprite.textures = this.spritesheet.animations['knight iso char_idle'];
                playerSprite.play();
            }

        });

    }

    public movePlayer(keyEvent: KeyboardEvent) {
        switch (keyEvent.code) {
            case 'KeyA':
                this.isMoving.left = true;
                break;
            case 'KeyD':
                this.isMoving.right = true;
                break;
            case 'Space':
                this.jump();
                break;
        }
    }

    public hit(playerSprite: AnimatedSprite) {
        playerSprite.textures = this.spritesheet.animations['knight iso char_slice up'];
        playerSprite.play();
    }

    private createObservableObject<T extends object>(obj: T, onChange: (key: string, value: any) => void): T {
        return new Proxy(obj, {
            set(target: any, key, value) {
                if (target[key] !== value) {
                    onChange(key as string, value);
                }
                return Reflect.set(target, key, value);
            }
        });
    }

    public jump() {
        if (this.isMoving.jumping === true) return;
        this.isMoving.jumping = true;
        this.jumpProgress = 0
    }

    public update(delta: number): void {

        if (this.isMoving.left && this.position.x > 0) {
            this.position.x -= this.movmentSpeed;
        }
        if (this.isMoving.right && this.position.x < this.renderer.pixiRenderer.screen.width) {
            this.position.x += this.movmentSpeed;
        }
        if (this.isMoving.jumping) {
            this.jumpProgress += delta;

            this.position.y = this.jumpStartY - this.jumpSpeed * this.jumpProgress + 0.5 * 9.81 * this.jumpProgress * this.jumpProgress;

            if (this.jumpProgress >= this.jumpDuration) {
                this.isMoving.jumping = false;
                this.position.y = this.jumpStartY;
            }

        }
    }
}