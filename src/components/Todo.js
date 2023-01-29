import React, {useEffect, useState} from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import classes from "../sytles/Todo.module.css";
import TodoFilter from "./TodoFilter";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [filterParam, setFilterParam] = useState("all");

  const DUMMY_DATA = [
    {
      id: Math.floor(Math.random() * 10000),
      data: "I am an unfinished todo",
      editMode: false,
      isCompleted: false,
    },
    {
      id: Math.floor(Math.random() * 10000),
      data: "I am a finished todo",
      editMode: false,
      isCompleted: true,
    },
    {
      id: Math.floor(Math.random() * 10000),
      data: "Click on the text to finish todos!",
      editMode: false,
      isCompleted: false,
    },
  ];

  useEffect(() => {
    setTodos(DUMMY_DATA);
  }, []);

  const addTodo = (todo) => {
    if (!todo.data || /^\s*$/.test(todo.data)) {
      return;
    }
    setTodos([...todos, todo]);
  };

  const toggleEditMode = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.editMode = !todo.editMode;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editHandler = (e, id, newData) => {
    e.preventDefault();

    if (!newData || /^\s*$/.test(newData)) {
      return;
    }

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.editMode = !todo.editMode;
        todo.data = newData;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteHandler = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const getSearchParam = (data) => {
    setSearchParam(data);
  };

  const getFilterParam = (data) => {
    setFilterParam(data);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>Todo App</h1>
        <TodoForm onSubmit={addTodo} />
        <TodoFilter
          todos={todos}
          getSearchParam={getSearchParam}
          getFilterParam={getFilterParam}
        />

        <TodoList
          todos={todos}
          searchParam={searchParam}
          filterParam={filterParam}
          toggleEditMode={toggleEditMode}
          toggleCompleted={toggleCompleted}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
};

export default Todo;
