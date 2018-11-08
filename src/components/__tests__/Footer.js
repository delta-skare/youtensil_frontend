import React from 'react'
import ReactDOM from 'react-dom'
import Footer from '../Footer'
import Enzyme, {mount, shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()});

describe('component rendering', () => {
    // TEST WRITTEN IN JEST
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Footer/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('properly renders 3 links', () => {
        const mountedFooter = shallow(<Footer/>)
        const links = mountedFooter.find('a')
        expect(links.length).toEqual(3)

        expect(links.at(0).text()).toBe("Home")
        expect(links.at(0).props().href).toBe("/home")

        expect(links.at(1).text()).toBe("Team")
        expect(links.at(1).props().href).toBe("/team")

        expect(links.at(2).text()).toBe("Support")
        expect(links.at(2).props().href).toBe("mailto:hello.youtensil@gmail.com")
    })
})
