export default class Utils {

    public static randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getRandomBoolean(): boolean {
        return Math.random() > 0.5;
    }


}