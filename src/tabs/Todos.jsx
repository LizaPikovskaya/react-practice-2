import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [{ id: 1, text: 'baby' }],
  };

  componentDidMount() {
    const data = localStorage.getItem('todo')
    if(data !== null) {
      this.setState({todos: JSON.parse(data)})
    }
  }
  componentDidUpdate(_, prevState) {
    const {todos} = this.state
    if(prevState.todos !== todos) {
      localStorage.setItem('todo', JSON.stringify(todos))
    }
  }
  addToDo = text => {
    const todo = {
      text,
      id: nanoid(),
    };
    console.log(text);
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  deleteToDo = (id) => {
this.setState((prevState)=> ({
  todos: prevState.todos.filter((item) => item.id !== id)
}))
  }
  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.addToDo} />
        <Grid>
          {todos.map(({ text, id }, idx) => {
            return (
              <GridItem key={id}>
                <Todo text={text} count={idx + 1} onDelete={this.deleteToDo} id={id}/>
              </GridItem>
            );
          })}
        </Grid>
      </>
    );
  }
}
