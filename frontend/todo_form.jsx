var React = require("react");
var TodoStore = require("./stores/todo_store.js");

var TodoForm = React.createClass({
  getInitialState: function () {
    return { title: "", body: "", value: "" };
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.updateTitle);
    TodoStore.addChangedHandler(this.updateBody);
  },

  render: function () {
    return (
      <form action="/api/todos" method="POST">
          <input type="text" value={this.state.title} id="title-field" />
          <input type="text" value={this.state.body} id="body-field" />
          <input type="submit" value="submit" />
      </form>
    );
  },

  updateTitle: function (event) {
    debugger
    this.setState({title: event.target.value});
  },

  updateBody: function (event) {
    this.setState({body: event.target.value});
  }
});

module.exports = TodoForm;
