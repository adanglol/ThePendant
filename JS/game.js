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
                      this.scene.start('MyGame');
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

  class MyGame extends Phaser.Scene {
    constructor() {
      super({ key: 'MyGame' });
    }
    preload() {
      // Load assets for all gameplay scenes
      // this.load.image('fullscreen', 'lib/assets/fullscreen.png');
      this.load.image('pause', 'lib/assets/pause.png');
      this.load.image('play', 'lib/assets/play.png');
      this.load.image('background', 'lib/assets/brick.jpg');
      this.load.image('fullscreen', 'lib/assets/fullscreen.png');
      this.load.image('pendant', 'lib/assets/pendant.png');
      // ... other assets ...
    }
    create() {
      // Create a physics world for all gameplay scenes
      this.physics.world.setBounds(0, 0, 800, 600);
      this.physics.world.gravity.y = 1000;
      // Create three separate gameplay scenes
      const scene1 = new GameplayScene1({ key: 'GameplayScene1' });
      const scene2 = new GameplayScene2({ key: 'GameplayScene2' });
      const scene3 = new GameplayScene3({ key: 'GameplayScene3' });
      // Add each gameplay scene to the main scene
      this.scene.add('GameplayScene1', scene1);
      this.scene.add('GameplayScene2', scene2);
      this.scene.add('GameplayScene3', scene3);
      // Start with the first gameplay scene
      this.scene.start('GameplayScene1');
    }
  }
  
  // Define each gameplay scene as a separate subclass of Phaser.Scene
  class GameplayScene1 extends Phaser.Scene {
    // ... implement gameplay for scene 1 ..
    constructor() {
      super({ key: 'GameplayScene1' });
      this.platform7 = null;
      this.hello = 1;
      this.pendant = null;
      this.platforms = null;
      this.player = null;
      this.cursors = null;
    }
    create(){
      // Add background
      this.background = this.add.image(0, 0, 'background', 0);
      this.background.setScale(.8);
      // Add fullscreen button
      addFullscreenButton(this);


      // Create a static group
      this.platforms = this.physics.add.staticGroup();
      // Create the ground as a rectangle and add it to the group
      let ground = this.add.rectangle(400, 580, 800, 50, 0x333333);
      this.physics.add.existing(ground, true);
      ground.body.immovable = true;
      this.platforms.add(ground);


      // Create a platform as a rectangle and add it to the group
      // (x, y, width, height, color)
      // red
      let platform1 = this.add.rectangle(400, 400, 100, 20, 0xFF0000);
      this.physics.add.existing(platform1, true);
      platform1.body.immovable = true;
      this.platforms.add(platform1);
      // Create a platform as a rectangle and add it to the group
      // pink
      let platform2 = this.add.rectangle(700, 450, 100, 20, 0xf000f0);
      this.physics.add.existing(platform2, true);
      platform2.body.immovable = true;
      this.platforms.add(platform2);
      // Create a platform as a rectangle and add it to the group - green
      // light green
      let platform3 = this.add.rectangle(200, 500, 200, 20, 0x00ff00);
      this.physics.add.existing(platform3, true);
      platform3.body.immovable = true;
      this.platforms.add(platform3);
      // Create a platform as a rectangle and add it to the group
      // darl blue
      let platform4 = this.add.rectangle(450, 200, 100, 20, 0x0000ff);
      this.physics.add.existing(platform4, true);
      platform4.body.immovable = true;
      this.platforms.add(platform4);
      // Create a platform as a rectangle and add it to the group
      let platform5 = this.add.rectangle(700, 250, 100, 20, 0x00ffff);
      this.physics.add.existing(platform5, true);
      platform5.body.immovable = true;
      this.platforms.add(platform5);
      // Create a platform as a rectangle and add it to the group
      let platform6 = this.add.rectangle(800, 350, 100, 20, 0x0f4f00);
      this.physics.add.existing(platform6, true);
      platform6.body.immovable = true;
      this.platforms.add(platform6);

      //final platform
      this.platform7 = this.add.rectangle(150, 200, 100, 20, 0x000f00);
      this.physics.add.existing(this.platform7, true);
      this.platform7.body.immovable = true;
      this.platform7.setVisible(false);
      this.platform7.body.enable = false;
      // this.platforms.add(this.platform7);

      // pendant
      this.pendant = this.physics.add.sprite(game.config.width - 50, 50, 'pendant');
      this.pendant.setScale(.2);
      this.pendant.setCollideWorldBounds(true);
      this.pendant.setGravityY(300);
      this.pendant.setSize(150, 150);
      this.physics.add.existing(this.pendant, true);
      this.physics.add.collider(this.pendant, ground);
      // this.platforms.add(this.pendant);

      // Set the hitbox to a circle with a radius of 75
      this.pendant.body.setCircle(90);
      // Set the hitbox offset from the top of the sprite to the bottom of the hitbox
      this.pendant.body.setOffset(45, 45);
  
      // player
      let playerSprite = this.add.graphics();
      playerSprite.fillStyle(0x0000ff);
      playerSprite.fillRect(0, 0, 50, 50);
      playerSprite.generateTexture('player', 50, 50);
      playerSprite.destroy();
      this.player = this.physics.add.sprite(20,500,'player');
      this.player.setScale(.4,1.5);
      this.physics.add.existing(this.player, true);
      this.player.body.setCollideWorldBounds(true);
      // so player does not fall
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.player, this.pendant, this.collectPendant, null, this);
      this.physics.add.collider(this.player, this.platform7, this.goNext, null, this);


      // add keyboard controls for continuous movement left and right
      this.cursors = this.input.keyboard.createCursorKeys();
      // add keyboard controls for jumping
      const spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      spacebar.on('down', () => {
        if (this.player.body.touching.down) {
          this.player.setVelocityY(-320);
        }
      })

    }
    update(){
      // player movement left and right
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }
      // player jump
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-320);
      }
      // Update the position of the background based on the player's movement
      this.background.y -= this.player.body.velocity.y * this.game.loop.delta / (1000 * 2);
    };
    collectPendant(player, pendant) {
      pendant.destroy();
      console.log('pendant collected');
      console.log(player);
      // console.log(pendant);
      this.platform7.setVisible(true);
      this.platform7.body.enable = true;
    };
    goNext(){
      this.scene.start('GameplayScene2');
    }

  }


  class transition2 extends Phaser.Scene {
  }
  
  class GameplayScene2 extends Phaser.Scene {
    // ... implement gameplay for scene 2 ...
    constructor() {
      super('GameplayScene2');
    }
    create(){

      // add fullscreen button
      addFullscreenButton(this);
      // adding platforms
      this.platforms = this.physics.add.staticGroup();

      // Create the ground as a rectangle and add it to the group
      let ground = this.add.rectangle(400, 580, 800, 50, 0x333333);
      this.physics.add.existing(ground, true);
      ground.body.immovable = true;
      this.platforms.add(ground);

      // Create a platform as a rectangle and add it to the group
      let platform1 = this.add.rectangle(400, 400, 100, 20, 0x00ffff);
      this.physics.add.existing(platform1, true);
      platform1.body.immovable = true;
      this.platforms.add(platform1);


      let playerSprite = this.add.graphics();
      playerSprite.fillStyle(0x0000ff);
      playerSprite.fillRect(0, 0, 50, 50);
      playerSprite.generateTexture('player', 50, 50);
      playerSprite.destroy();
      this.player = this.physics.add.sprite(20,500,'player');
      this.player.setScale(.4,1.5);
      this.physics.add.existing(this.player, true);
      this.player.body.setCollideWorldBounds(true);
      // so player does not fall
      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.player, this.pendant, this.collectPendant, null, this);
      this.physics.add.collider(this.player, this.platform7, this.goNext, null, this);

      // add keyboard controls for continuous movement left and right
      this.cursors = this.input.keyboard.createCursorKeys();



      // Create Pendent
      // pendant
      this.pendant = this.physics.add.sprite(0 , 460, 'pendant');
      this.pendant.setScale(.2);
      this.pendant.setCollideWorldBounds(true);
      this.pendant.setGravityY(-400);
      this.pendant.setSize(150, 150);
      this.physics.add.existing(this.pendant, true);
      this.physics.add.collider(this.pendant, ground);

       // Set the hitbox to a circle with a radius of 75
       this.pendant.body.setCircle(90);
      // Set the hitbox offset from the top of the sprite to the bottom of the hitbox
      this.pendant.body.setOffset(45, 45);

      this.input.on('pointerdown',  (pointer) => {
        
      });
        
      
    }
    update(){
      // player movement left and right
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
      } else {
        this.player.setVelocityX(0);
      }
      // player jump
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-320);
      }
    }

  }


  class transition3 extends Phaser.Scene {
  }

  
  class GameplayScene3 extends Phaser.Scene {
    // ... implement gameplay for scene 3 ...
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
        debug: false,
      },
    },
    style : {
      border : '10px solid black'
    },
    scene: [Menu,MyGame,],
    backgroundColor: '#8fffff',
  };
  
  const game = new Phaser.Game(config);
  