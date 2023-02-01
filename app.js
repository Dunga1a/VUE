new Vue({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        countAttack: 0,
        levelUpMonster: 20,
        activeSpecialAttack: false,
        activeSpecialVideos: false,
        activeHealing: false,
        activeBlows: false,
        activeVideos: false,
        turnsPlayer: [],
        turnsMonster: [],
        localValue: localStorage.setItem('cat', 100),
        display: 'none',
    },
    methods: {
        startNewGame: function() {
                this.activeVideos = true;
                this.$refs.video.play();

            setTimeout(()=>{
                this.gameIsRunning = true;
                this.playerHealth = 100;
                this.monsterHealth = 100;
            },8000)
            
            
            
            // if (localStorage.monsterHealth) {
            //     var h = localStorage.setItem('monsterHealth', this.monsterHealth);
            //   }
            
        },
        
        atTack: function() {
            //Monster
            if(this.checkPlayerOption()){
                return;
            }
            this.activeBlows = true;
            setTimeout(()=>{
                this.activeBlows = false;
            },1000)
            this.playerAttack();
            this.monsterAttack();            
            this.countAttack += 1
            if(this.countAttack >= 3){
                this.activeSpecialAttack = true;
            }
            this.display = "block"
            if(this.display == "block"){
                this.display = 'none';
            }
            
        },
        specialAttack: function() {
            if(this.checkPlayerOption()){
                return true; 
            }
            if(this.countAttack >= 3) {
                this.activeSpecialVideos = true;
                this.$refs.video2.play();
                setTimeout(()=>{
                    this.activeSpecialVideos = false;
                },8000)
                damage = this.inputDamge(13, 18)
                this.monsterHealth -= damage;
                this.turnsPlayer.unshift({
                    isPlayer: true,
                    textLog:'-' + damage
                })
                //player
                this.monsterAttack();
                setTimeout(()=>{
                    this.turnsPlayer.shift();
                },400)
                this.countAttack = 0
                this.activeSpecialAttack = false;
            }
            
            
        },
        health: function() {
            if(this.checkPlayerOption()){
                return true; 
            }
            if(this.playerHealth > 70) {
                alert('Máu của bạn phải nhỏ hơn 70%')
                return false;
            }else if(this.playerHealth <= 70) {
                this.activeHealing = true;
                heal = this.playerHealth += 10;

                this.turnsPlayer.unshift({
                    textLog: 0,
                    health: '+' + heal
                })
                setTimeout(()=>{
                    this.turnsPlayer.shift();
                },400)
                
            }else {
                this.playerHealth = 70
            }
            this.monsterAttack();
        }
        ,
        upDateMonster: function() {
            const cat = localStorage.getItem('cat');
            const value = 20 + parseInt(cat)
            localStorage.setItem('cat', parseInt(value))
            this.monsterHealth = value
            this.playerHealth = 100
            return this.monsterHealth
        },
        giveUp: function() {
            confirm('Bạn có muốn bỏ cuộc không?')
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        inputDamge: function(minDamage, maxDamage) {
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        playerAttack: function(){
            damage = this.inputDamge(5, 10)
            this.monsterHealth -= damage;
            this.turnsPlayer.unshift({
                isPlayer: true,
                textLog:'-' + damage,
            })
            setTimeout(()=>{
                this.turnsPlayer.shift();
            },400)
            //player
        },
        monsterAttack: function() {
            damage = this.inputDamge(4, 10)
            this.playerHealth -= damage;
            this.turnsMonster.unshift({
                isPlayer: false,
                textLog:'-' + damage
            })
            setTimeout(()=>{
                this.turnsMonster.shift();
            },400)
            //monster
        },
        checkPlayerOption: function(){
            if(this.monsterHealth <= 0) {
                if(confirm('Bạn đã thắng có muốn chơi game mới hay không?')) {
                    //this.startNewGame();
                    this.upDateMonster();
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0) {
                if(confirm('Bạn đã thua có muốn chơi game mới hay không?')) {
                    this.gameIsRunning = true;
                    this.playerHealth = 100;
                    this.monsterHealth = 100;
                    //this.gameIsRunning = true;
                }else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return;
        }
    },
    // watch: {
    //     monsterHealth(newHealth) {
    //         localStorage.getItem('monsterHealth', parseInt(20 + this.monsterHealth));
    //     }
    // }
})