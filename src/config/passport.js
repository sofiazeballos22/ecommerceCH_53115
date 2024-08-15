import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pkg from 'passport-jwt';
import UserService from '../services/user.service.js';
import bcrypt from 'bcrypt';

const { Strategy: JWTStrategy, ExtractJwt: ExtractJWT } = pkg;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use(
    'login',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' }, // Corregido el espacio extra
        async (email, password, done) => {
            try {
                const user = await UserService.getUserByEmail(email);
                if (!user) {
                    return done(null, false, { message: 'Usuario no válido' });
                }
                const validate = await bcrypt.compare(password, user.password);
                if (!validate) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
                return done(null, user, { message: 'Logueado exitosamente' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

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

const initializePassport = () => {
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
};

export default initializePassport;
