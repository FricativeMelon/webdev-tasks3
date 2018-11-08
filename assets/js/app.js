// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import dependencies
//
import "phoenix_html";

import jQuery from 'jquery';
window.jQuery = window.$ = jQuery;
import "bootstrap";
import _ from "lodash";

// Import local files
//
// Local files can be imported directly using relative paths, for example:
// import socket from "./socket"

import tasks3_init from "./tasks3";

//$(() => {
//  let node = $('#root')[0];
//  task3_init(node);
//});

window.addEventListener("load", (_ev) => {
  let root = document.getElementById('root');
  if (root) {
    tasks3_init(root);
  }
});
