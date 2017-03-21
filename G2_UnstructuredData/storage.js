var fs = require('fs');

//Artist actions

exports.createArtist = function(name, birthdate, deathdate) {
	let artists = readFile();
	for(let i = 0; i < artists.length + 1; i++) {
		if(i == artists.length || i + 1 !== artists[i].id) {
			let newArtist = {
				id: i + 1,
				name: name,
				birthdate: birthdate,
				deathdate: deathdate,
				pieces: []
			}
			artists.splice(i, 0, newArtist);
			writeFile(artists);
			return newArtist;
		}
	}
	return null;
};

exports.readArtist = function(id) {
	let artists = readFile();
	for(let i = 0; i < artists.length; i++) {
		if(artists[i].id === id) {
			return artists[i];
		}
	}
	return null;
};

exports.readAllArtists = function() {
	let artists = readFile();
	return artists
};

exports.deleteArtist = function(id) {
	let artists = readFile();
	for(let i = 0; i < artists.length; i++) {
		if(artists[i].id === id) {
			let delArtist = artists[i];
			artists.splice(i, 1);
			writeFile(artists);
			return delArtist;
		}
	}
	return null;
}

exports.updateArtist = function(id, name, birthdate, deathdate) {
	let artists = readFile();
	for(let i = 0; i < artists.length; i++) {
		if(artists[i].id === id) {
			if(name) {
				artists[i].name = name;
			}
			if(birthdate) {
				artists[i].birthdate = birthdate;
			}
			if(deathdate) {
				artists[i].deathdate = deathdate;
			}
			writeFile(artists);
			return artists[i];
		}
	}
	return null;
}

//Pieces actions

exports.createPiece = function(artistId, name, date) {
	let artists = readFile();
	for(let i = 0; i < artists.length; i++) {
		if(artists[i].id === artistId) {
			pieces = artists[i].pieces;

			//Find the id for the piece 
			for(let n = 0; n < pieces.length + 1; n++) {
				if(n == pieces.length || n + 1 !== pieces[n].id) {
					let newPiece = {
						id: n + 1,
						name: name,
						date: date
					}
					pieces.splice(n, 0, newPiece);
					writeFile(artists);
					return newPiece;
				}
			}
		}
	}
}

exports.deletePiece = function(artistId, pieceId) {
	let artists = readFile();
	for(let i = 0; i < artists.length; i++) {
		if(artists[i].id === artistId) {
			pieces = artists[i].pieces;

			//Find the pieces index in the list
			for(let n = 0; n < pieces.length; n++) {
				if(pieces[n].id === pieceId) {
					let delPiece = pieces[n];
					pieces.splice(n, 1);
					writeFile(artists);
					return delPiece;
				}
			}

			return null;
		}
	}

	return null;
}

exports.updatePiece = function(artistId, pieceId, name, date) {
	let artists = readFile();
	for(let i = 0; i < artists.length; i++) {
		if(artists[i].id === artistId) {
			pieces = artists[i].pieces;

			//Find the pieces index in the list
			for(let n = 0; n < pieces.length + 1; n++) {
				if(pieces[n].id === pieceId) {
					let updPiece = pieces[n];

					if(name) {
						updPiece.name = name;
					}
					if(date) {
						updPiece.date = date;
					}

					writeFile(artists);
					return delPiece;
				}
			}

			return null;
		}
	}

	return null;
}

var readFile = function() {
	if(fs.existsSync('artists.json')) {
		let file = fs.readFileSync('artists.json', 'utf8');
    	return JSON.parse(file);
	} else {
		return [];
	}
}

var writeFile = function(artists) {
	fs.writeFileSync('artists.json', JSON.stringify(artists));
}
