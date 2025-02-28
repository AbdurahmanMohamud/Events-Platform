import expres from "express";
import {getAllEvents, postEvent} from "../controllers/eventsControllers.js"
const router = expres.Router();

router.get("/",getAllEvents);
router.post("/",postEvent);

export default router;

