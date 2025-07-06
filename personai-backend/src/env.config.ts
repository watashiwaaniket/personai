export default {
    DatabaseConnectionString: process.env.DATABASE_CONNECTION_STRING ?? '',
    ExpressPort: process.env.PORT ?? '',
    JwtUserPassword: process.env.JWT_USER_PASSWORD ?? '',
    GeminiApiKey: process.env.GEMINI_API_KEY ?? ''
}