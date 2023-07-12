import React, { Component } from 'react';
import './App.css';
import CommonValidationEngine from './CommonValidationEngine';
class Flip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task1: '',
      task2: '',
      cards: [
        { id: 1, task: '', isFlipped: false },
        { id: 2, task: '', isFlipped: false }
      ],
      selectedCardIds: []
    };
  }

  handleTaskChange = (e, taskId) => {
    const { value } = e.target;
    if (taskId === 1) {
      this.setState({ task1: value });
    } else if (taskId === 2) {
      this.setState({ task2: value });
    }
  };

  assignTasks = () => {
    let form = document.getElementById("input-section").getElementsByTagName("input"),
    form_validator_check = {
      text1: {
        verify: ["nullCheck"],
        message: ["Please enter the text"]
      },
      text2: {
        verify: ["nullCheck"],
        message: ["Please enter the text"]
      }
    };
  let validationOps = new CommonValidationEngine(form, form_validator_check);
  if (validationOps.commonValidationFields()) {
    
    console.log("Final results :: " );

    const { task1, task2 } = this.state;
    const taskArray = [task1, task2];
    const cards = this.state.cards.map((card) => ({
      ...card,
      task: taskArray.splice(Math.floor(Math.random() * taskArray.length), 1)[0]
    }));
    this.setState({ cards, selectedCardIds: [],task1:'',task2:'' });


  }
  };

  handleCardClick = (cardId) => {
    const { cards, selectedCardIds } = this.state;
    const cardIndex = cards.findIndex((card) => card.id === cardId);
    const selectedCardIdsCopy = [...selectedCardIds];

    if (!selectedCardIdsCopy.includes(cardId)) {
      selectedCardIdsCopy.push(cardId);
    }

    const flippedCards = cards.map((card, index) => {
      if (index === cardIndex) {
        return {
          ...card,
          isFlipped: true
        };
      }
      return card;
    });

    this.setState({ cards: flippedCards, selectedCardIds: selectedCardIdsCopy }, () => {
      if (selectedCardIdsCopy.length === 2) {
        setTimeout(this.checkForMatch, 1000);
      }
    });
  };

  checkForMatch = () => {
    const { cards, selectedCardIds } = this.state;

    if (selectedCardIds.length === 2) {
      const [card1, card2] = selectedCardIds.map((id) => cards.find((card) => card.id === id));

      if (card1.task === card2.task) {
        const updatedCards = cards.map((card) =>
          selectedCardIds.includes(card.id) ? { ...card, isFlipped: false } : card
        );
        this.setState({ cards: updatedCards, selectedCardIds: [] });
      } else {
        setTimeout(this.resetCards, 1000);
      }
    }
  };

  resetCards = () => {
    const { cards, selectedCardIds } = this.state;

    const updatedCards = cards.map((card) =>
      selectedCardIds.includes(card.id) ? { ...card, isFlipped: false } : card
    );
    this.setState({ cards: updatedCards, selectedCardIds: [] });
  };

  render() {
    const { task1, task2, cards } = this.state;

    return (
      <div className="container">
      <h1 className="title mt-5 mb-4">Task Guessing Game</h1>
      <div className="row mb-3" id="input-section">
        <div className="col-md-4">
          <input
            type="text"
            id="text1"
            name="text1"
            className="form-control"
            placeholder="Task 1"
            value={task1}
            onChange={(e) => this.handleTaskChange(e, 1)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            id="text2"
            name="text2"
            className="form-control"
            placeholder="Task 2"
            value={task2}
            onChange={(e) => this.handleTaskChange(e, 2)}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary" onClick={this.assignTasks}>
            Assign Tasks
          </button>
        </div>
      </div>
      <div className="row">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`col-md-6 col-lg-3 card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => this.handleCardClick(card.id)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.task}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  }
}

export default Flip;
