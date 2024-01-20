import express from "express";
import {
  getAllJoyas,
  getJoyasLimit,
  getOrderAndLimitjoya,
  joyasWithPagination,
  filterControllerjoyas,
 getControllerjoyasWithHateoas,
  getJoyasById,
 
} from "../src/controllers/joyasControllers.js";
const router = express.Router();

router.get("/joyas",getAllJoyas );
router.get("/joyas_with_limit",getJoyasLimit);
router.get("/joyas_with_limit_and_order", getOrderAndLimitjoya);
router.get("/joyas_with_pagination", joyasWithPagination);
router.get("/joyas_filter",filterControllerjoyas);
router.get("/joyas_with_hateoas", getControllerjoyasWithHateoas);
router.get("/joyas/:id", getJoyasById);


export default router;