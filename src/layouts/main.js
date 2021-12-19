import Navbar from '../components/navbar/navbar'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'
import Home from '../components/home/home'
import Contact from '../components/contact/contact'
import About from '../components/about/about'

import Test from '../components/test/test'

function Main() {
	return (
		<div>
			<HashRouter>
				<Navbar></Navbar>
				<div className='content'>
					<Routes>
						<Route exac="true" path='/' element={Home()} />
						<Route path='/contact' element={Contact()} />
						<Route path='/about' element={About()} />
                        <Route path='/test' element={Test()}></Route>
					</Routes>
				</div>
			</HashRouter>
		</div>
	)
}

export default Main