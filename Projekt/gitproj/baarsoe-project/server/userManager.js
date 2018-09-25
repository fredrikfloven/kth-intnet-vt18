/* jslint node: true */
"use strict";

var users = [];

// Helper to generate guid.
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

//The user model
function User(username) {
    this.userid = guid().toString();
    this.username = username;
}

//Adds a user to users list
exports.addUser = function (username) {
    var user = new User(username);
    users.push(user);
};

//Clears array of user(s)
exports.clearArray = function (){
    users = [];
};

//Gets user id
exports.getUserId = function (){
    return users[0].userid;
};