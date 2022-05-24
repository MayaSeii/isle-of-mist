class Skills {

    constructor(data) {
        
        this.data = data;
        this.rangeBool=false;
        this.apBool=false;

    }

    skillaction(currentChar,enemyChar){

        if(this.data.skl_id == 4){

            this.skillrange(currentChar,enemyChar);
            if (this.rangeBool==true) this.skillcost(currentChar,enemyChar);
            if (this.apBool==true) this.damagerolls(currentChar,enemyChar);

        }

        if(this.data.skl_id == 5){

            this.skillrange(currentChar,enemyChar);
            if (this.rangeBool==true) this.skillcost(currentChar,enemyChar);
            if (this.apBool==true) this.damagerolls(currentChar,enemyChar);
            if (this.apBool==true) this.movementskills(currentChar,enemyChar);

        }

        if(this.data.skl_id == 6){

            this.skillrange(currentChar,enemyChar);
            if (this.rangeBool==true) this.skillcost(currentChar,enemyChar);
            if (this.apBool==true) this.damagerolls(currentChar,enemyChar);
            if (this.apBool==true) this.skillWhip(currentChar,enemyChar);

        }

        if(this.data.skl_id == 9){

            this.skillrange(currentChar,enemyChar);
            if (this.rangeBool==true) this.skillcost(currentChar,enemyChar);
            if (this.apBool==true) this.skillFlip(currentChar,enemyChar);

        }

        if(this.data.skl_id == 10){

            this.skillrange(currentChar,enemyChar);
            if (this.rangeBool==true) this.skillcost(currentChar,enemyChar);
            if (this.apBool==true) this.damagerolls(currentChar,enemyChar);
            if (this.apBool==true) this.movementskills(currentChar,enemyChar);

        }

        if(this.data.skl_id == 12){

            this.skillrange(currentChar,enemyChar);
            if (this.rangeBool==true) this.skillcost(currentChar,enemyChar);
            if (this.apBool==true) this.damagerolls(currentChar,enemyChar);
            if (this.apBool==true) this.movementskills(currentChar,enemyChar);

        }
        
    }

    async skillrange(currentChar,enemyChar){

        this.rangeBool=false;

        let xPos = currentChar.data.mch_positionx;
        let yPos = currentChar.data.mch_positiony;
        let xPosEnemy = enemyChar.data.mch_positionx;
        let yPosEnemy = enemyChar.data.mch_positiony;
        console.log(xPos)
        console.log(xPosEnemy)
        console.log(yPos)
        console.log(yPosEnemy)

            if(xPos >= xPosEnemy + this.data.skl_range && yPos==yPosEnemy) this.rangeBool=true;
            else if(xPos <= xPosEnemy - this.data.skl_range && yPos==yPosEnemy) this.rangeBool=true;
            else if(xPos == xPosEnemy && yPos>=yPosEnemy + this.data.skl_range) this.rangeBool=true;
            else if(xPos == xPosEnemy && yPos<=yPosEnemy - this.data.skl_range) this.rangeBool=true;
            else console.log('Out of range');
        
    }

    skillcost(currentChar){

        this.apBool=false;

        if(this.data.mcs_canuse==false || this.data.mcs_canuse==null){//need to fix need to turn canuse to true 

            if( currentChar.data.mch_ap >= this.data.skl_cost){

                currentChar.data.mch_ap = currentChar.mch_ap - this.data.skl_cost;

                this.apBool=true;

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

    healthreduction(damagedChar,totaldamage){

        console.log('char before damage:'+damagedChar.data.mch_hp)
        damagedChar.data.mch_hp -= totaldamage;
        console.log('char after damage:'+damagedChar.data.mch_hp)
        console.log('successful atck')

    }

    movementskills(currentChar,enemyChar){

        let xPos = currentChar.data.mch_positionx;
        let yPos = currentChar.data.mch_positiony;
        let xPosEnemy = enemyChar.data.mch_positionx;
        let yPosEnemy = enemyChar.data.mch_positiony;

        //not sure how we going to get direction hard code

        this.direction='right';
        
        console.log('enemy position before :'+yPosEnemy)
        console.log('me position before :'+yPos)

        if(this.data.skl_id != 5){//flame trace
        if(this.direction=='up') xPosEnemy+=this.data.skl_area;
        else if(this.direction=='down') xPosEnemy-=this.data.skl_area;
        else if(this.direction=='left') yPosEnemy-=this.data.skl_area;
        else if(this.direction=='right') yPosEnemy+=this.data.skl_area;
        }

        if(this.data.skl_id != 10){//shield bash
            if(this.direction=='up') xPos+=(this.data.skl_area-1);
            else if(this.direction=='down') xPos-=(this.data.skl_area+1);
            else if(this.direction=='left') yPos-=(this.data.skl_area+1);
            else if(this.direction=='right') yPos+=(this.data.skl_area-1);
        }
        else currentChar.data.mch_isguarding=true; 

        console.log('enemey postion after:'+yPosEnemy)
        console.log('blocking'+currentChar.data.mch_isguarding)
        console.log('me postion after:'+yPos)

    }

    skillWhip(currentChar,enemyChar){

        let xPos = currentChar.data.mch_positionx;
        let yPos = currentChar.data.mch_positiony;
        let xPosEnemy = enemyChar.data.mch_positionx;
        let yPosEnemy = enemyChar.data.mch_positiony;

        //not sure how we going to get direction hard code

        this.direction='up';
        
        console.log('enemy position before :'+xPosEnemy)
        console.log('me position before :'+xPos)


        if(this.direction=='up') xPosEnemy=(xPos+1);
        else if(this.direction=='down') xPosEnemy=(xPos-1);
        else if(this.direction=='left') yPosEnemy=(yPos-1);
        else if(this.direction=='right') yPosEnemy=(yPos+1);

        console.log('enemey postion after:'+xPosEnemy)
        console.log('me postion after:'+xPos)

    }

    skillFlip(currentChar,targetChar){

        let xPos = currentChar.data.mch_positionx;
        let yPos = currentChar.data.mch_positiony;
        let xPosTarget = targetChar.data.mch_positionx;
        let yPosTarget = targetChar.data.mch_positiony;

        //not sure how we going to get direction hard code
        
        console.log('target position before :'+xPosTarget)
        console.log('me position before :'+xPos)

        if(xPosTarget<xPos) xPosTarget=(xPos+1);
        else if(xPosTarget>xPos) xPosTarget=(xPos-1);
        else if(yPosTarget>yPos) yPosTarget=(yPos-1);
        else if(yPosTarget>yPos) yPosTarget=(yPos+1);

        console.log('target postion after:'+xPosTarget)
        console.log('me postion after:'+xPos)

    }

}