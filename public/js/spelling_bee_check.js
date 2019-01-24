var player_one_score = 0;
var player_two_score = 0;
var curr_player = 1;

$(document).ready(function () {
    $("#player_one_score").text(player_one_score);
    $("#player_two_score").text(player_two_score);
    $("#reset_score").click(function () {
        $("#player_one_score").text(0);
        $("#player_two_score").text(0);
        player_one_score = 0;
        player_two_score = 0;
        curr_player = 1;
    });
    $("#check_spelling").click(function () {
        word = $("#secret-entry-word").text();
        console.log("word == " + word);
        spelling_attempt = $("#spelling_attempt").val();
        
        if (word.valueOf().toLowerCase().trim() == spelling_attempt.valueOf().toLowerCase().trim()) {
            if (curr_player == 1) {
                console.log("incrementing player_one_score");
                player_one_score++;
                $("#player_one_score").text(player_one_score);
                $("#spelling-alert").text("Player 1 spelled " + spelling_attempt.valueOf().toLowerCase().trim() + " correctly!");
                curr_player = 2;
            } else {
                player_two_score++;
                $("#player_two_score").text(player_two_score);
                $("#spelling-alert").text("Player 2 spelled " + spelling_attempt.valueOf().toLowerCase().trim() + " correctly!");
                curr_player = 1;
            }
        } else {
            if (curr_player == 1) {
                $("#spelling-alert").text("Player one incorrectly spelled " + word.valueOf().toLowerCase().trim() + " as " + spelling_attempt.valueOf().toLowerCase().trim() + ". :(");
                curr_player = 2;
            } else {
                $("#spelling-alert").text("Player two incorrectly spelled " + word.valueOf().toLowerCase().trim() + " as " + spelling_attempt.valueOf().toLowerCase().trim() + ". :(");
                curr_player = 1;
            }
            console.log("you are wrong!");
            console.log(player_one_score);
            console.log(player_two_score);
        }
    });

});