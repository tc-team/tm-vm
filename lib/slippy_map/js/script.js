var localLatitude = 50.450574;
var localLongitude = 30.522981;

var WORKER_PATH = 'js/worker.js';
	
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    console.log("Geolocation is not supported by this browser.");
}

function showPosition(position) {
	localLatitude = position.coords.latitude;
	localLongitude = position.coords.longitude;
}

function long2tile(lon, zoom) { 
	return ((lon+180)/360*Math.pow(2,zoom)); 
}

function lat2tile(lat,zoom) { 
	return ((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)); 
}

function tile2long(x,z) {
  	return (x/Math.pow(2,z)*360-180);
}

function tile2lat(y,z) {
  	var n=Math.PI-2*Math.PI*y/Math.pow(2,z);
	return (180/Math.PI*Math.atan(0.5*(Math.exp(n)-Math.exp(-n))));
}

function createCoordsArray(rows, columns, zoom, tileX, tileY) {
	var x = parseInt(tileX) - parseInt(columns / 2);
	var y = parseInt(tileY) - parseInt(rows / 2);

	var arr = new Array(rows);
	var yPosition = y;
	var number = 0;
	for(var i = 0; i < rows; i++) {
		var xPosition = x;
		arr[i] = new Array(columns);
		for(var j = 0; j < columns; j++) {
  			arr[i][j] = {
  				y: yPosition,
  				x: xPosition,
  				itemNum: number
  			};
  			xPosition++;
  			number++;
		}
		yPosition++;
	}
	return arr;
}

function createTiles (tileContainer, positionArray, col, row, divSize) {
	var top = 0;
	var left = 0;
	var count = 0;
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			var div = document.createElement('DIV');
			var span = document.createElement('SPAN');
			span.innerHTML = '(' + positionArray[i][j].y +' : ' + positionArray[i][j].x +')';
			div.style.top = top + 'px';
			div.style.left = left + 'px';
			tileContainer.appendChild(div);
			var img = new Image();
			img.setAttribute('id', 'tile_img_' + count++);
			div.appendChild(img);
			div.appendChild(span);
			left += divSize;
		}		
		top += divSize;
		left = 0;
	}
	return tileContainer.childNodes;
}

window.onload = function () {
	// Define map container 
	var map = document.querySelector('#map');
	var mapWidth = map.offsetWidth;
	var mapHeight = map.offsetHeight;
	var divSize = 256;
	
	//find number of tiles  row * col
	var columns = Math.ceil(mapWidth / divSize) + 2;
	var rows = Math.ceil(mapHeight / divSize) + 2;
	
	var offsetX = -(((columns * divSize) - mapWidth) / 2);
	var offsetY = -(((rows * divSize) - mapHeight) / 2);

	var centerOffsetX = 0;
	var centerOffsetY = 0;
	var draging = false;

	var tile_container = document.createElement('DIV');
	tile_container.setAttribute('id', 'tile_container');
	map.appendChild(tile_container);

	tile_container.style.width = columns * divSize + 'px';
	tile_container.style.height = rows * divSize + 'px';
	tile_container.style.top = offsetY + 'px';
	tile_container.style.left = offsetX + 'px';
	
	var zoom = 4;
	var xTotal = Math.pow(2, zoom);
	var tileY = lat2tile(localLatitude, zoom);
	var tileX = long2tile(localLongitude, zoom);

	var coordsArray = createCoordsArray(rows, columns, zoom, tileX, tileY);
	var tilesNodes = createTiles(tile_container, coordsArray, columns, rows, divSize);
	var orderedArray = sort(coordsArray, columns, rows);

	var mapStart = false;
	var mapEnd = false;

	map.addEventListener('mousedown', function(evt) {
		draging = true;
		this.style.cursor='pointer';
	});

	map.addEventListener('mouseup', function(evt) {
		draging = false;
		this.style.cursor='initial';
	});

	map.addEventListener('mouseout', function(evt) {
		draging = false;
		this.style.cursor='initial';
	});

	map.addEventListener('mousemove', function(evt) {
		if (!draging) return;			
		centerOffsetX += evt.movementX;
		centerOffsetY += evt.movementY;

		if (centerOffsetX > 0) {
			if (Math.abs(centerOffsetX) > divSize) {
				leftScroll();
			}			
		} else if (centerOffsetX < 0) {
			if (Math.abs(centerOffsetX) > divSize) {
				rightScroll();
			}	
		}

		if (centerOffsetY > 0) {
			if (Math.abs(centerOffsetY) > divSize) {
				topScroll();
				mapEnd = false;
			}	
		} else if (centerOffsetY < 0) {
			if (Math.abs(centerOffsetY) > divSize) {
				bottomScroll();
				mapStart = false;
			}
		}

		tile_container.style.transform = 'translate(' + centerOffsetX + 'px, ' + centerOffsetY + 'px)';
	});
	
	var offsetTop = tile_container.offsetTop;
	var offsetLeft = tile_container.offsetLeft;
	var translateX = 0;
	var translateY = 0;
	var oldZoom = zoom;
	map.addEventListener('wheel', function(evt) {
		oldZoom = zoom;
		if (evt.deltaY > 0) {
			zoom -= 1;
		} else if (evt.deltaY < 0) {
			zoom += 1;
		}
		if (zoom < 0 || zoom > 23) return;

		changeScale(oldZoom, evt.offsetX, evt.offsetY);
	});

	function changeScale(oldZoom, mouseX, mouseY) {
		var offsetTop = Math.abs(tile_container.offsetTop) + mouseY + centerOffsetY;
		var offsetLeft = Math.abs(tile_container.offsetLeft) + mouseX + centerOffsetX;
		var tileXzoomed = offsetLeft / divSize + coordsArray[0][0].x;
		var tileYzoomed = offsetTop / divSize + coordsArray[0][0].y;
		var mouseLat = tile2lat(tileYzoomed, oldZoom);
		var mouseLong = tile2long(tileXzoomed, oldZoom);
		var tileY = lat2tile(mouseLat, zoom);
		var tileX = long2tile(mouseLong, zoom);
		xTotal = Math.pow(2, zoom);
		coordsArray = createCoordsArray(rows, columns, zoom, tileX, tileY);
		addCoordinates(tilesNodes, coordsArray);
		draw(zoom);
	}

	var worker = new Worker(WORKER_PATH);
	var url = 'http://localhost:3000';

	function draw (zoom) {
		orderedArray = sort(coordsArray, columns, rows);
		worker.postMessage({
		    command: 'loadMap',
		    mapArray: orderedArray,
		    url: url,
		    zoom: zoom
		});

		worker.onmessage = function (e) {
		    tilesNodes.item(e.data.tileNumber).firstElementChild.src = url + e.data.tile.dir + e.data.tile.name;
		};
	}

	draw(zoom);

	function leftScroll () {
		var j = 1;
		var div = null;
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			if (i === (columns * j - 1)) {
				tilesNodes.item(i).style.left = '0px';
				div = tilesNodes.item(i);
				div.parentNode.insertBefore(div, div.parentNode.childNodes[(j - 1) * columns]);
				div.firstElementChild.src = '';
				j++;
			} else {
				var left = tilesNodes.item(i).offsetLeft;
				tilesNodes.item(i).style.left = (left + divSize) + 'px';
			}
		};
		centerOffsetX = 0;
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if (coordsArray[i][j].x === 0) {
					coordsArray[i][j].x = xTotal - 1;	
				} else {
		  			coordsArray[i][j].x--;				
				}
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		var self = this;
		var nodeIndex = 0;
		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});

		for(var j = 0; j < rows; j++) {
			var imgId = tilesNodes.item(nodeIndex).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[j][0].x,
			    tileY: coordsArray[j][0].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoom
			});

			worker.onmessage = function (e) {
				var img = document.querySelector('#' + e.data.imgId);
			    img.src = url + e.data.tile.dir + e.data.tile.name;
			};	
			nodeIndex += columns;
		}
	}

	function rightScroll () {
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			var left = tilesNodes.item(i).offsetLeft;
			tilesNodes.item(i).style.left = (left - divSize) + 'px';
		};

		var left = columns * divSize - divSize;
		for (var i = 0; i < rows; i++) {
			var child = (i * columns) + 1;
			var div = tilesNodes.item(child - 1);
			div.style.left = left + 'px';
			div.parentNode.insertBefore(div, div.parentNode.childNodes[((i+1)*columns)]);
			div.firstElementChild.src = '';
		}
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if (coordsArray[i][j].x === xTotal - 1) {
					coordsArray[i][j].x = 0;
				} else {
		  			coordsArray[i][j].x++;				
				}
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}
		centerOffsetX = 0;

		var self = this;
		var nodeIndex = columns;

		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});

		for(var j = 0; j < rows; j++) {
			var imgId = tilesNodes.item(nodeIndex - 1).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[j][columns - 1].x,
			    tileY: coordsArray[j][columns - 1].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoom
			});

			worker.onmessage = function (e) {
			    var img = document.querySelector('#' + e.data.imgId);
			    img.src = url + e.data.tile.dir + e.data.tile.name;
			};
			nodeIndex += columns;
		}
	}

	function bottomScroll () {
		if (coordsArray[rows - 1][0].y === xTotal - 1) {
			mapEnd = true;
			return;
		}
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			var top = tilesNodes.item(i).offsetTop;
			tilesNodes.item(i).style.top = (top - divSize) + 'px';
		};

		var top = rows * divSize - divSize;
		for (var i = 0; i < columns; i++) {
			var div = tilesNodes.item(0);
			div.style.top = top + 'px';
			div.parentNode.insertBefore(div, null);
			div.firstElementChild.src = '';
		}
		
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
	  			coordsArray[i][j].y++;
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		centerOffsetY = 0;
		
		var self = this;
		var nodeIndex = columns * rows - columns;

		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});

		for(var i = 0; i < columns; i++) {
			var imgId = tilesNodes.item(nodeIndex).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[rows - 1][i].x,
			    tileY: coordsArray[rows - 1][i].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoom
			});

			worker.onmessage = function (e) {
			    var img = document.querySelector('#' + e.data.imgId);
			    img.src = url + e.data.tile.dir + e.data.tile.name;
			};
			nodeIndex++;			
		}
	}

	function topScroll () {
		if (coordsArray[0][0].y === 0) {
			mapStart = true;
			return;
		}
		for(var i = 0, n = tilesNodes.length; i < n; i++) {
			var top = tilesNodes.item(i).offsetTop;
			tilesNodes.item(i).style.top = (top + divSize) + 'px';
		};
		var top = 0;
		var firstChildOfLastRow = rows * columns - columns + 1;

		for (var i = 0; i < columns; i++) {
			var child = firstChildOfLastRow + i;
			var div = tilesNodes.item(child - 1);
			
			div.style.top = top + 'px';
			div.parentNode.insertBefore(div, div.parentNode.childNodes[i]);
			div.firstElementChild.src = '';
		}

		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
				if (coordsArray[i][j].y === 0) {
					coordsArray[i][j].y = xTotal - 1;	
				} else {
		  			coordsArray[i][j].y--;
				}
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + coordsArray[i][j].y +' : ' + coordsArray[i][j].x +')';
	  			num++;
  			}
		}

		centerOffsetY = 0;
		
		var self = this;
		var nodeIndex = 0;

		worker.postMessage({
		    command: 'updateArray',
		    coordsArray: coordsArray
		});
		
		for(var i = 0; i < columns; i++) {
			var imgId = tilesNodes.item(nodeIndex).firstElementChild.getAttribute('id');
			worker.postMessage({
			    command: 'loadTile',
			    tileX: coordsArray[0][i].x,
			    tileY: coordsArray[0][i].y,
			    imgId: imgId,
			    url: url,
			    zoom: zoom
			});

			worker.onmessage = function (e) {
			    var img = document.querySelector('#' + e.data.imgId);
			    img.src = url + e.data.tile.dir + e.data.tile.name;
			};
			nodeIndex++;
		}
	}

	function addCoordinates (tilesNodes, mapArray) {
		var num = 0;
		for(var i = 0; i < rows; i++) {
			for(var j = 0; j < columns; j++) {
	  			tilesNodes.item(num).lastElementChild.innerHTML = '(' + mapArray[i][j].y +' : ' + mapArray[i][j].x +')';
	  			num++;
  			}
		}
	}

	function sort (mapArray, col, row) {
		var drawX = parseInt(col / 2);
		var drawY = parseInt(row / 2);
		var left = true;
		var right = true;
		var top = true;
		var bottom = true;
		var step = 1;
		var turnCounter = 0;
		var count = 0;
		var array = []
		array.push(mapArray[drawY][drawX]);
		var h = 0, n = col * row - 1;
		while (h < n) {
			if (turnCounter < 2) {
				if (left) {
					drawX--;
					count++;
					if (count === step) {
						left = false;
						top = true;
						turnCounter++;
						count = 0;	
					}
				} else if (top) {
					drawY--;
					count++;
					if (count === step) {
						top = false;
						right = true;
						turnCounter++;
						count = 0;
					}
				} else if (right) {
					drawX++;
					count++;
					if (count === step) {
						right = false;
						bottom = true;
						turnCounter++;
						count = 0;
					} 					
				} else if (bottom) {
					drawY++;
					count++;
					if (count === step) {
						bottom = false;
						left = true;
						turnCounter++;
						count = 0;
					}
				}
				h++;
				array.push(mapArray[drawY][drawX]);
			} else {
				step++;
				turnCounter = 0;
			}
		}
		return array;
	}

};