import React from 'react';
import axios from 'axios';

class AddReminders extends React.Component {
    constructor(props) {  /* voiko constructorin jättää pois, kokeile */
      super(props);
      this.state = {
        newReminder: '',
        newTime: new Date()  //.toLocaleString()
      }
    }

  addReminder = (event) => {
  
    /* prevent normal submit rendering and get from network */
    event.preventDefault()

    /* prevent duplicates */
    var pos = this.props.reminders.findIndex(o => o.name === this.state.newReminder)
    if (pos == -1) {

      /* construct new object */
      var time  = this.state.newTime.toISOString()
      const reminderObject = {
        name: this.state.newReminder,
        timestamp: time,
        important: Math.random() > 0.7
      }

      /* write to database */
      axios
        .post('/api/reminders', reminderObject)
        .then(response => {
          /* concatenate new list and set to App state */
          reminderObject.id = response.data /* post returns only new database id */
          const reminders = this.props.reminders.concat(reminderObject)
          this.props.setReminder(reminders)
          /* clear input field */
          this.setState({newReminder : ''})
          console.log('post promise fulfilled for: ', reminderObject.name, 'id: ', response.data)
          //console.log('obj: ', reminderObject)
      })
        .catch(error => {
          console.log(error.message)
          window.alert('Ei voitu lisätä!')
        })

    } else {
      alert('A duplicate reminder exists already!')
    }
  }

  handleReminderChange = (event) => {
    //console.log('new value: ', {newReminder: event.target.value})
    this.setState({ newReminder: event.target.value })
  }

  handleTimeChange = (event) => {
    this.setState({ newTime: event.target.value })
  }
  
  render () {

    return (
      <div>
        <form onSubmit={this.addReminder}>
            <div>
              Aihe: <input
                value={this.state.newReminder}
                onChange={this.handleReminderChange}
              />
            </div>
            <div>
              Aika: <input
                value={this.state.newTime}
                onChange={this.handleTimeChange}
              />
            </div>
            <div>
              <button type="submit">Lisää</button>
            </div>
        </form>
      </div>
    )
  }
}

export default AddReminders

/*      date: ,*/
