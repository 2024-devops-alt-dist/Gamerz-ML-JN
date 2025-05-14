import {approveUser, banUser, deleteUser, getUsers} from "../controllers/user.controller";
import {authenticate} from "../middleware/authenticate";
import {Router} from "express";
import {checkRole} from "../middleware/checkRole";
import {UserRole} from "../types/Role";

const router = Router();

router.delete(
    "/:userId",
    authenticate,
    checkRole([UserRole.ADMIN]),
    deleteUser
);

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

router.get(
    "/",
    authenticate,
    checkRole([UserRole.ADMIN]),
    getUsers
);

export default router