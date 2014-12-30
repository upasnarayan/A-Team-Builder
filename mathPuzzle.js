module.exports = function(app){
    app.get('/mathPuzzle', function(req, res) {
        res.render('mathPuzzle');
    });
};
