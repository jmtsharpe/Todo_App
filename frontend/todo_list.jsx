var React = require("react");
var TodoStore = require("./stores/todo_store.js");

var TodoList = React.createClass({
  getInitialState: function () {
    return { list: TodoStore.all() };
  },

  render: function () {

    var listItems;

    if (Object.keys(this.state.list).length === 0) {
      listItems = <p>Loading list items...</p>;
    } else {
      listItems = Object.keys(this.state.list).map(function (key) {
        var item = this.state.list[key];
        return <TodoListItem title={item.title} body={item.body}/>;
      }.bind(this));
    }

    return (
      <div>
        {listItems}
      </div>
    );
  },

  todosChanged: function () {
    this.setState({ list: TodoStore.all() });
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
  }
});

var TodoListItem = React.createClass({

  render: function () {
    return (
      <div>
        <div>
          {this.props.title}
        </div>
        <div>
          {this.props.body}
        </div>
      </div>
    );
  }


});

module.exports = TodoList;
