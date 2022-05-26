class Skill {

    constructor(data) {
        
        this.data = data;

    }

    async markAsUsed() {

        this.data = await markSkillAsUsed(this.data.mcs_mch_id, this.data.skl_id);
        
    }

    async markAsUnused() {

        this.data = await markSkillAsUnused(this.data.mcs_mch_id, this.data.skl_id);
        
    }

    hasBeenUsed() {

        return !this.data.mcs_canuse;

    }

}