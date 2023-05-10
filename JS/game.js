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
      // Add pause button
     
    }
    update() {
      

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
    style : {
      border : '10px solid black'
    },
    scene: [ Menu, Game],
    backgroundColor: '#8fffff'
  };
  
  const game = new Phaser.Game(config);
  