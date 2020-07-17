import React, { useEffect } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import ProfileCover from "../../components/Profile/Cover";
import PostCard from "../../components/PostCard";

const Profile = () => {

		return (
			<div>
                <ProfileCover />
				<ButtonGroup fullWidth size="large">
                    <Button>Lists</Button>
                    <Button>Challenges</Button>
                    <Button>Categories</Button>
                </ButtonGroup>
                <PostCard />
                <PostCard />
			</div>
		);
	}

export default Profile;
