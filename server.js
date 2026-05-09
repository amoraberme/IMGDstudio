import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');

// Middleware to handle clean URLs (e.g. /about -> /about.html)
app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        const filePath = path.join(DIST_DIR, `${req.path}.html`);
        req.url = `${req.path}.html`;
    }
    next();
});

app.use(express.static(DIST_DIR));

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`\n--- Local Archive Preview Server ---`);
        console.log(`Server running at http://localhost:${port}`);
        console.log(`Serving from: ${DIST_DIR}`);
        console.log(`Press Ctrl+C to stop.\n`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });
};

startServer(PORT);
