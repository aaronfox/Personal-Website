var player_one_score = 0;
var player_two_score = 0;
var curr_player = 1;
var has_checked_spelling = false;

// TODO: Make sure user cannot repeatedly press Check Word button to increment both scores
// TODO: Make sure same words will not repeat (will need to be implemented via API)
// TODO: Empty out input text and autofocus on the input text when check word button is clicked and when next word button is clicked
// (and when Reset button is clicked)
$(document).ready(function () {
    $("#player_one_score").text(player_one_score);
    $("#player_two_score").text(player_two_score);
    $("#reset_score").click(function () {
        $("#player_one_score").text(0);
        $("#player_two_score").text(0);
        player_one_score = 0;
        player_two_score = 0;
        curr_player = 1;
        has_checked_spelling = false;
    });
    $("#test_button").click(function () {
        has_checked_spelling = false;
    });
    $("#check_spelling").click(function () {
        word = $("#secret-entry-word").text();
        spelling_attempt = $("#spelling_attempt").val();

        if (has_checked_spelling == false) {
            if (word.valueOf().toLowerCase().trim() == spelling_attempt.valueOf().toLowerCase().trim()) {
                if (curr_player == 1) {
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
            }
        }
        has_checked_spelling = true;
    });

});