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

// ======================================= Multi game logic =======================================
// var server = require('http').Server(app);
// // NOTE: changed this from original
// var io = require('socket.io')(server);

var server = app.listen(app.get('port'));
var io = require('socket.io')(server);

// Keep track of all players in game with players
var players = {};

// star variable keeps track of position of star collectibles
var star = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50
};
// scores variable keeps track of both team's score
var scores = {
    blue: 0,
    red: 0
};

io.on('connection', function (socket) {
    console.log('a user connected');
    // create a new player and add it to our players object
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
    };
    // send the players object to the new player
    socket.emit('currentPlayers', players);

    // send the star object to the new player
    socket.emit('starLocation', star);

    // send the current scores
    socket.emit('scoreUpdate', scores);

    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]);

    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];
        // emit a message to all players to remove this player
        // NOTE: changed this from original
        io.emit('disconnected', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].rotation = movementData.rotation;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('starCollected', function () {
        if (players[socket.id].team === 'red') {
            scores.red += 10;
        } else {
            scores.blue += 10;
        }
        star.x = Math.floor(Math.random() * 700) + 50;
        star.y = Math.floor(Math.random() * 500) + 50;
        io.emit('starLocation', star);
        io.emit('scoreUpdate', scores);
    });
});

app.get('/multi_game', function (req, res) {
    // res.render('pages/multi_game');
    res.sendFile(__dirname + '/views/pages/multi_game.html');
    // res.sendFile('pages/multi_game.html');

});


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
