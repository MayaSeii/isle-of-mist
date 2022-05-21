class Skills {

    constructor(data) {
        
        this.data = data;

    }

    skillrange(){


    }

    skillcost(currentChar){
        
        getMatchCharacterById(currentChar);
        getMatchCharacterSkillById(currentChar);

        if(currentChar.mcs_canuse==true){
            if( currentChar.mch_ap >= this.data.skl_cost){

                currentChar.mch_ap = currentChar.mch_ap - this.data.skl_cost;

                skillaction(data);

            }
            else{

                console.log('Character does not have enougth ap!');

            }

        }
        else{

            console.log('Skill has been used!');

        }

    }

    skillaction(skillid){

        if(skillid == 4){

            damagerolls(skillid)

        }

    }

    damagerolls(skillid){

        let totaldamage;

        let min = Math.ceil(1);
        let max = Math.floor(skillid.skl_dicetype);

        for (let i = 0; i < skillid.skl_diceamount; i++) {

            let rolledamage = Math.floor(Math.random() * (max - min + 1)) + min;
            totaldamage = totaldamage + rolledamage

        }

        totaldamage = totaldamage + skillid.skl_truedamage

    }

    healthreduction(){

        

    }

}