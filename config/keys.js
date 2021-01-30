module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.NODE_ENV,
    GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
    GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
    FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
    MAX_FILE_UPLOAD: process.env.MAX_FILE_UPLOAD,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.NODE_ENV,
    JWT_COOKIE_EXPIRE: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    FROM_EMAIL: process.env.FROM_EMAIL,
    FROM_NAME: process.env.FROM_NAME,
}