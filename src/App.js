import React from 'react';
import axios from 'axios';
import ShowReminders from './reminders.js';
import AddReminders from './addReminders.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [],
      password: ''
    }
    this.setReminder = this.setReminder.bind(this);
    this.deleteReminder = this.deleteReminder.bind(this);
  }

  componentDidMount() {
    axios
      .get('/api/reminders')
      .then(response => {
        console.log('get promise fulfilled')
        console.log('response data: ', response.data)
        this.setState({ reminders: response.data })
      })
  }

  setReminder(reminders) {
    this.setState(
      {reminders: reminders}
    )
  }

  deleteReminder(id) {
    console.log('deleteReminder from status...', {id})
    const remainReminders = this.state.reminders.filter(i => i.id != id)
    this.setState({reminders: remainReminders})
  }

  render() {
    return (
      <div>
        <h2>Lisää muistutus</h2>
        <AddReminders
          reminders={this.state.reminders} 
          setReminder={this.setReminder}/>
        <ShowReminders
          reminders={this.state.reminders}
          deleteReminder={this.deleteReminder}
          setReminder={this.setReminder}/>
      </div>
    
    )
  }
}

export default App
