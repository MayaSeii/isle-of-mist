class Skill {

    constructor(data) {
        
        this.data = data;

    }

    markAsUsed() {

        this.data.mcs_canuse = false;
        
    }

    hasBeenUsed() {

        return !this.data.mcs_canuse;

    }

}