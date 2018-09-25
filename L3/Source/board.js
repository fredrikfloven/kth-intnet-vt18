"use strict";
function createBoard(boardElem, width, height, clickHandler){

    //Return board object with icons, canClick, getIcons and render.
    return {
        icons:[],
        canClick:false,

        getIcons:function(icon, player){
            var result = [];

            // For all icons
            for(var i = 0; i < this.icons.length ; i++){
                // If the current icon in icons equals the specified icon and it belongs to the specified player
                if(this.icons[i].icon === icon && this.icons[i].player === player){
                    // Add the icon to the result array
                    result.push(this.icons[i]);
                }
            }
            return result;
        },

        render:function(currentPlayer){
            //Clear elements
            boardElem.empty();

            for(var i = 0 ; i < height ; i++){
                //Give each row a class called row
                var rowElem = $("<div class=\"row\"></div>");

                //For each column
                for(var j = 0 ; j < width ; j++){
                    //Cell Id = row * the grid height + column + 1, to give each row a specific identifier
                    var cellId = i * height + j + 1;
                    //Give each cell a class called cell
                    var cellElem = $("<div class=\"cell\"></div>");
                    //Save cellId on cellElem
                    cellElem.data("cellId", cellId);

                    //Go through icons array
                    for( var k = 0 ; k < this.icons.length ; k++){
                        //If this cell ID is in the array
                        if(this.icons[k].cellId === cellId && currentPlayer === this.icons[k].player){
                            //Then add the icon to the cell
                            cellElem.text(this.icons[k].icon);
                        }
                    }

                    //If canClick is true, add hover effect
                    if(this.canClick){
                        cellElem.addClass("clickable");
                    }

                    cellElem.on("click",function(param){
                        //If can click cell
                        if(this.canClick){
                            //Get cell Id
                            var cellId = $(param.currentTarget).data("cellId");
                            //Call clickHandler from Index.js with cellId
                            clickHandler(cellId);
                        }

                    //Bind sets the this variable inside the function to what we want,
                    //in this case, we want to bind this inside the function to this outside the function
                    //so that we can access the canClick property
                    }.bind(this));

                    //Add cell element to the row element
                    rowElem.append(cellElem);
                }
                //Add row element to board element
                boardElem.append(rowElem);
            }
        }
    };
};