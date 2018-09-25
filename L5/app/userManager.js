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
function User(name) {
    this.id = guid().toString();
    this.name = name;
}

//Adds a user to users list
exports.addUser = function (name) {
    var user = new User(name);
    users.push(user);
};

//Matches a given user id with an existing one and returns the user
exports.getUserById = function (id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i];
        }
    }
    return undefined;
};

//Matches a given name with an existing one and returns the user
exports.getUserByName = function (name) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].name == name) {
            return users[i];
        }
    }
    return undefined;
};