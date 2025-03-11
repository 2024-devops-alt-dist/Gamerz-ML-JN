import {deleteUser} from "../controllers/user.controller";
import {authenticate} from "../middleware/authenticate";
import {Router} from "express";

const router = Router();

router.delete("/:userId", authenticate, deleteUser);

export default router