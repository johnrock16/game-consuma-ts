
import GameElementThrowable from "./GameElementThrowable";

class Food extends GameElementThrowable {
    private isPoisonFruit = false;

    constructor() {
        super();
        this.isPoisonFruit = Math.floor(Math.random() * ((Math.floor(2) - Math.ceil(0)) + Math.ceil(0))) === 0;
        this.color = this.isPoisonFruit ? "green" : "red";
    }

    getIsPoisonFruit() {
        return this.isPoisonFruit;
    }
}

export default Food;
