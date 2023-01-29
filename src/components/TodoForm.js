import React, {useRef} from "react";
import classes from "../sytles/TodoForm.module.css";

const TodoForm = (props) => {
  const todoRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      data: todoRef.current.value,
      editMode: false,
      isCompleted: false,
    });
    todoRef.current.value = "";
    todoRef.current.focus();
  };

  return (
    <form className={classes["todo-add"]} onSubmit={submitHandler}>
      <input
        type="text"
        ref={todoRef}
        placeholder="Add New Todo Here!"
        autoFocus
      />
      <button>Add</button>
    </form>
  );
};

export default TodoForm;
