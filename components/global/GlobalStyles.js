const GLOBAL = require("./GlobalFunctions.js").style();
const TINT_COLOR = GLOBAL.color;

import React, { Component } from "react";
import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  absoluteCover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  basicShadow: {
    // android shadow
    elevation: 3,
    shadowColor: TINT_COLOR,

    // ios shadow
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.15
  },
  strongShadow: {
    // android shadow
    elevation: 2,
    shadowColor: TINT_COLOR,

    // ios shadow
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.3
  },
  buttonShadow: {
    // android shadow
    elevation: 3,
    shadowColor: TINT_COLOR,

    // ios shadow
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.15
  },
  weakShadow: {
    // android shadow
    elevation: 2,
    shadowColor: TINT_COLOR,

    // ios shadow
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.05
  },
  text: {
    fontSize: 15
    // fontFamily: "space-mono"
  },
  subtext: {
    fontSize: 15,
    // fontFamily: "space-mono",
    color: GLOBAL.gray,
    fontWeight: "500"
  },
  boldText: {
    fontSize: 20,
    // fontFamily: "space-mono",
    fontWeight: "bold"
  },
  global: {
    color: TINT_COLOR
  }
});
