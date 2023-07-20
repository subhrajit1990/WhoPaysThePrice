import React, { Component } from 'react';
import './App.css';

const TASKS = ['Utencils cleaning', 'Cooking', 'Cloth wash' , 'Parcel receive', 'Massage', 'House Cleaning','Mopping']; // Preconfigured tasks

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person1Task: '',
      person2Task: '',
    };
  }

  assignTaskToPerson = (taskIndex) => {
    this.setState({ person1Task: '',person2Task: '',})
    const randomPerson = Math.floor(Math.random() * 2); 

    if (randomPerson === 0) {
      this.setState({ person1Task: TASKS[taskIndex] });
    } else {
      this.setState({ person2Task: TASKS[taskIndex] });
    }
  };

  render() {
    const { person1Task, person2Task } = this.state;

    return (
      <div className="container">
        <h1 className="title">Task Assignment App</h1>
        <div className="task-list">
          {TASKS.map((task, index) => (
            <div
              key={index}
              className="task-item"
              onClick={() => this.assignTaskToPerson(index)}
            >
              {task}
            </div>
          ))}
        </div>
        <div className="persons">
          <div className="person">
            <h3>Person1</h3>
            <p>{person1Task}</p>
          </div>
          <div className="person">
            <h3>Person2</h3>
            <p>{person2Task}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
