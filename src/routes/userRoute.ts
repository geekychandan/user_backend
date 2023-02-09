import { Router } from "express";
import authUser from "../controllers/auth.controller";
import update from "../controllers/updateUser.controller";
import { register } from "../controllers/user.controller";
import userInfo from "../controllers/userInfo.controller";


const router = Router()

// router.post('/register', register);

router.route("/register").post(register)
router.route("/login").post(authUser)
router.route("/update").post(update)
router.route("/userinfo/:username").get(userInfo)


export default router;
