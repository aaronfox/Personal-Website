var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override')

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// Handle 500
app.use(function (error, req, res, next) {
    res.status(500).send('Oh, nards. It\'s a 500 (Internal Server) Error. It looks like the server\'s acting funky. Luckily, refreshing should fix this!', 500);
    console.log(error);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// // PASSPORT CONFIG
// app.use(require('express-session')({
//     secret: "This isn't really a secret since I'm posting this to GitHub... I should probably use process.env instead",
//     resave: false,
//     saveUninitialized: false
// }));


// Routes
//var blogRoutes = require("./routes/blog");
//app.use("/blog", blogRoutes);

var blogRoutes = require("./routes/blog");
app.use("/blog", blogRoutes);

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/blog', function(req, res) {
   res.render('pages/blog');
});

app.get('/resume', function(req, res) {
    res.render('pages/resume');
});

app.get('/rip_sir_spoonsalot', function(req, res) {
    res.render('pages/rip_sir_spoonsalot');
});

app.get('/carmen', function (req, res) {
    res.render('pages/carmen');
});

app.get('/cameron', function(req, res) {
    res.render('pages/cameron');
});

// ======================================= BEGIN Multi game logic =======================================
// var server = require('http').Server(app);
// // NOTE: changed this from original
// var io = require('socket.io')(server);

var server = app.listen(app.get('port'));
var io = require('socket.io')(server);

// Keep track of all players in game with players
var players = {};

const MAX_TILES_TO_PLACE = 12;

io.on('connection', function (socket) {
    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
        tilesToPlace: MAX_TILES_TO_PLACE,
        placedTileLocations: [],
        tilesToPlaceLocations: [],
        numberOfTilesOnBoard: 0,
        playerId: socket.id,
        color: '0x' + (Math.floor(Math.random() * 16777215).toString(16))
    };
    // Send the current players to this player socket only
    // Note: socket.emit sends objects to just this socket
    //       while socket.broadcast.emit sends to all other sockets
    socket.emit('currentPlayers', players);

    // send the current scores
    // socket.emit('scoreUpdate', scores);

    // Let all other players know of this new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // Check if this is last player
        if (players.length == undefined) {
            // Reset board since no players left
            // This is done automatically by logic of game.js
        }
        // emit a message to all players to remove this player
        io.emit('disconnected', socket.id);
    });

    // Sends to all other players that this player placed a new tile
    socket.on('tilePlaced', function (tileData) {
        players[socket.id].placedTileLocations.push(tileData);

        // Emit message to all players that tile was placed
        socket.broadcast.emit('otherTileWasPlaced', players[socket.id])
    })

    // Clears out all previous tiles to clear board of any previously removed
    // tiles that were once placed
    socket.on('clearCells', function () {
        players[socket.id].placedTileLocations = []

        // Emit message to all players to clear out current placedTileLocations array
        socket.broadcast.emit('otherTileWasPlaced', players[socket.id])
    })
});

app.get('/game_of_life', function (req, res) {
    // res.render('pages/multi_game');
    res.sendFile(__dirname + '/views/pages/game_of_life.html');
    // res.sendFile('pages/multi_game.html');

});
// slide = 0
setInterval(step, 5000); // advance slides every 5 seconds

function step() {
    io.sockets.emit('step', 2);
}


// ======================================= END Multi game logic =======================================

// Snake Code for MicroComputers Class
snakeScore = 0
topScores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
app.post('/snake', function (req, res) {
    snakeScore = req.body.score
    if (snakeScore > topScores[topScores.length - 1])
    {
        topScores[topScores.length - 1] = snakeScore
        // Sort scores in descending order
        topScores.sort(function (a, b) { return b - a });
    }
    res.send('Received a score!');
});

app.get('/snake', function (req, res) {
    res.render('pages/snake', {scores: topScores})
});

app.get('/hunger', function(req, res) {
    res.render('pages/hunger');
})

app.get('/flappy', function (req, res) {
    res.render('pages/flappy');
});

app.get('/flappy_aaron', function (req, res) {
    res.render('pages/flappy_aaron');
});

app.get('/spelling_bee_words/:word', function (req, res) {
    var Dictionary = require("oxford-dictionary");

    var config = {
        //TODO: use process.env here
        app_id: "af50e942",
        app_key: "187501834b1d4b2f750af346417a57da",
        source_lang: "en"
    };

    var testWords = ["Aardwolf", "Aberration", "Abridgment", "Abscission", "Acerbate", "Aficionado", "Algorithm", "Alignment", "Allocution", "Ancillary", "Apocalypse", "Applique", "Archetype", "Avenge", "Babushka", "Baccalaureate", "Balalaika", "Baroque", "Barracuda", "Bayou", "Beleaguer", "Belligerence", "Beret", "Bivouac", "Blithe", "Boatswain", "Bourgeois", "Boutique", "Boutonniere", "Boysenberry", "Buoy", "Cabaret", "Calisthenics", "Callous", "Camouflage", "Cannoneer", "Cantankerous", "Cardiopulmonary", "Carnivorous", "Catastrophe", "Celerity", "Censer", "Changeable", "Chaparral", "Commemorate", "Committal", "Connoisseur", "Convalescence", "Cornucopia", "Corruptible", "Crevasse", "Croissant", "Curmudgeon", "Cynic", "Dachshund", "Decaffeinate", "Deliverance", "Denouement", "Diaphragm", "Dichotomy", "Dietitian", "Diphthong", "Docile", "Echo", "Eclair", "Eczema", "Effervescent", "Eloquence", "Encumbrance", "Exquisite", "Facsimile", "Fallacious", "Fascinate", "Fauna", "Flocculent", "Foliage", "Forage", "Forsythia", "Fraught", "Fuchsia", "Gauche", "Genre", "Germane", "Gerrymander", "Glockenspiel", "Gnash", "Granary", "Grippe", "Guillotine", "Hallelujah", "Handwrought", "Harebrained", "Harpsichord", "Haughty", "Heir", "Hemorrhage", "Heterogeneous", "Hoard", "Holocaust", "Homogenize", "Homonym", "Horde", "Humoresque", "Hydraulic", "Hydrolysis", "Hypothesis", "Hysterical", "Idyll", "Iguana", "Imperceptible", "Impetuous", "Impossible", "Impromptu", "Incidence", "Indicator", "Infallible", "Inferior", "Insurgence", "Interfere", "Invoice", "Iridescent", "Isle", "Isthmus", "Jackal", "Jacuzzi", "Joist", "Juxtaposition", "Kaiser", "Kaleidoscope", "Ketch", "Knave", "Knell", "Knoll", "Labyrinth", "Laconic", "Laggard", "Lagoon", "Laryngitis", "Larynx", "Lavender", "Legionnaire", "Leprechaun", "Liege", "Luau", "Luscious", "Lyre", "Lymphatic", "Mace", "Magnanimous", "Magnify", "Malfeasance", "Maneuver", "Mantle", "Marquee", "Masquerade", "Mature", "Maul", "Melee", "Memento", "Mercenary", "Mesquite", "Mettle", "Minuscule", "Mirage", "Momentous", "Monastery", "Monocle", "Morgue", "Morphine", "Mosque", "Motif", "Mousse", "Mozzarella", "Muenster", "Municipal", "Mysterious", "Mystique", "Naughty", "Neuter", "Nickel", "Nickelodeon", "Nomenclature", "Nonchalant", "Nonpareil", "Noxious", "Nuance", "Nucleus", "Nuisance", "Nuptial", "Nylons", "Obnoxious", "Obsolescent", "Occurrence", "Ocelot", "Ogre", "Onyx", "Ophthalmology", "Ordnance", "Orphan", "Oscillate", "Overwrought", "Oxygen", "Pacifist", "Palette", "Palomino", "Pamphlet", "Pantomime", "Papacy", "Parable", "Paralysis", "Paraphernalia", "Parishioner", "Parochial", "Parody", "Parquet", "Partition", "Pasture", "Patriarch", "Patrician", "Paunchy", "Pause", "Pavilion", "Peak", "Penchant", "Penguin", "Penicillin", "Penitentiary", "Perennial", "Periphery", "Perjury", "Perseverance", "Persuade", "Peruse", "Pesticide", "Petition", "Phalanx", "Phenomenon", "Philosopher", "Phoenix", "Physics", "Picturesque", "Peace", "Pinnacle", "Pinafore", "Pixie", "Placard", "Placebo", "Plaid", "Plight", "Plumber", "Pneumonia", "Poignant", "Poinsettia", "Politicize", "Populous", "Porridge", "Posse", "Posthumous", "Potpourri", "Practitioner", "Prairie", "Precise", "Prerogative", "Prestigious", "Prey", "Principle", "Pronunciation", "Psalm", "Psychology", "Purge", "Quaff", "Quandary", "Quarantine", "Questionnaire", "Queue", "Quiche", "Quintessence", "Rabble", "Raffle", "Rambunctious", "Rancid", "Raspberry", "Ratchet", "Rationale", "Recede", "Recluse", "Reconnaissance", "Rectify", "Recurrence", "Reggae", "Rehearse", "Reign", "Rein", "Remembrance", "Reminiscence", "Requisition", "Rescind", "Respondent", "Resume", "Resurrection", "Revise", "Rhapsodic", "Rhetoric", "Rhubarb", "Right", "Rigor", "Rotor", "Rouge", "Roulette", "Rubella", "Sable", "Sachet", "Sacrilegious", "Saffron", "Salutatorian", "Sanctimonious", "Sapphire", "Sarcasm", "Satellite", "Sauerkraut", "Sauna", "Scandalous", "Scarab", "Scenario", "Scepter", "Schizophrenia", "Schnauzer", "Sciatic", "Scour", "Scourge", "Scrod", "Scruple", "Sculptor", "Seance", "Seclude", "Seine", "Semaphore", "Sensuous", "Separate", "Sepulcher", "Sequoia", "Sergeant", "Serial", "Sew", "Shackle", "Sheathe", "Sheen", "Shrew", "Shroud", "Sierra", "Silhouette", "Simile", "Simultaneous", "Singe", "Siphon", "Skeptic", "Skew", "Slaughter", "Sleigh", "Sleight", "Sleuth", "Slough", "Sojourn", "Solder", "Solemn", "Sovereign", "Spasm", "Specter", "Sponsor", "Squabble", "Squeak", "Squint", "Stationery", "Stimulus", "Strait", "Straitjacket", "Stroganoff", "Suave", "Subpoena", "Subtle", "Succinct", "Sufficiency", "Suite", "Supersede", "Supposition", "Surety", "Surrey", "Surrogate", "Surveillance", "Swerve", "Symposium", "Synod", "Synonym", "Syntax", "Tabernacle", "Tableau", "Tabular", "Tachometer", "Tacky", "Tact", "Taffy", "Tail", "Taint", "Tally", "Tambourine", "Tandem", "Tangible", "Tantalize", "Tapestry", "Tassel", "Taught", "Taunt", "Tawdry", "Tea", "Tee", "Technique", "Tedious", "Teeter", "Telegraph", "Telepathy", "Telephone", "Temblor", "Tempt", "Tenor", "Tense", "Terrain", "Terse", "Tetanus", "Thatch", "Thermometer", "Thesaurus", "Thesis", "Thigh", "Thimble", "Third", "Thistle", "Thorough", "Thumb", "Tier", "Tinsel", "Titanic", "Titlist", "Tobacco", "Tongue", "Tonsillectomy", "Topaz", "Torque", "Tout", "Toxicity", "Traceable", "Trachea", "Trait", "Tranquil", "Transcend", "Transient", "Translucent", "Trapeze", "Trauma", "Trestle", "Trichotomy", "Trivial", "Trough", "Troupe", "Truancy", "Tyrannize", "Ulcer", "Uncollectible", "Unkempt", "Vaccinal", "Vague", "Vaudeville", "Vehemence", "Veneer", "Vengeance", "Vermicelli", "Victuals", "Viscount", "Vogue", "Vying", "Waive", "Whack", "Wheelwright", "Wherever", "Wince", "Wrack", "Wreak", "Wren", "Yeoman", "Zeppelin", "Zoological", "Zucchini"];

    var wordObject = {};
    dict = new Dictionary(config);

    function logWord(dict_word) {
        var lookup = dict.find(dict_word);
        lookup.then(function (response) {
            word = JSON.stringify(response.results[0].lexicalEntries);
            JSONWord = JSON.parse(word);

            definition = JSONWord[0].entries[0].senses[0].definitions;
            pronunciation = JSONWord[0].pronunciations[0].audioFile;
            wordObject = {
                word: dict_word,
                definition: definition,
                pronunciation: pronunciation
            };




                res.send('{"word": "'  + wordObject.word + '","definition": "' + wordObject.definition + '","pronunciation": "' + wordObject.pronunciation + '"}');
        },
            function (err) {
                console.log(err);
            });
    };
    // If you want to log the paramter word, use this next line:
            // logWord(req.params.word);
    // otherwise, use a random test word:
    // lookupWord is a random word word from the word bank array
    lookupWord = testWords[Math.floor(Math.random() * testWords.length)];
    logWord(lookupWord);
    // end testing
});



app.get('/spelling_bee', function(req, res) {
    wordObject = {
        word: "dict_word",
        definition: "Definition of words will go here. Click Next Word to begin",
        pronunciation: "/audio/pronunciations_will_go_here.mp3"
    };
    // logWord("cool");
    res.render('pages/spelling_bee', {
        wordObject: wordObject
    });
});

// The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
    res.status(404).send('OOF. 404. Sorry about that. Here\'s a Frenchie: (imagine a frenchie here)');
});

// app.listen(app.get('port'), function() {
//     console.log('Node app is running on port', app.get('port'));
// });
