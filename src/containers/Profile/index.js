import React, { useEffect } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

const Profile = () => {

		return (
			<div>
				<ButtonGroup fullWidth color="primary" size="large">
                    <Button>Lists</Button>
                    <Button>Challenges</Button>
                    <Button>Categories</Button>
                </ButtonGroup>
			</div>
		);
	}

export default Profile;
