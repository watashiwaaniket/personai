"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DatabaseConnectionString: (_a = process.env.DATABASE_CONNECTION_STRING) !== null && _a !== void 0 ? _a : '',
    ExpressPort: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : '',
    JwtUserPassword: (_c = process.env.JWT_USER_PASSWORD) !== null && _c !== void 0 ? _c : '',
    GeminiApiKey: (_d = process.env.GEMINI_API_KEY) !== null && _d !== void 0 ? _d : ''
};
