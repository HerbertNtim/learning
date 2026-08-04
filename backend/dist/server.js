import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// CONFIGURATIONS
dotenv.config();
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cookieParser());
// SERVER 
const port = process.env.PORT || 3000;
if (!isProduction) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
//# sourceMappingURL=server.js.map