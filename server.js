import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleContactRequest } from './contact-email.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const DIST_DIR = path.resolve(__dirname, 'dist');

export function createApp() {
    const app = express();

    app.use(express.json({ limit: '32kb' }));

    app.post('/api/contact', async (req, res) => {
        const result = await handleContactRequest({
            body: req.body,
            headers: req.headers,
        });

        res.status(result.status).json(result.body);
    });

    // Middleware to handle clean URLs (e.g. /about -> /about.html)
    app.use((req, res, next) => {
        if (req.path.startsWith('/api/')) {
            return next();
        }

        if (req.path !== '/' && !req.path.includes('.')) {
            req.url = `${req.path}.html`;
        }
        next();
    });

    app.use(express.static(DIST_DIR));

    return app;
}

const startServer = (app, port) => {
    const server = app.listen(port, () => {
        console.log(`\n--- Local Archive Preview Server ---`);
        console.log(`Server running at http://localhost:${port}`);
        console.log(`Press Ctrl+C to stop`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(app, port + 1);
        } else {
            console.error(err);
        }
    });
};

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
    startServer(createApp(), PORT);
}
