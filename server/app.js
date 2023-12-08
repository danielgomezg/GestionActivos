import express from 'express';
import path from 'path'
import { resolve } from 'path';
import session from "express-session";
import webRouter from './web-router.js';
import server from './server.js'
// import gatewayRouter from './gateway-router.js';

const app = express();

app.use("/", server.handleRedirect, webRouter);
// app.use("/gateway", gatewayRouter);


const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

server.listen(app, PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;