
import { Router } from 'express';
import multer from 'multer';
import UserController from '../controllers/user.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';
import User from '../dao/mongo/models/user.model.js'; // Importar el modelo User
import bcrypt from 'bcrypt'; 
import faker from 'faker';  
import passport from 'passport';

import path from 'path';  
import { fileURLToPath } from 'url';



faker.locale = 'es'; 
const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const baseDir = path.join(__dirname, '..', 'uploads'); // Asegurarse de que apunta al nivel correcto
    if (file.fieldname === 'profile') {
      cb(null, path.join(baseDir, 'profiles'));
    } else if (file.fieldname === 'product') {
      cb(null, path.join(baseDir, 'products'));
    } else {
      cb(null, path.join(baseDir, 'documents'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/register', upload.none(), UserController.register);
router.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), UserController.login);
router.post('/logout', authenticate, UserController.logout);
router.post('/refresh-token', UserController.refreshToken);
router.post('/:uid/documents', authenticate, upload.fields([
  { name: 'profile', maxCount: 1 },
  { name: 'product', maxCount: 10 },
  { name: 'document', maxCount: 10 }
]), UserController.uploadDocuments);
router.post('/premium/:uid', authenticate, UserController.upgradeToPremium);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.get('/current', authenticate, UserController.getCurrentUser);
router.post('/generate-fake-users', async (req, res) => {
  try {                                                         
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.random.number({ min: 18, max: 65 }),
        password: await bcrypt.hash('password', 10),
        role: 'user'
      };
      users.push(user);
    }
    await User.insertMany(users);
    res.json({ message: 'Fake users created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create fake users', details: error.message });
  }
});
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, 'first_name last_name email role');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});
router.delete('/', authenticate, authorize(['admin']), UserController.deleteInactiveUsers);


export default router;

