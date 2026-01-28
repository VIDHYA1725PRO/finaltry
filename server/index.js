const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const Person = mongoose.model(
  "Person",
  { name: String, age: Number },
  "person"
);

app.get("/", async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

app.post("/", async (req, res) => {
  const newPerson = await Person.create(req.body);
  res.json(newPerson);
});

app.put("/:id", async (req, res) => {
  const updated = await Person.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

app.delete("/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ message: "Person deleted" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});