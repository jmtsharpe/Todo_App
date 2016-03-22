class Api::TodosController < ApplicationController

  def index
    @todos = Todo.all

    render :index
  end


  def show
    @todo = Todo.find(params[:id])

    render :show
  end


  def create
    @todo = Todo.create!(todo_params)

    render :show
  end


  def destroy
    Todo.find(params[:id]).destroy!

    render :index
  end


  def update
    @todo = Todo.find(params[:id])
    @todo.update!(todo_params)

    render :show
  end

  private

  def todo_params
    params # {title: "the title", body: "the body", done: boolean}
    # {todo: {title: the title, body: "the body", done: boolean}}
    params.require(:todo).permit(:title, :body, :done)
  end

end
