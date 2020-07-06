const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARES
app.use(cors());
app.use(express.json()); //access to requst.body for json data

//ROUTES

//create a todo
app.post("/todos", async (req, res) => {
    try {
        //destructuring
        const { description } = req.body;
        //Inserting into table. We insert into todo description. VALUES is just a placeholder. $1 will be replaced with the description. Returning is for the response. todo = table, description = column. Returning star to get back data.
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get a todo -> we only get the todo where the todo_id is equal to req.params.id
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
            id,
        ]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );

        res.json("Todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`);
});
