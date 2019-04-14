0
0 0 tbsampson / All - the - News - That - s - Fit - to - Scrape
Code  Issues 0  Pull requests 0  Projects 0  Wiki  Insights
All - the - News - That - s - Fit - to - Scrape / controllers / index.js
@tbsampson tbsampson Had to remake this
f19dfd4 on Sep 26, 2018
59 lines(53 sloc)  1.56 KB

'use strict';

const express = require('express'),
    router = express.Router(),
    Article = require('../models/article');

// root route
router.get('/', function (req, res) {
    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function (error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: `...and some that isn't`,
                    articles: articles
                };
                res.render('index', hbsObj);
            }
        });
});

// saved articles
router.get('/saved', function (req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function (error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'All the News That\'s Fit to Scrape',
                    subtitle: 'The Y Combinator Edition',
                    articles: articles
                };
                res.render('saved', hbsObj);
            }
        });
});

// require controllers
router.use('/api', require('./api'));

module.exports = router;
