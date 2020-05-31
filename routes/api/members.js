const express = require("express");
const router = express.Router();
const uuid = require("uuid");
let members = require("../../Members");

// GET API to fetch all members
router.get("/", (req, res) => res.json(members));

// GET API to fetch single member
router.get("/:id", (req, res) => {
  const found = members.some((mem) => mem.id == req.params.id);
  if (found) {
    res.json(members.filter((mem) => mem.id == req.params.id));
  } else {
    res.status(400);
    res.json({ msg: `No member found with id : ${req.params.id}` });
  }
});

// POST API to Create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
  };

  if (!newMember.name) {
    res.status(400);
    res.json({
      msg: "Name is mandatory",
    });
  } else {
    members.push(newMember);
    res.json(members);
    // res.redirect("/");
  }
});

// PUT API to update single member
router.put("/:id", (req, res) => {
  const found = members.some((mem) => mem.id == req.params.id);
  if (found) {
    const updatedMember = req.body;
    members.forEach((mem) => {
      if (mem.id === req.params.id) {
        mem.name = updatedMember.name;
      }
    });
    res.json({
      msg: "Member Updated",
      members: members.filter((mem) => mem.id === req.params.id),
    });
  } else {
    res.status(400);
    res.json({ msg: `No member found with id : ${req.params.id}` });
  }
});

// DELETE API to delete a single member
router.delete("/:id", (req, res) => {
  const found = members.some((mem) => mem.id == req.params.id);
  if (found) {
    console.log(members);
    members = members.filter((mem) => mem.id !== req.params.id);
    console.log(members);
    res.json({
      msg: "Member Deleted",
      members,
    });
  } else {
    res.status(400);
    res.json({ msg: `No member found with id : ${req.params.id}` });
  }
});

module.exports = router;
