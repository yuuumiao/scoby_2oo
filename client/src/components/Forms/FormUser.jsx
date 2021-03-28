import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withUser } from "../Auth/withUser";


import apiHandler from "../../api/apiHandler";
import { AuthContext } from "../Auth/AuthProvider"
import "../../styles/form.css";


class FormUser extends Component {

    state = {

        user: null,
        // tmpUrl: "",
        httpResponse: null,
        isLoading: true,
    }


    static contextType = AuthContext;
    imageRef = React.createRef();


    handleSubmit = (event) => {
        event.preventDefault()
        const fd = new FormData()

        for (const key in this.state.user) {
            if (key === "profileImg") continue;
            fd.append(key, this.state.user[key])
        }

        if (this.imageRef.current.files[0]) {
            fd.append("profileImg", this.imageRef.current.files[0]);
        }
    }

    handleChange = (event) => {
        const key = event.target.name;
        const value =
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value;

        this.setState({
            user: { ...this.state.user, [key]: value }
        });
    }


    componentDidMount() {
        apiHandler
            .getUserInfo()
            .then((data) => {
                console.log("data", data)
                this.setState({ user: data, isLoading: false });
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    httpResponse: {
                        status: "failure",
                        message: "Something bad happened, please try again later",
                    },
                });
            });

    }


    render() {

        //if there is no loading the return div will happen faster than the didMounted
        //the state.user will return undefined

        const { httpResponse } = this.state;
        // console.log(this.state.httpResponse)
        //it always return null ?? => why ?
        if (this.state.isLoading) return <div>Loading...</div>;

        return (
            <div>

                <form
                    className="form"
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                >
                    <h2 className="title">Edit profile</h2>


                    {/* ref={this.imageRef} */}

                    <div className="form-group">
                        <label className="label" htmlFor="firstName">
                            First name
                        </label>
                        <input
                            className="input"
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={this.state.user.firstName}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="lastName">
                            Last Name
                    </label>
                        <input
                            className="input"
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={this.state.user.lastName}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="email">
                            Email
                       </label>
                        <input className="input" id="email" type="email"
                            name="email"
                            value={this.state.user.email}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="phoneNumber">
                            Phone number:
                       </label>
                        <input className="input" id="phoneNumber" type="phoneNumber"
                            name="phoneNumber"
                            value={this.state.user.phoneNumber}
                        />
                    </div>

                    <button className="btn-submit">SAVE</button>
                </form>



            </div>
        )
    }
}



export default withUser(FormUser);