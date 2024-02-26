import GameElementThrowable from "./GameElementThrowable";

class Bouncer extends GameElementThrowable {
    private bounceSpeed = 3;

    constructor() {
        super();
        this.color = "blue";
    }

    getBounceSpeed() {
        return this.bounceSpeed;
    }
}

export default Bouncer;
