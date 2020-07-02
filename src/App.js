import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts : [
        {
          Name: 'Joe Z',
          Phone_Number: 123456789,
        },
        {
          Name: 'Zoe C',
          Phone_Number: 987654321,
        }
      ],
      owner : 'Peng',
    }
    this.onContactCreate = this.onContactCreate.bind(this)
  }
  
  onContactCreate(props){
    const updated_list = this.state.contacts
    updated_list.push(props)
    this.setState({
      contacts : updated_list
    })
  }

  render() {
    return (
    <div className="App">
      < Header name={this.state.owner} />
      <main>
        < ContactList contacts={this.state.contacts} onContactCreate={this.onContactCreate} />
      </main>
      < Footer text="Thank you for using this App." />
    </div>
    )}
}



function ContactList(props){
  return (
    <>
    <h2>Contact List</h2>
    < ContactForm onContactCreate={props.onContactCreate} />
    <ul>
      {props.contacts.map(contact => <Contact item={contact} key={contact.Name} />)}
    </ul>
    
    </>
  )
}

function Contact(props){
  return (
  <li className='contact_card'> 
    <p>Name: {props.item.Name}</p>
    <p>Phone Number: {props.item.Phone_Number}</p>
  </li>
)}

class ContactForm extends React.Component{
  constructor(props){
    super (props)
    this.state = {
      Name : '',
      Phone_Number : '',
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event){
    const new_name = event.target.value;
    this.setState({
      ...this.state,
      Name : new_name
    });
  }

  handleNumChange(event){
    const new_num = event.target.value;
    this.setState({
      ...this.state,
      Phone_Number : new_num
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onContactCreate(this.state)
  }


  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder='Add new contact' value={this.state.Name} onChange={this.handleNameChange}>
          </input>
        </label>
        <label>
          <input type="text" placeholder='Add phone number' value={this.state.Phone_Number} onChange={this.handleNumChange} ></input>
        </label>
        <button type="submit">Add</button>
      </form>
    )
  }
}


function Header(props){
  return <h1>Welcome to {props.name}'s Contact Manager App</h1>
}

function Footer(props){
  return (
  <footer>
    <p>{props.text}</p>
    <p>pengchen.work &trade;</p>

  </footer>
)}

export default App;
