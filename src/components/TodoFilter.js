import React, {useState, useEffect} from "react";
import classes from "../sytles/TodoFilter.module.css";

const TodoFilter = (props) => {
  const [search, setSearch] = useState();

  const [active, setActive] = useState({
    all: true,
    active: false,
    done: false,
  });

  const searchInput = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    props.getSearchParam(search);
  }, [search]);

  const showAll = () => {
    props.getFilterParam("all");
    setActive({
      all: true,
      active: false,
      done: false,
    });
  };

  const showActive = () => {
    props.getFilterParam("active");
    setActive({
      all: false,
      active: true,
      done: false,
    });
  };
  const showDone = () => {
    props.getFilterParam("done");
    setActive({
      all: false,
      active: false,
      done: true,
    });
  };

  return (
    <div className={classes["todo-filter"]}>
      <input type="text" onChange={searchInput} placeholder="Search" />

      <div className={classes["todo-status"]}>
        <button className={active.all ? classes.active : ""} onClick={showAll}>
          All
        </button>
        <button
          className={active.active ? classes.active : ""}
          onClick={showActive}
        >
          Active
        </button>
        <button
          className={active.done ? classes.active : ""}
          onClick={showDone}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TodoFilter;
