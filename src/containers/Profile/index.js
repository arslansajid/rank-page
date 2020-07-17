import React, { useEffect } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import ProfileCover from "../../components/Profile/Cover";

const Profile = () => {

		return (
			<div>
                <ProfileCover />
				<ButtonGroup fullWidth size="large">
                    <Button>Lists</Button>
                    <Button>Challenges</Button>
                    <Button>Categories</Button>
                </ButtonGroup>
			</div>
		);
	}

export default Profile;
