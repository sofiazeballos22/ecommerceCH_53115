const mongoose = require('mongoose');
const faker = require('faker')
const dotenv = require('dotenv'); // Cargar las variables de entorno desde el archivo .env 
dotenv.config(); 
faker.locale = 'es';

const uri = 'mongodb+srv://azeballos512:xxpepegrilloxx22@clusterbackend.xvnrb.mongodb.net/ecommerce_CH53115?retryWrites=true&w=majority&appName=clusterBackend';
if (!uri) {
    console.error('Error: MondoBD_URI no esta definido');
    process.exit(1);
}

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => { 
    console.log('Connected to MongoDB Atlas successfully'); 
    createProducts(); 
}) .catch(err => {
     console.error('Error connecting to MongoDB Atlas:', err);
     });
      const productSchema = new mongoose.Schema({
        title: String,
        description: String,
        code: String,
        price: Number, 
        status: Boolean,
        stock: Number,
        category: String,
        thumbnails: [String] });
       const Product = mongoose.model('Product', productSchema);
        async function createProducts() {
             const products = [];
              for (let i = 0; i < 50; i++) {
                const product = { 
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(), 
                    code: faker.datatype.uuid(),
                    price: parseFloat(faker.commerce.price()),
                    status: faker.datatype.boolean(),
                    stock: faker.datatype.number({ min: 1, max: 100 }),
                    category: faker.commerce.department(), 
                    thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()]
                 }; 
                products.push(product);
                } 
                try { 
                    await Product.insertMany(products);
                    console.log('50 products created successfully');
                    } catch (err) {
                        console.error('Error creating products:', err); 
                    } finally {
                        mongoose.connection.close();
                    } 
        }  
