// Author : Aaron Dangc

// Ensure Our Game runs
console.log("Game is running");



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
      this.load.image('fullscreen', 'lib/assets/fullscreen.png');
    }
  
    create() {
      // Add fullscreen button
        addFullscreenButton(this);
  
      
    }
  }
  
  const config = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: 'game-container',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 800,
      height: 600
    },
    scene: [ Menu ],
    backgroundColor: '#8fffff'
  };
  
  const game = new Phaser.Game(config);
  