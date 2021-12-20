import { useParams } from 'react-router-dom'

function Profile() {
	// Use the useParams hook to get the username from the URL
	// username has to be applied as a named parameter in the route
	const { username } = useParams()
    console.log(username)

	return <h1>{username} Profile</h1>
}

export default Profile
