"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var routes_1 = require("./routes");
var database_1 = require("./config/database");
var error_middleware_1 = require("./middlewares/error.middleware");
var logger_1 = require("./config/logger");
var morgan_1 = require("morgan");
var App = /** @class */ (function () {
    function App() {
        this.db = new database_1.default();
        this.logStream = logger_1.default.logStream;
        this.logger = logger_1.default.logger;
        this.errorHandler = new error_middleware_1.default();
        this.app = (0, express_1.default)();
        this.host = process.env.APP_HOST;
        this.port = process.env.APP_PORT;
        this.api_version = process.env.API_VERSION;
        this.initializeMiddleWares();
        this.initializeRoutes();
        this.initializeDatabase();
        this.initializeErrorHandlers();
        this.startApp();
    }
    App.prototype.initializeMiddleWares = function () {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('combined', { stream: this.logStream }));
    };
    App.prototype.initializeDatabase = function () {
        this.db.initializeDatabase();
    };
    App.prototype.initializeRoutes = function () {
        this.app.use("/api/".concat(this.api_version), (0, routes_1.default)());
    };
    App.prototype.initializeErrorHandlers = function () {
        this.app.use(this.errorHandler.appErrorHandler);
        this.app.use(this.errorHandler.genericErrorHandler);
        this.app.use(this.errorHandler.notFound);
    };
    App.prototype.startApp = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            _this.logger.info("Server started at ".concat(_this.host, ":").concat(_this.port, "/api/").concat(_this.api_version, "/"));
        });
    };
    App.prototype.getApp = function () {
        return this.app;
    };
    return App;
}());
var app = new App();
exports.default = app;
