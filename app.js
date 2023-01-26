new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        countAttack: 0,
        levelUpMonster: 20,
        activeSpecialAttack: false,
        turns: [],
    },
    methods: {
        startNewGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        atTack: function() {
            //Monster
            if(this.checkPlayerOption()){
                return;
            }
            this.playerAttack();
            this.monsterAttack();            
            this.countAttack += 1
            if(this.countAttack >= 3){
                this.activeSpecialAttack = true;
            }
            
        },
        specialAttack: function() {
            if(this.checkPlayerOption()){
                return true; 
            }
            if(this.countAttack >= 3) { 
                
                damage = this.inputDamge(10, 18)
                this.monsterHealth -= damage;
                this.turns.unshift({
                    isPlayer: true,
                    textLog:'quái bị trừ máu' + damage
                })
                //player
                this.monsterAttack();
                this.countAttack = 0
                this.activeSpecialAttack = false;
            }
            
            
        },
        upDateMonster: function() {
            return this.monsterHealth += 20
        },
        inputDamge: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        playerAttack: function(){
            damage = this.inputDamge(5, 10)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                textLog:'quái bị trừ máu' + damage
            })
            setTimeout(()=>{
                this.turns.shift();
            },2000)
            //player
        },
        monsterAttack: function() {
            damage = this.inputDamge(4, 10)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                textLog:'người bị trừ máu' + damage
            })
            setTimeout(()=>{
                this.turns.shift();
            },2000)
            //monster
        },
        checkPlayerOption: function(){
            if(this.monsterHealth <= 0) {
                if(confirm('Bạn đã thắng có muốn chơi game mới hay không?')) {
                    this.startNewGame();
                    this.upDateMonster();
                    //this.gameIsRunning = true;
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0) {
                if(confirm('Bạn đã thua có muốn chơi game mới hay không?')) {
                    this.startNewGame();
                    //this.gameIsRunning = true;
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return;
        }
    }
})