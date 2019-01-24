var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    methodOverride = require('method-override'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local');
    // MongoDB Schema
    Blog           = require("./models/blog"),
    User           = require('./models/user')

mongoose.Promise = global.Promise;
var express = require('express');
var app = express();

var mongoUrl = process.env.MONGOURL || "mongodb://localhost/blog" 

mongoose.connect(mongoUrl);
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

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "This isn't really a secret since I'm posting this to GitHub... I should probably use process.env instead",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// NEWLY ADDED
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
})


// Test blog CREATION
/*Blog.create({
    title: "Test blog 2",
    image: "http://i3.cpcache.com/product/358827496/lorem_ipsum_dog_tshirt.jpg?width=750&height=750&Filters=%5B%7B%22name%22%3A%22background%22%2C%22value%22%3A%22F2F2F2%22%2C%22sequence%22%3A2%7D%5D",
    body: "Pet Food pet supplies gimme five puppy cage food feathers food heel feathers running pet gate walk lazy dog Spike. Good Boy park lazy dog walk kibble Scooby snacks licks canary. Maine Coon Cat walk catch water dog slobber chew scratcher ID tag litter tuxedo dog house lazy cat park. Dinnertime fetch throw feathers fleas tongue lazy cat lick throw kitten parrot hamster wag tail aquarium chew heel good boy lick feathers cockatiel. Wet Nose food.",
    created: Date.now()
});*/

// Routes
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

    // Get /musician/Matt
    console.log(req.params.word)
    // => Matt

    // res.send('{"id": 1,"name":"Matt","band": "BBQ Brawlers"}');
    // testing
    var Dictionary = require("oxford-dictionary");

    var config = {
        //TODO: use process.env here
        app_id: "af50e942",
        app_key: "187501834b1d4b2f750af346417a57da",
        source_lang: "en"
    };

    // var testWords = ["cat", "dog", "mouse", "hello"];

    var testWords = ["Aardwolf", "Aberration", "Abridgment", "Abscission", "Acerbate", "Aficionado", "Algorithm", "Alignment", "Allocution", "Ancillary", "Apocalypse", "Applique", "Archetype", "Avenge", "Babushka", "Baccalaureate", "Balalaika", "Baroque", "Barracuda", "Bayou", "Beleaguer", "Belligerence", "Beret", "Bivouac", "Blithe", "Boatswain", "Bourgeois", "Boutique", "Boutonniere", "Boysenberry", "Buoy", "Cabaret", "Calisthenics", "Callous", "Camouflage", "Cannoneer", "Cantankerous", "Cardiopulmonary", "Carnivorous", "Catastrophe", "Celerity", "Censer", "Changeable", "Chaparral", "Commemorate", "Committal", "Connoisseur", "Convalescence", "Cornucopia", "Corruptible", "Crevasse", "Croissant", "Curmudgeon", "Cynic", "Dachshund", "Decaffeinate", "Deliverance", "Denouement", "Diaphragm", "Dichotomy", "Dietitian", "Diphthong", "Docile", "Echo", "Eclair", "Eczema", "Effervescent", "Eloquence", "Encumbrance", "Exquisite", "Facsimile", "Fallacious", "Fascinate", "Fauna", "Flocculent", "Foliage", "Forage", "Forsythia", "Fraught", "Fuchsia", "Gauche", "Genre", "Germane", "Gerrymander", "Glockenspiel", "Gnash", "Granary", "Grippe", "Guillotine", "Hallelujah", "Handwrought", "Harebrained", "Harpsichord", "Haughty", "Heir", "Hemorrhage", "Heterogeneous", "Hoard", "Holocaust", "Homogenize", "Homonym", "Horde", "Humoresque", "Hydraulic", "Hydrolysis", "Hypothesis", "Hysterical", "Idyll", "Iguana", "Imperceptible", "Impetuous", "Impossible", "Impromptu", "Incidence", "Indicator", "Infallible", "Inferior", "Insurgence", "Interfere", "Invoice", "Iridescent", "Isle", "Isthmus", "Jackal", "Jacuzzi", "Joist", "Juxtaposition", "Kaiser", "Kaleidoscope", "Ketch", "Knave", "Knell", "Knoll", "Labyrinth", "Laconic", "Laggard", "Lagoon", "Laryngitis", "Larynx", "Lavender", "Legionnaire", "Leprechaun", "Liege", "Luau", "Luscious", "Lyre", "Lymphatic", "Mace", "Magnanimous", "Magnify", "Malfeasance", "Maneuver", "Mantle", "Marquee", "Masquerade", "Mature", "Maul", "Melee", "Memento", "Mercenary", "Mesquite", "Mettle", "Minuscule", "Mirage", "Momentous", "Monastery", "Monocle", "Morgue", "Morphine", "Mosque", "Motif", "Mousse", "Mozzarella", "Muenster", "Municipal", "Mysterious", "Mystique", "Naughty", "Neuter", "Nickel", "Nickelodeon", "Nomenclature", "Nonchalant", "Nonpareil", "Noxious", "Nuance", "Nucleus", "Nuisance", "Nuptial", "Nylons", "Obnoxious", "Obsolescent", "Occurrence", "Ocelot", "Ogre", "Onyx", "Ophthalmology", "Ordnance", "Orphan", "Oscillate", "Overwrought", "Oxygen", "Pacifist", "Palette", "Palomino", "Pamphlet", "Pantomime", "Papacy", "Parable", "Paralysis", "Paraphernalia", "Parishioner", "Parochial", "Parody", "Parquet", "Partition", "Pasture", "Patriarch", "Patrician", "Paunchy", "Pause", "Pavilion", "Peak", "Penchant", "Penguin", "Penicillin", "Penitentiary", "Perennial", "Periphery", "Perjury", "Perseverance", "Persuade", "Peruse", "Pesticide", "Petition", "Phalanx", "Phenomenon", "Philosopher", "Phoenix", "Physics", "Picturesque", "Peace", "Pinnacle", "Pinafore", "Pixie", "Placard", "Placebo", "Plaid", "Plight", "Plumber", "Pneumonia", "Poignant", "Poinsettia", "Politicize", "Populous", "Porridge", "Posse", "Posthumous", "Potpourri", "Practitioner", "Prairie", "Precise", "Prerogative", "Prestigious", "Prey", "Principle", "Pronunciation", "Psalm", "Psychology", "Purge", "Quaff", "Quandary", "Quarantine", "Questionnaire", "Queue", "Quiche", "Quintessence", "Rabble", "Raffle", "Rambunctious", "Rancid", "Raspberry", "Ratchet", "Rationale", "Recede", "Recluse", "Reconnaissance", "Rectify", "Recurrence", "Reggae", "Rehearse", "Reign", "Rein", "Remembrance", "Reminiscence", "Requisition", "Rescind", "Respondent", "Resume", "Resurrection", "Revise", "Rhapsodic", "Rhetoric", "Rhubarb", "Right", "Rigor", "Rotor", "Rouge", "Roulette", "Rubella", "Sable", "Sachet", "Sacrilegious", "Saffron", "Salutatorian", "Sanctimonious", "Sapphire", "Sarcasm", "Satellite", "Sauerkraut", "Sauna", "Scandalous", "Scarab", "Scenario", "Scepter", "Schizophrenia", "Schnauzer", "Sciatic", "Scour", "Scourge", "Scrod", "Scruple", "Sculptor", "Seance", "Seclude", "Seine", "Semaphore", "Sensuous", "Separate", "Sepulcher", "Sequoia", "Sergeant", "Serial", "Sew", "Shackle", "Sheathe", "Sheen", "Shrew", "Shroud", "Sierra", "Silhouette", "Simile", "Simultaneous", "Singe", "Siphon", "Skeptic", "Skew", "Slaughter", "Sleigh", "Sleight", "Sleuth", "Slough", "Sojourn", "Solder", "Solemn", "Sovereign", "Spasm", "Specter", "Sponsor", "Squabble", "Squeak", "Squint", "Stationery", "Stimulus", "Strait", "Straitjacket", "Stroganoff", "Suave", "Subpoena", "Subtle", "Succinct", "Sufficiency", "Suite", "Supersede", "Supposition", "Surety", "Surrey", "Surrogate", "Surveillance", "Swerve", "Symposium", "Synod", "Synonym", "Syntax", "Tabernacle", "Tableau", "Tabular", "Tachometer", "Tacky", "Tact", "Taffy", "Tail", "Taint", "Tally", "Tambourine", "Tandem", "Tangible", "Tantalize", "Tapestry", "Tassel", "Taught", "Taunt", "Tawdry", "Tea", "Tee", "Technique", "Tedious", "Teeter", "Telegraph", "Telepathy", "Telephone", "Temblor", "Tempt", "Tenor", "Tense", "Terrain", "Terse", "Tetanus", "Thatch", "Thermometer", "Thesaurus", "Thesis", "Thigh", "Thimble", "Third", "Thistle", "Thorough", "Thumb", "Tier", "Tinsel", "Titanic", "Titlist", "Tobacco", "Tongue", "Tonsillectomy", "Topaz", "Torque", "Tout", "Toxicity", "Traceable", "Trachea", "Trait", "Tranquil", "Transcend", "Transient", "Translucent", "Trapeze", "Trauma", "Trestle", "Trichotomy", "Trivial", "Trough", "Troupe", "Truancy", "Tyrannize", "Ulcer", "Uncollectible", "Unkempt", "Vaccinal", "Vague", "Vaudeville", "Vehemence", "Veneer", "Vengeance", "Vermicelli", "Victuals", "Viscount", "Vogue", "Vying", "Waive", "Whack", "Wheelwright", "Wherever", "Wince", "Wrack", "Wreak", "Wren", "Yeoman", "Zeppelin", "Zoological", "Zucchini"];

    var wordObject = {};
    dict = new Dictionary(config);

    function logWord(dict_word) {
        var lookup = dict.find(dict_word);
        lookup.then(function (response) {
            //    console.log(res);
            //    console.log(JSON.stringify(res.results[0].lexicalEntries));
            word = JSON.stringify(response.results[0].lexicalEntries);
            JSONWord = JSON.parse(word);
            // console.log('JSONWord ==');
            // Use JSONWord[0].entries[0].senses[0].definitions to extract the first definition of a word
            // console.log(JSONWord[0].entries[0].senses[0].definitions);
            definition = JSONWord[0].entries[0].senses[0].definitions;
            pronunciation = JSONWord[0].pronunciations[0].audioFile;
            wordObject = {
                word: dict_word,
                definition: definition,
                pronunciation: pronunciation
            };
            // app.post('/spelling_bee/nextWord', function (req, res) {
                //    res.send('You sent the name "' + req.body.name + word + '".');
                //    console.log(testWords[Math.floor(Math.random()*testWords.length)]);
                // lookupWord is a random word word from the word bank array
                // lookupWord = testWords[Math.floor(Math.random() * testWords.length)];
                // logWord(lookupWord);



                res.send('{"word": "'  + wordObject.word + '","definition": "' + wordObject.definition + '","pronunciation": "' + wordObject.pronunciation + '"}');
                // res.send('{"ideeee": 1,"name":"Matt","band": "BBQ Brawlers"}');

                // res.render('pages/spelling_bee', {
                //     wordObject: wordObject
                // });

            // });

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
    // var Dictionary = require("oxford-dictionary");

    // var config = {
    //     //TODO: use process.env here
    //     app_id: "af50e942",
    //     app_key: "187501834b1d4b2f750af346417a57da",
    //     source_lang: "en"
    // };

    // var testWords = ["cat", "dog", "mouse", "hello"];

    // var testWords = ["Aardwolf", "Aberration", "Abridgment", "Abscission", "Acerbate", "Aficionado", "Algorithm", "Alignment", "Allocution", "Ancillary", "Apocalypse", "Applique", "Archetype", "Avenge", "Babushka", "Baccalaureate", "Balalaika", "Baroque", "Barracuda", "Bayou", "Beleaguer", "Belligerence", "Beret", "Bivouac", "Blithe", "Boatswain", "Bourgeois", "Boutique", "Boutonniere", "Boysenberry", "Buoy", "Cabaret", "Calisthenics", "Callous", "Camouflage", "Cannoneer", "Cantankerous", "Cardiopulmonary", "Carnivorous", "Catastrophe", "Celerity", "Censer", "Changeable", "Chaparral", "Commemorate", "Committal", "Connoisseur", "Convalescence", "Cornucopia", "Corruptible", "Crevasse", "Croissant", "Curmudgeon", "Cynic", "Dachshund", "Decaffeinate", "Deliverance", "Denouement", "Diaphragm", "Dichotomy", "Dietitian", "Diphthong", "Docile", "Echo", "Eclair", "Eczema", "Effervescent", "Eloquence", "Encumbrance", "Exquisite", "Extemporaneous", "Facsimile", "Fallacious", "Fascinate", "Fauna", "Flocculent", "Foliage", "Forage", "Forsythia", "Fraught", "Fuchsia", "Gauche", "Genre", "Germane", "Gerrymander", "Glockenspiel", "Gnash", "Granary", "Grippe", "Guillotine", "Hallelujah", "Handwrought", "Harebrained", "Harpsichord", "Haughty", "Heir", "Hemorrhage", "Heterogeneous", "Hoard", "Holocaust", "Homogenize", "Homonym", "Horde", "Humoresque", "Hydraulic", "Hydrolysis", "Hypothesis", "Hysterical", "Idyll", "Iguana", "Imperceptible", "Impetuous", "Impossible", "Impromptu", "Incidence", "Indicator", "Infallible", "Inferior", "Insurgence", "Interfere", "Invoice", "Iridescent", "Isle", "Isthmus", "Jackal", "Jacuzzi", "Joist", "Juxtaposition", "Kaiser", "Kaleidoscope", "Ketch", "Knave", "Knell", "Knoll", "Labyrinth", "Laconic", "Laggard", "Lagoon", "Laryngitis", "Larynx", "Lavender", "Legionnaire", "Leprechaun", "Liege", "Luau", "Luscious", "Lyre", "Lymphatic", "Mace", "Magnanimous", "Magnify", "Malfeasance", "Maneuver", "Mantle", "Marquee", "Masquerade", "Mature", "Maul", "Melee", "Memento", "Mercenary", "Mesquite", "Mettle", "Minuscule", "Mirage", "Momentous", "Monastery", "Monocle", "Morgue", "Morphine", "Mosque", "Motif", "Mousse", "Mozzarella", "Muenster", "Municipal", "Mysterious", "Mystique", "Naughty", "Neuter", "Nickel", "Nickelodeon", "Nomenclature", "Nonchalant", "Nonpareil", "Noxious", "Nuance", "Nucleus", "Nuisance", "Nuptial", "Nylons", "Obnoxious", "Obsolescent", "Occurrence", "Ocelot", "Ogre", "Onyx", "Ophthalmology", "Ordnance", "Orphan", "Oscillate", "Overwrought", "Oxygen", "Pacifist", "Palette", "Palomino", "Pamphlet", "Pantomime", "Papacy", "Parable", "Paralysis", "Paraphernalia", "Parishioner", "Parochial", "Parody", "Parquet", "Partition", "Pasture", "Patriarch", "Patrician", "Paunchy", "Pause", "Pavilion", "Peak", "Penchant", "Penguin", "Penicillin", "Penitentiary", "Perennial", "Periphery", "Perjury", "Perseverance", "Persuade", "Peruse", "Pesticide", "Petition", "Phalanx", "Phenomenon", "Philosopher", "Phoenix", "Physics", "Picturesque", "Peace", "Pinnacle", "Pinafore", "Pixie", "Placard", "Placebo", "Plaid", "Plight", "Plumber", "Pneumonia", "Poignant", "Poinsettia", "Politicize", "Populous", "Porridge", "Posse", "Posthumous", "Potpourri", "Practitioner", "Prairie", "Precise", "Prerogative", "Prestigious", "Prey", "Principle", "Pronunciation", "Psalm", "Psychology", "Purge", "Quaff", "Quandary", "Quarantine", "Questionnaire", "Queue", "Quiche", "Quintessence", "Rabble", "Raffle", "Rambunctious", "Rancid", "Raspberry", "Ratchet", "Rationale", "Recede", "Recluse", "Reconnaissance", "Rectify", "Recurrence", "Reggae", "Rehearse", "Reign", "Rein", "Remembrance", "Reminiscence", "Requisition", "Rescind", "Respondent", "Resume", "Resurrection", "Revise", "Rhapsodic", "Rhetoric", "Rhubarb", "Right", "Rigor", "Rotor", "Rouge", "Roulette", "Rubella", "Sable", "Sachet", "Sacrilegious", "Saffron", "Salutatorian", "Sanctimonious", "Sapphire", "Sarcasm", "Satellite", "Sauerkraut", "Sauna", "Scandalous", "Scarab", "Scenario", "Scepter", "Schizophrenia", "Schnauzer", "Sciatic", "Scour", "Scourge", "Scrod", "Scruple", "Sculptor", "Seance", "Seclude", "Seine", "Semaphore", "Sensuous", "Separate", "Sepulcher", "Sequoia", "Sergeant", "Serial", "Sew", "Shackle", "Sheathe", "Sheen", "Shrew", "Shroud", "Sierra", "Silhouette", "Simile", "Simultaneous", "Singe", "Siphon", "Skeptic", "Skew", "Slaughter", "Sleigh", "Sleight", "Sleuth", "Slough", "Sojourn", "Solder", "Solemn", "Sovereign", "Spasm", "Specter", "Sponsor", "Squabble", "Squeak", "Squint", "Stationery", "Stimulus", "Strait", "Straitjacket", "Stroganoff", "Suave", "Subpoena", "Subtle", "Succinct", "Sufficiency", "Suite", "Supersede", "Supposition", "Surety", "Surrey", "Surrogate", "Surveillance", "Swerve", "Symposium", "Synod", "Synonym", "Syntax", "Tabernacle", "Tableau", "Tabular", "Tachometer", "Tacky", "Tact", "Taffy", "Tail", "Taint", "Tally", "Tambourine", "Tandem", "Tangible", "Tantalize", "Tapestry", "Tassel", "Taught", "Taunt", "Tawdry", "Tea", "Tee", "Technique", "Tedious", "Teeter", "Telegraph", "Telepathy", "Telephone", "Temblor", "Tempt", "Tenor", "Tense", "Terrain", "Terse", "Tetanus", "Thatch", "Thermometer", "Thesaurus", "Thesis", "Thigh", "Thimble", "Third", "Thistle", "Thorough", "Thumb", "Tier", "Tinsel", "Titanic", "Titlist", "Tobacco", "Tongue", "Tonsillectomy", "Topaz", "Torque", "Tout", "Toxicity", "Traceable", "Trachea", "Trait", "Tranquil", "Transcend", "Transient", "Translucent", "Trapeze", "Trauma", "Trestle", "Trichotomy", "Trivial", "Trough", "Troupe", "Truancy", "Tyrannize", "Ulcer", "Uncollectible", "Unkempt", "Vaccinal", "Vague", "Vaudeville", "Vehemence", "Veneer", "Vengeance", "Vermicelli", "Victuals", "Viscount", "Vogue", "Vying", "Waive", "Whack", "Wheelwright", "Wherever", "Wince", "Wrack", "Wreak", "Wren", "Yeoman", "Zeppelin", "Zoological", "Zucchini"];


    // dict = new Dictionary(config);
    // function logWord(dict_word) {
    //     var lookup = dict.find(dict_word);
    //     lookup.then(function (res) {
    //         //    console.log(res);
    //         //    console.log(JSON.stringify(res.results[0].lexicalEntries));
    //         word = JSON.stringify(res.results[0].lexicalEntries);
    //         JSONWord = JSON.parse(word);
    //         // console.log('JSONWord ==');
    //         // Use JSONWord[0].entries[0].senses[0].definitions to extract the first definition of a word
    //         // console.log(JSONWord[0].entries[0].senses[0].definitions);
    //         definition = JSONWord[0].entries[0].senses[0].definitions;
    //         pronunciation = JSONWord[0].pronunciations[0].audioFile;
    //         wordObject = {
    //             word: dict_word,
    //             definition: definition,
    //             pronunciation: pronunciation
    //         };
    //         app.post('/spelling_bee/nextWord', function (req, res) {
    //             //    res.send('You sent the name "' + req.body.name + word + '".');
    //             //    console.log(testWords[Math.floor(Math.random()*testWords.length)]);
    //             // lookupWord is a random word word from the word bank array
    //             lookupWord = testWords[Math.floor(Math.random() * testWords.length)];
    //             logWord(lookupWord);
    //             res.render('pages/spelling_bee', {
    //                 wordObject: wordObject
    //             });

    //         });

    //     },
    //         function (err) {
    //             console.log(err);
    //         });
    // };

    // wordObject = {
    //     word: "dict_word",
    //     definition: "Definition of words will go here.",
    //     pronunciation: "pronunciation"
    // };
    // logWord("cool");
    // res.render('pages/spelling_bee', {
    //     wordObject: wordObject
    // });
    wordObject = {
        word: "dict_word",
        definition: "Definition of words will go here.",
        pronunciation: "/audio/pronunciations_will_go_here.mp3"
    };
    // logWord("cool");
    res.render('pages/spelling_bee', {
        wordObject: wordObject
    });
});

// app.get('/spelling_bee', function (req, res) {
//     res.render('pages/index', {
//         wordObject: wordObject
//     });
// });

// app.get('/spelling_bee/nextWord', function (req, res) {
//     res.render('pages/index', {
//         wordObject: wordObject
//     });
// })
// AUTH ROUTES

//// Register form
//app.get("/register", function(req, res) {
//    res.render("pages/register");
//});
//
//// Handle sign up logic
//app.post("/register", function(req, res) {
//    var newUser = new User({username: req.body.username});
//    User.register(newUser, req.body.password, function(err, newUser) {
//        if (err) {
//            console.log(err);
//            return res.render("pages/register");
//        }
//        passport.authenticate("local")(req, res, function() {
//            res.redirect("blog/index");
//        });
//    });
//});

// Show login form
app.get("/login", function(req, res) {
    res.render("pages/login");
});

// Handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/blog",
    failureRedirect: "/login"
}),  function(req, res) {
//    res.send("login logic woo");
});

// Logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
})

// Middleware
function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");   
}

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
