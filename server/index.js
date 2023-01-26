import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/post', postRoutes);

app.get('/', async (req, res) => {
    res.send('Welcome to DALL-E');
});

const port = 8080;
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log('running on port ' + port);
        });
    } catch (error) {
        console.log(error);
    }
};
startServer();