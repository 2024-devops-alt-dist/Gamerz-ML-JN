import {Router} from "express";
import {createChannel, getChannels} from "../controllers/channel.controller";
import {authenticate} from "../middleware/authenticate";
import {body} from "express-validator";
import {checkRole} from "../middleware/checkRole";
import {UserRole} from "../types/Role";

const router = Router();

router.post(
    "/",
    authenticate,
    checkRole([UserRole.GAMER, UserRole.ADMIN]),
    [body("name").notEmpty().withMessage("Channel name is required")],
    createChannel
);

router.get(
    "/",
    authenticate,
    checkRole([UserRole.GAMER, UserRole.ADMIN]),
    getChannels
);

export default router;