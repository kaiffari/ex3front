import React from 'react';
import axios from 'axios';
import ShowReminders from './reminders.js';
import AddReminders from './addReminders.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [
        /*{
          name: 'Buy some eggs',
          timestamp: "2018-11-10T13:00:00.141Z"
        }*/
      ]
    }
    this.setReminder = this.setReminder.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://thawing-bayou-48463.herokuapp.com/api/reminders')  /* http://localhost:3001 */
      .then(response => {
        console.log('get promise fulfilled')
        this.setState({ reminders: response.data })
      })
  }

  setReminder(reminders) {
    this.setState(
      {reminders: reminders}
    )
  }

  deleteReminder(id) {
    /*console.log('deleteReminder...', {id})*/
    const remainReminders = this.state.reminders.filter(i => i.id != id)
    this.setState({reminders: remainReminders})
  }

  render() {
    return (
      <div>
        <h2>Add Reminder</h2>
        <AddReminders
          reminders={this.state.reminders} 
          setReminder={this.setReminder}/>
        <ShowReminders
          reminders={this.state.reminders}
          deleteReminder={this.deleteReminder}/>
      </div>
    
    )
  }
}

export default App
