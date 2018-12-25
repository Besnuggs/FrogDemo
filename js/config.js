window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const speechToText = document.querySelector('#speechToText');
const recognition = new SpeechRecognition()


const config = {
    type: Phaser.AUTO, //Which renderer to use
    width: 1000, //Canvas width in pixels
    height: 600, //Canvas height in pixels
    parent: 'froggy', //ID of the DOM element to add the canvas
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500}, //will affect our player sprite
            debug: false // change if needed.
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    },
};


//Instance of Phaser.Game upon loading window
const game = new Phaser.Game(config);

//Variables - All defined in creation
let player;
let flag;
let background;
let map;
let tileSet;
let layer;

function preload(){
    // Runs one time, loads up assets likes images and audio
    this.load.crossOrigin = "Anonymous"
    
    //importing images for frog and flag
    this.load.image('froggy', 'https://besnuggs.github.io/media/froggy.png')
    this.load.image('flag', 'https://besnuggs.github.io/media/flag.png')

    //importing tile sheet for background and 
    this.load.image('tiles', 'https://besnuggs.github.io/assets/FreeTileSet.png')
    this.load.tilemapTiledJSON('map', 'https://besnuggs.github.io/assets/froggyMap.json')
}



function create(){
    //When loading from an array, make sure to specify the tileWidth and tileHeight
    map = this.add.tilemap('map')
    tileSet = map.addTilesetImage('kenney_16x16', 'tiles')
    layer = map.createDynamicLayer('kenny_16x16.tsx', tileSet)
    

    //Creating a player 'froggy' and 'flag' with specified dimensions and coordinates.
    player = this.add.sprite(200, 550, "froggy")
    player.displayWidth = 32
    player.displayHeight = 32
    
    
    flag = this.add.sprite(900, 550, "flag")
    flag.displayWidth=32
    flag.displayHeight=32
   
    

    // Arrow Key Controls
    this.input.keyboard.on('keydown_LEFT', function (event) {
        player.x += -50
      });

    this.input.keyboard.on('keydown_RIGHT', function (event) {
        player.x += 50
      });
   
    this.input.keyboard.on('keydown_UP', function (event) {
        player.y += -50
      });

      this.input.keyboard.on('keydown_DOWN', function (event) {
        player.y += 50
      }); 
}

function update(time, delta) {
    if (player.x === flag.x && player.y === flag.y){
        alert('You win!')
        player.x = 200
        player.y = 500
    }

    recognition.onresult = function(e){
        let current = e.resultIndex;
        let transcript = e.results[current][0].transcript;
        console.log(transcript)
        if(transcript === 'left'){
            player.x += -50
        } else if (transcript === 'right'){
            player.x += 50
        } else if (transcript === 'up'){
            player.y += -50
        } else if (transcript === 'down'){
            player.y += 50
        }
    }
  }


  //speech recognition initialization
  recognition.addEventListener('end', recognition.start)
  recognition.start()