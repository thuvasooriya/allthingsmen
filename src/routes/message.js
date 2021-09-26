// import { v4 as uuidv4 } from "uuid"; // helper library to generate unique identifiers
import { Router } from "express"; // that helper component to recreate express actions

const router = Router(); // I mean should we do this? why don't we use jusr Router instead

router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.find();
  return res.send(messages);
});

router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId
  );
  return res.send(message);
});

router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    user: req.context.me.id,
  });

  return res.send(message);
});

router.delete("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findById(
    req.params.messageId
  );

  if (message) {
    await message.remove();
  }

  return res.send(message);
});

export default router;
