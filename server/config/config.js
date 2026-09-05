module.exports = {
    port: process.env.PORT || 5500,
    dbConnection: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    cookie_name: process.env.AUTH_COOKIE,
    jwt_secret: process.env.SECRET,
    rounds: Number(process.env.ROUNDS)
};