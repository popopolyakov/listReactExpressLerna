const Middleware = require('./middleware');


class TestMiddleware extends Middleware {
    createMiddleware() {
        this.middleware = (req, res, next) => {
            console.log("Got a request");
            next();
        };
    }

    
    static signMiddleware(app) {
        const middleware = new TestMiddleware();
        middleware.createMiddleware();
        
        app.use(middleware.middleware);
    }
}

module.exports = TestMiddleware;