import {approveUser, banUser, deleteUser} from "../controllers/user.controller";
import {authenticate} from "../middleware/authenticate";
import {Router} from "express";
import {checkRole} from "../middleware/checkRole";
import {UserRole} from "../types/Role";

const router = Router();

router.delete("/:userId", authenticate, deleteUser);

router.put(
    "/:userId/approve",
    authenticate,
    checkRole([UserRole.ADMIN]),
    approveUser
);

router.put(
    "/:userId/ban",
    authenticate,
    checkRole([UserRole.ADMIN]),
    banUser
);

export default router