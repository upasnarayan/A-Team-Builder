module.exports = function(app){
    app.get('/submitted', function(req, res) {
        res.render('submitted');
    });
};
