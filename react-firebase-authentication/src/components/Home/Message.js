import React from "react";

class Message extends React.Component {
    componentDidMount(){
    var objDiv = document.getElementById("scrollDiv");

    objDiv.scrollTop = objDiv.scrollHeight;

    }
  render() {
    var objDiv = document.getElementById("scrollDiv");
    objDiv.scrollTop = objDiv.scrollHeight;
    return (
          <div className={this.props.class}>
              <p>{this.props.message.userName}:</p>

            <span>{this.props.message.message}</span>
          </div>
    );
  }
}

export default Message;
