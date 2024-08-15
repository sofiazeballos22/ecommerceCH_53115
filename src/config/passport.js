import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJWT as ExtractJWT } from 'passport-jwt';
import UserService from '../services/user.service';
import bcrypt from 'bcrypt';

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
    }
    return token;
};

passport.use(
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