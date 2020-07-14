import React from 'react';
import './style.scss';
import Form from './Form'


class Home extends React.Component {
  handleSubmit = (model) => {
    console.log(model)
    
  }
	render() {
		return (
			<div>
				{/* <Form onSubmit={this.handleSubmit}/> */}
				Home
			</div>
		);
	}
}

export default Home;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)