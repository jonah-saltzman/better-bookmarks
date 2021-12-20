import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

//TODO: DONE add firebase configuration and export it
export const firebaseConfig = {
	apiKey: 'AIzaSyBFLDGnGDUG5cGhKpufonFq5yt7v-uMGnQ',
	authDomain: 'react-15fc6.firebaseapp.com',
	databaseURL: 'https://react-15fc6-default-rtdb.firebaseio.com',
	projectId: 'react-15fc6',
	storageBucket: 'react-15fc6.appspot.com',
	messagingSenderId: '553249822105',
	appId: '1:553249822105:web:9619ffc43c0d80ab752f08',
	measurementId: 'G-286XK1DCMX',
}

//image configuration
export const imageConfig = {
	quality: 0.2,
	maxWidth: 800,
	maxHeight: 600,
	autoRotate: true,
}
