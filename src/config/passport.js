const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jswt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserService = require('../services/user.service');
const bcrypt = require('bcrypt');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use {
    'login',
    new LocalStrategy (
        { usernameField: 'email', passwordField:' password' },
        async (email, password, done) => {
            try {
                const user = await UserService.getUserByEmail(email);
                if (!user) {
                    return done(null, false, {message: 'Usario no valido'});
                }
                const validate = await bcrypt.compare(password, user.password);
                if (!validate) {
                    return done(null, false, { message: 'Contraseña incorrecta'});
                }
                return done(null, user, { message: 'Logueado existosamente'});
            } catch (error) {
                return done(error);
            }
        }
    )
};

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET 
        },
        async (jwtPayload, done) => {
            try {
                const user = await UserService.getUserById(jwtPayload.id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = {
    initializePassport: () => {
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id, done) => {
            try {
                const user = await UserService.getUserById(id);
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        });
    }
};