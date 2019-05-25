const ECT = require('ect');
const {join} = require('path');
const fs = require('fs');

const renderer = ECT({root: join(__dirname, 'templates')});
const index = renderer.render('index.ect', { header: { about: 'b'}});
const talks = renderer.render('talks.ect', { header: { talks: 'b'}});
const contributions = renderer.render('contributions.ect', { header: { contributions: 'b'}});
const bike = renderer.render('bike.ect', { header: { bike: 'b'}});


fs.writeFileSync(join('www','index.html'), index);
fs.writeFileSync(join('www','talks.html'), talks);
fs.writeFileSync(join('www','contributions.html'), contributions);
fs.writeFileSync(join('www','bike-tour.html'), bike);