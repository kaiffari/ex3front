import React from 'react';
import axios from 'axios';

class AddReminders extends React.Component {
    constructor(props) {  /* voiko constructorin jättää pois, kokeile */
      super(props);
      this.state = {
        newReminder: '',
        newTime: new Date().toLocaleString()
      }
    }

  addReminder = (event) => {
  
    /* prevent normal submit rendering and get from network */
    event.preventDefault()

    /* prevent duplicates */
    var pos = this.props.reminders.findIndex(o => o.name === this.state.newReminder)
    if (pos == -1) {

      /* construct new object */
      var maxid = 0
      this.props.reminders.map(o => {if (o.id > maxid) maxid = o.id})
      maxid = maxid + 1
      const reminderObject = {
        name: this.state.newReminder,
        timestamp: this.state.newTime,
        id: maxid
      }
    
      /* concatenate new list and set to App state */
      const reminders = this.props.reminders.concat(reminderObject)
      this.props.setReminder(reminders)

      /* write to json file */
      axios
        .post('/api/reminders', reminderObject) /* https://thawing-bayou-48463.herokuapp.com */
        .then(response => {
          console.log('post promise fulfilled for id: ', maxid)
        })

        /* clear input field */
      this.state.newReminder = ''

    } else {
      alert('A duplicate reminder exists already!')
    }
  }

  handleReminderChange = (event) => {
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
