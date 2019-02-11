// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";
import $ from "jquery";
// import React from 'react';
// import { render } from 'react-dom';

// Import local files
//
// Local files can be imported directly using relative paths, for example:
import socket from "./socket"

import game_init from "./starter-game";
// import Starter from './starter-game';

function start(){
  let root = document.getElementById('root');
  if (root){
    // let channel = socket.channel(`games:${gameName}`, {});
    let channel = socket.channel("games:" + window.gameName, {});
    game_init(root, channel);
    // render(<Starter channel={channel} />, root);
  }
}
console.log(">>>>> heiheiehi ");
$(start);
