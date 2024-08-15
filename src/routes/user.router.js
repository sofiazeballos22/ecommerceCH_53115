const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const multer = require('multer');
const { authorize } = require('passport');


const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.filedname === 'profile') {
            cb(null, path.join(__dirname, 'uploads/profile'));
        } else if (file.filedname === 'product') {
            cb(null, path.join(__dirname, 'uploads/products'));
        } else {
            cd(null, path.join(__dirname, 'uploads/documents'));
        }
    },
    filename: function (req, file, cd) {
        cd(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/register',  UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/refresh-token', UserControllar.refreshToken);

router.post('/:uid/documents', authenticate, upload.fields([
    { name: 'profile', maxCount: 1 },
    { name:' product', maxCount: 7 },
    { name: 'document', maxCount: 7 }
]), UserController.uploadDocuments);

router.post('/premium/:uid', authenticate, UserController.upgradeToPremium);

router.post('/generate-fake-users', async (req, res) => {
    try {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = {
                firts_name: faker.name.firtsName(),
                last_name: faker.name.lastName(),
                email: faker.internet.email(),
                age: faker.random.number({ min: 18, max: 65 }),
                password: await bcrypt.hash('password', 10),
                role: 'user'
            };
            user.push(user);
        }
        await User.insertMany(users);
        res.json({ message: 'Fake users created succesfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create fake users', details: error.message });
    }
});


// Obtención de usuarios
router.get('/', authenticate, athorize(['admin']), async (req, res) => {
    try {
        const users = await User.find({}, 'first_name last_name email role');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failes to fetch users', details: error.message });
    }
});


// Eliminación de usuarios inactivos
router.delete('/', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
        const inactiveUsers = await User.find({ last_connection: { $lt: twoDaysAgo } });

        for (const user of inactiveUsers) {
            await User.deleteOne({ _id: user._id });
        }

        res.json({ message: 'Inactive users deleted succesfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inactive users', details: error.message });
    }
});

module.exports = router;