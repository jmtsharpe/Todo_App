json.array! @todos do |todo|
  # jbuilder makes cool json objects
  # All methods are bang methods so they're distinguishable from keys
  # json.cool_thing "a/A"
  json.partial! "api/todos/todo", todo: todo
end
