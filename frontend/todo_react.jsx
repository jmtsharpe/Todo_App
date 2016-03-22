var React = require("react"),
    ReactDOM = require("react-dom"),
    TodoList = require("./todo_list"),
    TodoForm = require("./todo_form");

$(document).ready(function (e) {
    ReactDOM.render(
      <div>
        <TodoList />
        <TodoForm />
      </div>,
      $("main")[0]
    );
  });
