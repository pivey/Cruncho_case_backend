"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
var PORT = process.env.PORT || '3001';
var PlacesApiKey = process.env.GOOGLE_API_KEY;
var app = express_1.default();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var baseURL = 'https://maps.googleapis.com/maps/api/place/';
var getNearbyRestaurants = function (lat, long) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios.get(baseURL + "nearbysearch/json?location=" + lat + "," + long + "&rankby=distance&type=restaurant&key=" + PlacesApiKey)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                err_1 = _a.sent();
                console.log(err_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
app.post('/nearbyRestaurants', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, latitude, longitude, result, output;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, latitude = _a.latitude, longitude = _a.longitude;
                if (!(res.statusCode === 200 && latitude && longitude)) return [3 /*break*/, 2];
                return [4 /*yield*/, getNearbyRestaurants(latitude, longitude)];
            case 1:
                result = _b.sent();
                output = result.data.results.reduce(function (acc, el) {
                    var _a, _b;
                    if (el.business_status === 'OPERATIONAL') {
                        acc.push({
                            location: __assign({}, el.geometry.location),
                            open: ((_a = el.opening_hours) === null || _a === void 0 ? void 0 : _a.open_now) || false,
                            photoReference: (_b = el === null || el === void 0 ? void 0 : el.photos) === null || _b === void 0 ? void 0 : _b[0].photo_reference,
                            icon: el.icon,
                            name: el.name,
                            placeId: el.place_id,
                            priceLevel: el.price_level,
                            rating: el.rating,
                            types: el.types,
                            userRatingTotal: el.user_ratings_total,
                            vicinity: el.vicinity
                        });
                    }
                    return acc;
                }, []);
                res.send(output);
                _b.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
var startServer = function () {
    try {
        app.listen(PORT, function () {
            console.log("server started listening at http://localhost:" + PORT);
        });
    }
    catch (error) {
        console.error(error.message);
    }
};
startServer();
