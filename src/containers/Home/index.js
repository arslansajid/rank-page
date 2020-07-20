import React from 'react';
import './style.scss';

class Home extends React.Component {
  handleSubmit = (model) => {
    console.log(model)
    
  }
	render() {
		return (
			<div>
				Home
			</div>
		);
	}
}

export default Home;

// export default reduxForm({
//   form: 'Bookingform'
// })(Form)