"use strict";
function updateStats(board1, board2){

    //get stats element
    var stats = $("#stats");
    //Get amount of boats, hits and misses for player 1
    var player1Boats = board1.getIcons(BOAT, 1).length;
    var player1Hits = board2.getIcons(HIT, 1).length;
    var player1Misses = board2.getIcons(MISS, 1).length;
    //Get amount of boats, hits and misses for player 1
    var player2Boats = board1.getIcons(BOAT, 2).length;
    var player2Hits = board2.getIcons(HIT, 2).length;
    var player2Misses = board2.getIcons(MISS, 2).length;

    //Print it out in stats div
    stats.html("Player 1: <br/>" + player1Boats + " boats" + "<br/>" + (player1Hits + player1Misses) + " shots fired"
        + "<br/>" + player1Hits + " hits" + "<br/>" + player1Misses + " misses"
        + "<br/> <br/>"
        + "Player 2: <br/>" + player2Boats + " boats" + "<br/>" + (player2Hits + player2Misses) + " shots fired"
        + "<br/>" + player2Hits + " hits" + "<br/>" + player2Misses + " misses");
}