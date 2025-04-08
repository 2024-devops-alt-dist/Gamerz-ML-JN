// server/src/routes/channel.routes.ts
import { Router } from "express";
import { createChannel, getChannels } from "../controllers/channel.controller";
import { authenticate } from "../middleware/authenticate";
import { body, validationResult } from "express-validator";
import {checkRole} from "../middleware/checkRole";
import {UserRole} from "../types/Role";

const router = Router();

// const validate = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     next();
// };

router.post(
    "/",
    authenticate,
    checkRole([UserRole.ADMIN]),
    [body("name").notEmpty().withMessage("Channel name is required"),
        // validate
    ],
    createChannel
);

router.get(
    "/",
    authenticate,
    checkRole([UserRole.ADMIN]),
    getChannels
);

export default router;