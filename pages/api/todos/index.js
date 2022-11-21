import Todo from "../../../db/models/Todo";

export default async (req, res) => {
  if (req.method === "GET") {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  }
  if (req.method === "POST") {
    const { title } = req.body;
    const todo = await Todo.create({
      title,
    });
    res.status(201).json(todo);
  }
};
