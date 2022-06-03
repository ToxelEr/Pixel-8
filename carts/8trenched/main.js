var cartridge_name = '8trenched';
var cartridge_author = 'james1236';

var initialized = false;
var ready = false;
var game_width = 64;
var game_height = 64;

boot(game_width,game_height);

var camera = {x:0, y:(-Math.floor(game_height/4))};
var player = {x:Math.floor(game_width/2), y:0};

var fallTimer = 0;

var simplex;

//Create game area
var gameArea = [];
for (let y = 0; y < game_height; y++) {
	gameArea.push([]);
	for (let x = 0; x < game_width; x++) {
		gameArea[gameArea.length-1].push("air");
	}
}

var modifications = [{x:player.x, y:player.y, type:"air"}]; //All player modifications to default terrain (placed and removed blocks) go here

function init() {
	initialized = true;
	
	//Load simplex noise
	var script = document.createElement('script');
	script.onload = function () {
		//Once simplex script is loaded
		simplex = new SimplexNoise(Math.trunc(Math.random*10000000000));
		
		//Fill starting area with tiles
		loadAllTiles();
		drawAllTiles();
		ready = true;
	};
	script.src = "carts/8trenched/simplex-noise.js";

	document.head.appendChild(script);
}

function loadAllTiles() {
	for (let y = 0; y < game_height; y++) {
		for (let x = 0; x < game_width; x++) {
			gameArea[y][x] = getTileType(x + camera.x, y + camera.y);
		}
	}
	gameArea[player.y - camera.y][player.x - camera.x] = "player";
}

function drawAllTiles() {
	for (let y = 0; y < game_height; y++) {
		for (let x = 0; x < game_width; x++) {
			pset(x,y,palette[tileToColor(gameArea[y][x])]);
		}
	}
}

function tileToColor(tileType) {
	switch (tileType) {
		case "air":
			return 25; //109		
		case "air-deep":
			return 2;
		case "stone":
			return 29; //186
		case "player":
			return 5;
		case "dirt":
			return 1;
		case "grass1":
			return 23;		
		case "grass2":
			return 22;
		case "grass3":
			return 21;
		case "ladder":
			return 29;
		case "black":
			return 31;
		default:
			return 29;
	}
}

function getTileType(x,y) {
	tileType = "air";
	//Cave spaghetti type
	if (Math.abs(simplex.noise2D(x*0.1,y*0.1)) > 0.25) {
		tileType = "stone";
	}	
	
	//Cave pocket type
	if (simplex.noise2D(x*0.025,y*0.025) > 0.65) {
		tileType = "air";
	}
	
	//Stone to Dirt
	if (tileType == "stone" && simplex.noise2D(x*0.05,0)*0.25 > -1+(y/30)) {
		tileType = "dirt";
	}
	
	//Dirt to Grass
	if (tileType == "dirt" && simplex.noise2D(x*0.05,0)*0.25 > -0.5+(y/30)) {
		tileType = "grass";
		
		//Random shade of grass
		rng = simplex.noise2D(x,y);
		if (rng > 0.33) {
			if (rng > 0.66) {
				tileType+="2";
			} else {
				tileType+="3";
			}
		} else {
			tileType+="1";
		}
	}
	
	//Sky
	if (simplex.noise2D(x*0.05,0)*0.25 > -0.4+(y/30)) {
		tileType = "air";
	}
	
	//Modifications
	let minDistance = Infinity;
	for (mod of modifications) {
		if (mod.x == x && mod.y == y) {
			tileType = mod.type;
		}
		distance = Math.abs(mod.x-x)+Math.abs(mod.y-y);
		if (distance < minDistance) {
			minDistance = distance;
		}
	}
	
	//Blacked out
	if (minDistance > 25) {
		tileType = "black";
	}
	
	//Air to Deep Air
	if (tileType == "air" && isDeep(x,y)) {
		tileType = "air-deep";
	}
	
	return tileType;
}

function isDeep(x,y) {
	return simplex.noise2D(x*0.05,0)*0.25 < -0.5+(y/30);
}

function update() {
  
  requestAnimationFrame(update)
  
	//Tick function
	if (!initialized) {
		init();
	}
	if (!ready) {
		return;
	}
	
	fallTimer = Math.max(fallTimer-1,0);
	

	
	//Fall when air below player
	if (fallTimer < 2) {
		if (gameArea[player.y - camera.y + 1][player.x - camera.x].includes("air")) {
			//Add modification unnessecarily to update blacked out tiles
			airType = (isDeep(player.x,player.y)) ? "air-deep" : "air";
			modifications.push({x:player.x,y:player.y,type:airType});
			
			fallTimer = 5;
			player.y++;
			camera.y++;
			
			loadAllTiles();
		}
	}
	
	drawAllTiles();
}

requestAnimationFrame(update);

//Movement

function btn_up() {
	if (fallTimer > 0) {
		return;
	}
	if (gameArea[player.y - camera.y - 1][player.x - camera.x].includes("unbreakable")) {
		return;
	}
	
	modifications.push({x:player.x,y:player.y,type:"ladder"});
	camera.y--;
	player.y--;
	
	
	loadAllTiles();
}

function btn_down() {
	if (fallTimer > 0) {
		return;
	}
	if (gameArea[player.y - camera.y + 1][player.x - camera.x].includes("unbreakable")) {
		return;
	}
	
	airType = (isDeep(player.x,player.y)) ? "air-deep" : "air";
	modifications.push({x:player.x,y:player.y,type:airType});
	camera.y++;
	player.y++;
	
	
	loadAllTiles();
}

function btn_left() {
	if (fallTimer > 0) {
		return;
	}
	if (gameArea[player.y - camera.y][player.x - camera.x - 1].includes("unbreakable")) {
		return;
	}
	
	airType = (isDeep(player.x,player.y)) ? "air-deep" : "air";
	modifications.push({x:player.x,y:player.y,type:airType});
	camera.x--;
	player.x--;
	
	loadAllTiles();
	
}

function btn_right() {
	if (fallTimer > 0) {
		return;
	}
	if (gameArea[player.y - camera.y][player.x - camera.x + 1].includes("unbreakable")) {
		return;
	}
	
	airType = (isDeep(player.x,player.y)) ? "air-deep" : "air";
	modifications.push({x:player.x,y:player.y,type:airType});
	camera.x++;
	player.x++;
	
	loadAllTiles();
}
