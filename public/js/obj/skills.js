class Skills {

    constructor(data) {
        
        this.data = data;

    }

    skillaction(currentChar,enemyChar){

        if(this.data.skl_id == 4){

            this.skillaction(currentChar,enemyChar);

        }

    }

    async skillrange(currentChar,enemyChar){

        let xPos = currentChar.data.mch_positionx;
        let yPos = currentChar.data.mch_positiony;
        let xPosEnemy = enemyChar.data.mch_positionx;
        let yPosEnemy = enemyChar.data.mch_positiony;

            if(xPos <= xPosEnemy + this.data.skl_range && yPos==yPosEnemy) this.skillcost(currentChar,enemyChar);
            else if(xPos <= xPosEnemy - this.data.skl_range && yPos==yPosEnemy) this.skillcost(currentChar,enemyChar);
            else if(xPos <= xPosEnemy && yPos==yPosEnemy + this.data.skl_range) this.skillcost(currentChar,enemyChar);
            else if(xPos <= xPosEnemy && yPos==yPosEnemy - this.data.skl_range) this.skillcost(currentChar,enemyChar);
            else console.log('Out of range');
        
    }

    skillcost(currentChar,enemyChar){

        if(this.data.mcs_canuse==false || this.data.mcs_canuse==null){//need to fix 

            if( currentChar.data.mch_ap >= this.data.skl_cost){

                currentChar.data.mch_ap = currentChar.mch_ap - this.data.skl_cost;

                this.damagerolls(currentChar,enemyChar);

            }
            else{

                console.log('Character does not have enougth ap!');

            }

        }
        else{

            console.log('Skill has been used!');

        }

    }

    damagerolls(enemyChar){

        let totaldamage=0;

        let min = Math.ceil(1);
        let max = Math.floor(this.data.skl_dicetype);

        for (let i = 0; i < this.data.skl_diceamount; i++) {

            let rolleddamage = Math.floor(Math.random() * (max - min + 1)) + min;
            totaldamage = totaldamage + rolleddamage;
        }

        totaldamage = totaldamage + this.data.skl_truedamage;
        this.healthreduction(enemyChar,totaldamage);

    }

    async healthreduction(damagedChar,totaldamage){

        damagedChar.data.mch_hp -= totaldamage;
        console.log('success')
        await updateMatchCharacter(damagedChar.mch_id, damagedChar);

    }

}