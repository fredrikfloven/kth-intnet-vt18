/* jslint node: true */
"use strict";

var io = undefined;

exports.setIo = function(newIo) {
    io = newIo;
}

exports.getIo = function() {
    return io;
}