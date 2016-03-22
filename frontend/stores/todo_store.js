var _todos = {};

var _callbacks = [];



var TodoStore = {

  changed: function () {
    _callbacks.forEach(function (handler) {
      handler();
    });
  },

  addChangedHandler: function (handler) {
    _callbacks.push(handler);
  },

  removeChangedHandler: function (handler) {
    for (var i = 0; i < _callbacks.length; i++) {
      if (_callbacks[i] === handler) {
        _callbacks.splice(i, 1);
        return;
      }
    }
  },

  all: function () {
    return _todos;
  },

  fetch: function () {
    $.ajax({
      type: 'GET',
      url: '/api/todos',
      dataType: "json",
      success: function (todos) {
        todos.forEach( function (todo) {
          _todos[todo.id] = todo;
        });
        TodoStore.changed();
      },
      error: function () {
        console.log("TodoStore#fetch error");
      },
    });
  },

  create: function (todo) {
    $.ajax({
      type: 'POST',
      url: '/api/todos',
      data: todo,
      dataType: "json",
      success: function (todo) {
        _todos[todo.id] = {todo: todo};
        TodoStore.changed();
      },
      error: function () {
        console.log("TodoStore#create error");
      }
    });
  },

  destroy: function (id) {
    $.ajax({
      type: 'DELETE',
      url: '/api/todos/' + id,
      dataType: "json",
      success: function () {
        for (var i = 0; i < _todos.length; i++) {
          if (_todos[i].id === id) {
            _todos.splice(i, 1);
            return;
          }
        }
        TodoStore.changed();
      },
      error: function () {
        console.log("TodoStore#destroy error");
      }
    });
  },

  toggleDone: function (id) {
    // debugger
    var todo = _todos[id];
    todo.done = !todo.done;
    $.ajax({

      type: 'PATCH',
      url: '/api/todos/' + id,
      data: {todo: todo},
      dataType: "json",
      success: function (todo) {
        _todos[id] = todo;
        TodoStore.changed();
      },
      error: function () {
        console.log("TodoStore#toggleDone error");
      }
    });
  }
};


module.exports = TodoStore;
