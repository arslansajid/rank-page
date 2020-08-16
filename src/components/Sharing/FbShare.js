import React from "react";

class FBShareButton extends React.Component{
    constructor(props){
      super(props);
      this.state = {
       url : this.props.url
      }
    }
  
    render(){
      let encodedURL = encodeURI(this.state.url);
      return(
        <a target="_blank" href={`https://facebook.com/sharer/sharer.php?u=${encodedURL}`}>
          <img src={require("../../assets/icons/socialMedia/facebook1.svg")} />
        </a>
      )
    }
  }

  export default FBShareButton;