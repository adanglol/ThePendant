// Author : Aaron Dangc

// Ensure Our Game runs
console.log("Game is running");
gamePaused = false;

// Add fullscreen button
function addFullscreenButton(scene) {
    // Add fullscreen button
    const fullScreenButton = scene.add.image(config.scale.width - 16, 16, 'fullscreen', 0)
      .setOrigin(.9, 0.1)
      .setInteractive()
      .setScale(0.1);
    fullScreenButton.on('pointerup', function () {
      if (scene.scale.isFullscreen) {
        fullScreenButton.setFrame(0);
        scene.scale.stopFullscreen();
      } else {
        fullScreenButton.setFrame(1);
        scene.scale.startFullscreen();
      }
    });
  }


class Menu extends Phaser.Scene {
    constructor() {
      super('Menu');
    }
  
    preload() {
      // Load fullscreen button
      this.load.image('fullscreen', 'lib/assets/fullscreen.png');
      // Load Pause and Play button
      this.load.image('pause', 'lib/assets/pause.png');
      this.load.image('play', 'lib/assets/play.png'); 
      // Font for menu
      this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }
  
    create() {
        WebFont.load({
          google: {
            families: ['Gloria Hallelujah'],
          },
          active: () => {
            const centerX = this.game.config.width / 2;
            const centerY = this.game.config.height / 2;
            const titleText = this.add.text(centerX - 300,0, 'The Pendant ', { fontSize: '60px', fill: '#000' , fontFamily: 'Gloria Hallelujah'})
            titleText.alpha = 0;
            this.tweens.add({
              targets: titleText,
              alpha: 1,
              duration: 2000,
              ease: 'Power2',
              onComplete: () => {
                let start = this.add.text(40, 250, 'Start', { fontFamily: 'Gloria Hallelujah', fontSize: '42px', fill: '#000' });
                start.alpha = 0;
                this.tweens.add({
                  targets: start,
                  alpha: 1,
                  duration: 2000,
                  ease: 'Power2',
                  onComplete: () => {
                    start.setInteractive();
                    start.on('pointerup', () => {
                      console.log('Start')
                      this.scene.start('Game');
                    });
                  }
                });
              }
            });
          },
        });
        // Add fullscreen button
        addFullscreenButton(this);
    }
    update() {
    }
  }

  class Game extends Phaser.Scene {
    constructor() {
      super('Game');
    }
  
    preload() {
      // Load fullscreen button
      this.load.image('fullscreen', 'lib/assets/fullscreen.png');
      // Load Pause and Play button
      this.load.image('pause', 'lib/assets/pause.png');
      this.load.image('play', 'lib/assets/play.png'); 
    }
  
    create() {
      // Add fullscreen button
      addFullscreenButton(this);

      // change background color of 
      this.cameras.main.setBackgroundColor('#ffff00');

      // Create a static group
      this.platforms = this.physics.add.staticGroup();

      // Create the ground as a rectangle and add it to the group
      let ground = this.add.rectangle(400, 580, 800, 50, 0xf000f0);
      this.physics.add.existing(ground, true);
      ground.body.immovable = true;
      this.platforms.add(ground);

     
      
      // Create other rectangles and add them to the group - OUR PLATFORMS
      let platform1 = this.add.graphics();
      platform1.fillStyle(0x000000);
      platform1.fillRect(500, 400, 200, 25);
      this.physics.add.existing(platform1, true);
      platform1.body.immovable = true;
      this.platforms.add(platform1);

      let platform2 = this.add.graphics();
      platform2.fillStyle(0x000000);
      platform2.fillRect(100, 250, 100, 25);
      this.physics.add.existing(platform2, true);
      platform2.body.immovable = true;
      this.platforms.add(platform2);

      let platform3 = this.add.graphics();
      platform3.fillStyle(0x000000);
      platform3.fillRect(650, 200, 150, 25);
      this.physics.add.existing(platform3, true);
      platform3.body.immovable = true;
      this.platforms.add(platform3);

      // player
      let playerSprite = this.add.graphics();
      playerSprite.fillStyle(0x0000ff);
      playerSprite.fillRect(0, 0, 50, 50);
      playerSprite.generateTexture('player', 50, 50);
      playerSprite.destroy();
      this.player = this.physics.add.sprite(400,405,'player');
      this.player.setScale(5.3);
      this.physics.add.existing(this.player, true);
      this.player.body.setCollideWorldBounds(true);

      // so player does not fall
      this.physics.add.collider(this.player, this.platforms);

      // add keyboard controls
      this.cursors = this.input.keyboard.createCursorKeys();



      


            
    }
    update() {
      // player movement left and right
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-260);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }

      // player jump
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }


      

    }
    
  }












  
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: 'game-container',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 },
        debug: true
      },
    },
    style : {
      border : '10px solid black'
    },
    scene: [ Game, Menu ],
    backgroundColor: '#8fffff',
  };
  
  const game = new Phaser.Game(config);
  