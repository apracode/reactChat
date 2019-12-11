import React from "react";
import Message from "./Message";
import firebase from "firebase";

class FormMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      message: "",
      list: []
    };

    this.messageRef = firebase
      .database()
      .ref()
      .child("messages");
    this.listenMessages();
  }

  componentDidMount() {
    this.messageRef.on("value", message => {
      this.setState({ list: Object.values(message.val()) });
    });
  }

  handleChange(event) {
    this.setState({ message: event.target.value });
    event.preventDefault();
  }

  handleSend(e) {
    if (this.state.message) {
      var newItem = {
        userName: this.props.user,
        message: this.state.message
      };
      this.messageRef.push(newItem);

      this.setState({ message: "" });
      var objDiv = document.getElementById("scrollDiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    }

    e.preventDefault();
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend(event);
  }

  listenMessages() {
    this.messageRef.on("value", message => {
      this.setState({ list: Object.values(message.val()) });
    });
  }

  render() {
    console.log("Form username", this.state.list);

    return (
      <form action="" className="messagesForm">
        <div className="messageArea" id="scrollDiv">
          {this.state.list.map((item, id) => {
            
            if (item.userName === this.props.user) {
                
              return (
                <Message key={id} message={item} class="message rightMessage" />
              );
            } else {
              return (
                <Message key={id} message={item} class="message leftMessage" />
              );
            }
          })}
        </div>
        <div className="messageSend">
          <input
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange.bind(this)}
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <button onClick={this.handleSend.bind(this)}>Send</button>
        </div>
      </form>
    );
  }
}

export default FormMessage;
