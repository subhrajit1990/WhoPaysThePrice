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
        <h1 className="title mt-5 mb-4 title">Task Assignment App</h1>
        <div className="row mb-3 task-list">
          {TASKS.map((task, index) => (
            <div
              key={index}
              className="col-md-2 task-item"
              onClick={() => this.assignTaskToPerson(index)}
            >
              {task}
            </div>
          ))}
        </div>
        <div className="row mb-3 persons">
          <div className="col-md-4 person">
            <h3>Person1</h3>
            <p>{person1Task}</p>
          </div>
          <div className="col-md-4 person">
            <h3>Person2</h3>
            <p>{person2Task}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
