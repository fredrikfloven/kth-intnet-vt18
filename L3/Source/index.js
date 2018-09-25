(function(){
    "use strict";


    //Config
    var currentPlayer = 1;
    var placement = true;

    // click handler for curtain
    addCurtainClickHandler();

    //Get board elements
    var board1Element = $("#board1");
    var board2Element = $("#board2");

    var board1;
    var board2;


    //Create board click handler
    var board1ch = function(cellId){

        if(!placement){
            return;
        }

        //Get array of boats placed by current player
        var boats = board1.getIcons(BOAT, currentPlayer);

        //If all boats have been placed, return
        if(boats.length === MAXSHIPS){
            return;
        }

        // Check for each elment in boats array
        for(var i = 0 ; i < boats.length ; i++){
            //if the clicked cell has been clicked previously
            if(boats[i].cellId === cellId){
                //get the index from the icons array that correspond to the clicked cell
                var index = board1.icons.indexOf(boats[i]);
                //remove that element from the icons array
                board1.icons.splice(index,1);
                //rerender board 1
                board1.render(currentPlayer);
                updateStats(board1, board2);
                return;
            }
        }

        //Place boat on clicked tile
        board1.icons.push(createCellIcon(cellId, BOAT, currentPlayer));

        //If boats array is 4 and we have added the last boat
        if(boats.length === MAXSHIPS-1){
            //If it is the first player, change to second player placement
            if(currentPlayer === 1){
                currentPlayer = 2;
                showCurtain("Next player place boats");
            }
            //else go out of placement phase to next phase, and set to player 1
            else{
                board1.canClick = false;
                board2.canClick = true;
                currentPlayer = 1;
                showCurtain("Take aim, next player!");
                board2.render(currentPlayer);
            }
        }

        board1.render(currentPlayer);
        updateStats(board1, board2);
    }

    var board2ch = function(cellId){
        //If currentPlayer = 1, then otherPlayer = 2, otherwise, otherPlayer = 1
        var otherPlayer = currentPlayer === 1 ? 2 : 1;

        var icon = MISS;

        var hits = board2.getIcons(HIT, currentPlayer);

        var misses = board2.getIcons(MISS, currentPlayer);

        var otherBoats = board1.getIcons(BOAT, otherPlayer);

        //Make it so that one cannot shoot at the same cell several times
        // Check for each elment in hit array
        for(var i = 0 ; i < hits.length ; i++){
            //if the clicked cell has been hit
            if(hits[i].cellId === cellId){
                return;
            }
        }

        // Check for each elment in miss array
        for(var i = 0 ; i < misses.length ; i++){
            //if the clicked cell has been missed
            if(misses[i].cellId === cellId){
                return;
            }
        }

        for(var i = 0 ; i < otherBoats.length ; i++){

            if(otherBoats[i].cellId ===  cellId){
                //Found boat on cell ID
                icon = HIT;
                //get the index from the icons array that correspond to the clicked cell
                var index = board1.icons.indexOf(otherBoats[i]);
                //remove that element from the icons array
                board1.icons.splice(index,1);
                // We remove in original list, therefore it's still 1 in otherBoats
                if(otherBoats.length === 1){
                    showCurtain("PLAYER" + currentPlayer + " WINS!");
                    board1.canClick = false;
                    board2.canClick = false;
                }
            }
        }


        board1.icons.push(createCellIcon(cellId, icon, otherPlayer));
        board2.icons.push(createCellIcon(cellId, icon, currentPlayer));

        if(icon === MISS){
            showCurtain("Take aim, next player!");
            currentPlayer = otherPlayer;
        }

        board1.render(currentPlayer);
        board2.render(currentPlayer);
        updateStats(board1, board2);
    }


    //Create boards
    board1 = createBoard(board1Element, SIZE, SIZE, board1ch);
    board2 = createBoard(board2Element, SIZE, SIZE, board2ch);

    board1.canClick = true;

    board1.render(currentPlayer);
    board2.render(currentPlayer);
    updateStats(board1, board2);
    showCurtain("START");


})();