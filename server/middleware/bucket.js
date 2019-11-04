module.exports=class Bucket {

    constructor(capacity, fillAfterSeconds, fillQuantiy, initial=0) {
        this.capacity = capacity;
        if(!initial){
            this.tokens=capacity;
        }
        else{
            this.tokens = initial;
        }
        this.fillQuantiy=fillQuantiy
        setInterval(() => this.addToken(), 1000*fillAfterSeconds);
    }

    addToken() {
        console.log('refilling')
        if (this.tokens < this.capacity) {
            this.tokens += this.fillQuantiy;
        }
    }

    take() {
        if (this.tokens > 0) {
            this.tokens -= 1;
            return true;
        }

        return false;
    }
}