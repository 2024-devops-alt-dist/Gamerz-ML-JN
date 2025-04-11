// server/src/routes/auth.routes.ts
import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {register, login, logout} from "../controllers/auth.controller";
import { body, validationResult } from "express-validator";
import { authenticate } from "../middleware/authenticate";

const router = Router();

const validate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

router.post(
    "/register",
    [
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
        body("username").notEmpty(),
        body("motivation").notEmpty(),
        validate
    ],
    register
);

router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").exists(),
        validate
    ],
    login
);

router.post("/logout", logout);

router.get("/me", authenticate, (req: Request, res: Response) => {
    res.json({ user: req.user });
});

export default router;