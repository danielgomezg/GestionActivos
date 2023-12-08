import { Router } from "express";
import { join } from "path";

const router = Router();

router.get("/", function(_req, res, _next) {
    // res.send(join(process.cwd(), "dist", "layouts", "index.html"))
    res.sendFile(join(process.cwd(), "src/layouts", "index.html"))
});

export default router;