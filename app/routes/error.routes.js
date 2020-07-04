module.exports = (app) => {
    // Return error not found for all other routes
    app.use((req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({error : err.message});
        });
}