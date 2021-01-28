import React from "react"
import "./style.css"
import { Donation } from "./Donation"
import { CreateForm } from "./CreateForm"

const uri = "http://145.24.222.64:8000/donations"

export class App extends React.Component {
  constructor() {
    super()
    this.state = {
      donations: { items: [] },
      creating: false
    }

    console.log("App created")
  }

  loadCollection() {

    fetch(uri, {
      method: 'GET', //*GET, POST, PUT, DELETE, etc.
      mode: 'cors', //no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only if cached
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => { console.log(data); this.setState({ donations: data }) })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    console.log("didMount")

    this.loadCollection();
  }

  componentDidUpdate() {
    console.log("didUpdate")
  }

  createDonation() {
    console.log("create donation")
    this.setState({ creating: !this.state.creating })

  }

  handleFormSubmitted() {
    this.setState({ creating: false })
  }


  render() {
    console.log("render")

    let donations = <CreateForm onFormSubmit={() => this.handleFormSubmitted()} onSave={() => this.loadCollection()}/>
    let createButton = "Back"

    if (!this.state.creating) {
      donations = this.state.donations.items.map((donation, i) =>
        <Donation key={i} donation={donation} onSave={() => this.loadCollection()} />)
      createButton = "Create new"
    }

    return (
      <div className="app">
        <h1>Collection of all donations</h1>
        <h4>Created by Bas Ekkelenkamp</h4>

        <button className="button-create" onClick={() => this.createDonation()}>{createButton}</button>
        <ul>{donations}</ul>
      </div>
    );
  }

}