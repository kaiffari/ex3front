import React from 'react';
import axios from 'axios';

class ShowReminders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: true
    }
};

  removeReminder = (e) => {
     
    /* prevent normal submit rendering and get from network */
    e.preventDefault()

    if (window.confirm('Haluatko todella poistaa?')) {
        /* delete from database */
        axios
        .delete('https://thawing-bayou-48463.herokuapp.com/api/reminders/' + e.target.id) /*https://thawing-bayou-48463.herokuapp.com*/
        .then(response => {
          /* clear also parent state and update rendering after succesful database deletion */
          this.props.deleteReminder(e.target.id);
          console.log('deleted: ', e.target.id)
        })
        .catch(error => {
          console.log('delete error: ', error.message)
        })
    }
  }

  updateReminder = (e) => {
     
    console.log('toggle importance: ', e.target.id)

    /* prevent normal submit rendering and get from network */
    e.preventDefault()

    /* toggle */
    const reminder = this.props.reminders.find(r => r.id === e.target.id)
    const updatedReminder = { ...reminder, important: !reminder.important }
    console.log('new: ', updatedReminder)
    /* write to database */
    axios
    .put('https://thawing-bayou-48463.herokuapp.com/api/reminders/' + e.target.id, updatedReminder)
    .then(response => {
      /* set also parent state and update rendering after succesful database deletion */
      const newReminders = this.props.reminders.map(r => (r.id === e.target.id ? updatedReminder : r))
      this.props.setReminder(newReminders)
      console.log('updated: ', e.target.id)
    })
    .catch(error => {
      console.log('update error: ', error.message)
    })
  }

  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }

  render () {
    console.log('render')

    const remindersToShow =
    this.state.showAll ?
      this.props.reminders :
      this.props.reminders.filter(r => r.important === true)
    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
    
    if (this.props.reminders.length > 0) {
    return (
        <div>  
          <h2>Reminders</h2>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
          <table><tbody>
           {remindersToShow.map(
              reminder =>
              <tr key={reminder.id}> 
                <td>{reminder.timestamp.toLocaleString()}</td>
                <td>{reminder.name}</td>
                <td><button id={reminder.id} onClick={this.removeReminder}>Poista</button></td>
                <td><button id={reminder.id} onClick={this.updateReminder}>{reminder.important ? 'tärkeä!' : 'vähemmän tärkeä'} (vaihda)</button></td>
              </tr>
              )
            }
          </tbody></table>
        </div>
      )
    } else {
      return (<div><h2>Reminders</h2></div>)
    }
  }
}

export default ShowReminders

/*                <td><button onClick={toggleImportance}>{label}</button></td>*/
