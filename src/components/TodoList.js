import React, {useRef} from "react";
import {BiEditAlt, BiTrash} from "react-icons/bi";
import classes from "../sytles/TodoList.module.css";
import cx from "classnames";

const TodoList = (props) => {
  const editRef = useRef();

  let filteredTodos;

  const todoStatusFilter = () => {
    switch (props.filterParam) {
      case "active":
        return (filteredTodos = props.todos.filter(
          (todo) => !todo.isCompleted
        ));
      case "done":
        return (filteredTodos = props.todos.filter((todo) => todo.isCompleted));
      default:
        return (filteredTodos = props.todos);
    }
  };

  const todoSearchFilter = () => {
    if (props.searchParam) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.data.toLowerCase().includes(props.searchParam.toLowerCase())
      );
    }
  };

  todoStatusFilter();
  todoSearchFilter();

  return filteredTodos.map((todo) =>
    todo.editMode ? (
      <form
        className={classes["todo-edit"]}
        key={todo.id}
        onSubmit={(e) => props.editHandler(e, todo.id, editRef.current.value)}
      >
        <input type="text" defaultValue={todo.data} ref={editRef} autoFocus />
        <button>Edit</button>
      </form>
    ) : (
      <div className={classes.animationWrap} key={todo.id}>
        <div
          className={`${
            todo.isCompleted
              ? cx([classes["todo-row"], classes["completed"]])
              : [classes["todo-row"]]
          }`}
        >
          <div onClick={() => props.toggleCompleted(todo.id)}>{todo.data}</div>
          <div className={classes["todo-button"]}>
            <div className={classes["todo-button-edit"]}>
              <BiEditAlt onClick={() => props.toggleEditMode(todo.id)} />
            </div>

            <div>
              <BiTrash onClick={() => props.deleteHandler(todo.id)} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TodoList;
