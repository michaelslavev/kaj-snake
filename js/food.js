// just a Food object
class Food {
    constructor(pos) {
        this._pos = pos;
    }
}

Food.prototype.pos = function() {
    return this._pos;
}



