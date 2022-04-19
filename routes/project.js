const router = require("express").Router();
const { add, update, destroy, get, show } = require("../controllers/projects");

router.get("/", get);
router.get("/:id", show);
router.post("/", add);
router.patch("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
