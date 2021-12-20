import Navbar from '../components/navbar/navbar'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/home/home'
import Contact from '../components/contact/contact'
import About from '../components/about/about'

import Profile from '../components/user/profile'

function Main() {
	return (
		<div>
			<HashRouter>
				<Navbar></Navbar>
				<div className='content'>
					<Routes>
						<Route exact="true" path='/' element={<Home></Home>} />
						<Route path='/contact' element={<Contact></Contact>} />
						<Route path='/about' element={<About></About>} />
                        <Route path='/profile/:username' element={<Profile></Profile>}></Route>
					</Routes>
				</div>
			</HashRouter>
		</div>
	)
}

export default Main