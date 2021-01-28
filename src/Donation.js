import React from "react"
import { CreateForm } from "./CreateForm"


export class Donation extends React.Component {
    constructor() {
        super()
        console.log("Constructor Donation")

        this.state = {
            deleted: false,
            showDetails: false,
            showForm: false,
        }
    }


    componentDidMount() {
        console.log("didMount Donation")
    }

    componentDidUpdate() {
        console.log("didUpdate Donation")
    }

    componentWillUnmount() {
        console.log("willUnmount Donation")
    }


    deleteDonation(uri) {
        console.log('delete ' + uri)

        fetch(uri, {
            method: 'DELETE', //*GET, POST, PUT, DELETE, etc.
            mode: 'cors', //no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only if cached
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((response) => this.setState({ deleted: true }))
            .catch((error) => console.log(error))

    }


    render() {
        console.log("render")

        let donationItem = ""
        let details = ""
        let form = ""

        if (this.state.showDetails) {
            details =
                <div>
                    <p>{this.props.donation.amount} <br></br>
                        {this.props.donation.message}</p>
                </div>
        }

        if (this.state.showForm) {
            form = <><CreateForm onSave={() => this.props.onSave()} name={this.props.donation.name} message={this.props.donation.message} amount={this.props.donation.amount} self={this.props.donation._links.self.href} onFormSubmit={() => this.setState({ showForm: false })} /> <br></br></>
        }

        if (!this.state.deleted) {
            donationItem = <li className="donation"><h2>{this.props.donation.name}</h2><br></br>


                <div>{details}</div>
                <div>{form}</div>

                <button onClick={() => this.setState({ showDetails: !this.state.showDetails })}>Show</button>
                <button onClick={() => this.setState({ showForm: !this.state.showForm })}>EDIT</button>
                <button onClick={() => this.deleteDonation(this.props.donation._links.self.href)}>DELETE</button>
            </li>
        }



        return (
            <div>
                {donationItem}
            </div>
        );
    }

}