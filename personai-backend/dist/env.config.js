"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DatabaseConnectionString: process.env.DATABASE_CONNECTION_STRING ?? '',
    ExpressPort: process.env.PORT ?? '',
    JwtUserPassword: process.env.JWT_USER_PASSWORD ?? '',
    GeminiApiKey: process.env.GEMINI_API_KEY ?? ''
};
