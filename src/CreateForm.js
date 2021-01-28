import React from "react"

export class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    console.log("Constructor CreateForm")

    let _isMounted = false

    this.state = {
      name: "",
      message: "",
      amount: "1 euro",
      formMethod: "POST",
      uri: "http://145.24.222.64:8000/donations"
    }

    if (this.props.name != undefined) {
      console.log("edit donation test")
      this.state = {
        name: this.props.name,
        message: this.props.message,
        amount: this.props.amount,
        formMethod: "PUT",
        uri: this.props.self
      }
    }

  }

  saveDonation(uri) {

    fetch(uri, {
      method: this.state.formMethod, //*GET, POST, PUT, DELETE, etc.
      mode: 'cors', //no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only if cached
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        message: this.state.message,
        amount: this.state.amount
      })
    })
      .then((response) => response.json())
      .then((data) => { console.log(data); if(this._isMounted){ this.setState({ donation: data })} this.props.onSave()})
      .catch((error) => console.log(error))
  }


  componentDidMount() {
    console.log("didMount Form")
    this._isMounted = true
  }

  componentDidUpdate() {
    console.log("didUpdate Form")
  }

  componentWillUnmount() {
    console.log("willUnmount Form")
    this._isMounted = false
  }


  handleOnChange(event) {
    const target = event.target
    const name = target.name
    this.setState({ [name]: event.target.value })
  }

  handleOnSubmit(event) {
    // alert("Submit!")
    this.props.onFormSubmit()
    event.preventDefault()
    this.saveDonation(this.state.uri)
  
  }


  render() {
    console.log("render")

    return (
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <label>
          Name:
        <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleOnChange(event)} />
        </label>

        <br></br>
        <label>
          message:
        <input type="text" name="message" value={this.state.message} onChange={(event) => this.handleOnChange(event)} />
        </label>

        <br></br>
        <label>
          amount:
        <input type="text" name="amount" value={this.state.amount} onChange={(event) => this.handleOnChange(event)} />
        </label>


        <input type="submit" value="Submit" />
      </form>
    );
  }

}