import React from 'react'
import ReactDOM from 'react-dom'
import NavBar from '../NavBar'
import Enzyme, {mount, shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()});

describe('component rendering', () => {
    // TEST WRITTEN IN JEST
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<NavBar/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders a Navbar', () => {
        let mountedNavBar = shallow(<NavBar/>)
        const navbar = mountedNavBar.find('Navbar')
        expect(navbar.length).toEqual(1)
    })

    it('renders two NavItems with NavLinks', () => {
        let mountedNavBar = shallow(<NavBar/>)
        const navbar = mountedNavBar.find('Navbar')
        const navItem = navbar.find('NavItem')
        const navItemContent1 = navItem.at(0).find('NavLink')
        const navItemContent2 = navItem.at(1).find('NavLink')
        expect(navItem.length).toBe(2)
        expect(navItemContent1.props().href).toBe('/login')
        expect(navItemContent2.props().href).toBe('/register')
    })

    it('renders an UncontrolledDropdown with DropdownItems', () => {
        let mountedNavBar = shallow(<NavBar/>)
        const ud = mountedNavBar.find('UncontrolledDropdown')
        const di = ud.find('DropdownItem')
        const diContent1 = di.at(0).find('NavLink')
        const diContent2 = di.at(1).find('NavLink')
        const diContent3 = di.at(3).find('NavLink')
        const diContent4 = di.at(4).find('NavLink')
        expect(ud.length).toBe(1)
        expect(di.length).toBe(5)
        expect(diContent1.props().href).toBe('/profiles')
        expect(diContent2.props().href).toBe('/tips')
        expect(diContent3.props().href).toBe('/dashboard')
        expect(diContent4.props().href).toBe('/addtip')
    })


})
