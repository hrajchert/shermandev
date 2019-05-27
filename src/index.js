const ECT = require('ect');
const {join} = require('path');
const fs = require('fs');

const talks = require('./server-js/talks');
const places = require('./server-js/bike');
// console.log('the talks', talks);

const renderer = ECT({root: join(__dirname, 'templates')});
const indexPage = renderer.render('index.ect', { header: { about: 'b'}});
const talksPage = renderer.render('talks.ect', { header: { talks: 'b'}, talks});
const contributionsPage = renderer.render('contributions.ect', { header: { contributions: 'b'}});
const bikePage = renderer.render('bike.ect', { header: { bike: 'b'}, places});


fs.writeFileSync(join('www','index.html'), indexPage);
fs.writeFileSync(join('www','talks.html'), talksPage);
fs.writeFileSync(join('www','contributions.html'), contributionsPage);
fs.writeFileSync(join('www','bike-tour.html'), bikePage);