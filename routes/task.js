const router = require("express").Router();
const { add, update, destroy, list, show } = require("../controllers/tasks");

router.get("/", list);
router.get("/:id", show);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
