import  dotenv  from 'dotenv';

config()

export default  {
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGO_URI,
    dbName: process.env.DB_NAME,
    port: process.env.PORT || 8080
}