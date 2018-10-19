//var app = require('../../app');
// TODO: MAKE sure scores are kept consisent for each page rendering
var player_one_score = localStorage.getItem("player_one_score");
if (!player_one_score) {
    player_one_score = 0;
}
var player_two_score = localStorage.getItem("player_two_score");
if (!player_two_score) {
    player_two_score = 0;
    console.log("player_two_score is NULL!");
} else {
    console.log("player_two_score is not NULL!");
}
var curr_player = localStorage.getItem("curr_player");
if (!curr_player) {
    curr_player = 1;
}

$(document).ready(function () {
    $("#player_one_score").show();
    $("#player_two_score").show();
    $("#player_one_score").text(player_one_score);
    $("#player_two_score").text(player_two_score);
    $("#reset_score").click(function () {
        localStorage.setItem("player_one_score", 0);
        localStorage.setItem("player_two_score", 0);
        $("#player_one_score").text(0);
        $("#player_two_score").text(0);
        localStorage.setItem("player_one_score", 0);
        localStorage.setItem("player_two_score", 0);
        localStorage.setItem("curr_player", 1);
    });
    $("#check_spelling").click(function () {
        $("#check_spelling").prop("disabled", true);
        console.log("word == ");
        console.log()
        word = $("#secret-entry-word").text();
        spelling_attempt = $("#spelling_attempt").val();
        console.log(word.valueOf().toLowerCase().trim());
        console.log(spelling_attempt.valueOf().toLowerCase());
        if (word.valueOf().toLowerCase().trim() == spelling_attempt.valueOf().toLowerCase().trim()) {
            if (curr_player == 1) {
                console.log("incrementing player_one_score");
                localStorage.setItem("player_one_score", parseInt(player_one_score) + 1);
                player_one_score++;
                $("#player_one_score").text(player_one_score);
                $("#spelling-alert").text("Player 1 spelled " + spelling_attempt.valueOf().toLowerCase().trim() + " correctly!");
                curr_player = 2;
                localStorage.setItem("curr_player", 2);
            } else {
                localStorage.setItem("player_two_score", parseInt(player_two_score) + 1);
                player_two_score++;
                $("#player_two_score").text(player_two_score);
                $("#spelling-alert").text("Player 2 spelled " + spelling_attempt.valueOf().toLowerCase().trim() + " correctly!");
                curr_player = 1;
                localStorage.setItem("curr_player", 1);
            }
            console.log(player_one_score);
            console.log(player_two_score);
        } else {
            if (curr_player == 1) {
                $("#spelling-alert").text("Player one incorrectly spelled " + word.valueOf().toLowerCase().trim() + " as " + spelling_attempt.valueOf().toLowerCase().trim() + ". :(");
                curr_player = 2;
                localStorage.setItem("curr_player", 2);
            } else {
                $("#spelling-alert").text("Player two incorrectly spelled " + word.valueOf().toLowerCase().trim() + " as " + spelling_attempt.valueOf().toLowerCase().trim() + ". :(");
                curr_player = 1;
                localStorage.setItem("curr_player", 1);
            }
            console.log("you are wrong!");
            console.log(player_one_score);
            console.log(player_two_score);
        }
    });
});

//var rows = JSON.stringify(dict);
//console.log(rows);
