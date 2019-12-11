import React from "react";

import FormMessage from "./FormMessage";
import { withAuthorization } from "../Session";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}, 
      users:[]
    };
  }

  componentDidMount() {
    
     this.props.firebase.auth.onAuthStateChanged(
      user => {
        user
          ? this.setState({ user })
          : this.setState({ user: null });
      },
    );

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList
      });
    });

  }

  render() {
    console.log("User", this.state.users);
    var name=""
    this.state.users.map(user => {
      if(user.email == this.state.user.email){
        name = user.username;
      }});
    console.log("Name", name);
    return (
      // {users.map(user => (
      //   if(user.email == this.state.user.email){

      //   }
      // ))}
      <div>
        <FormMessage user={name} />
      </div>
    );
  }
}

const condition = user => !!user;

export default withAuthorization(condition)(HomePage);
