import React from 'react'
import ReactDOM from 'react-dom'
import Register from '../../pages/Register'
import Enzyme, {mount, shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()});

describe('component rendering', () => {
    // TEST WRITTEN IN JEST
    it('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<Register/>, div)
        ReactDOM.unmountComponentAtNode(div)
    })

    it('renders a form', () => {
        let mountedRegister = shallow(<Register/>)
        const form = mountedRegister.find('form')
        expect(form.length).toEqual(1)
        expect(form.props().onSubmit).toBeDefined()
    })

    it('renders four inputs', () => {
        let mountedRegister = shallow(<Register/>)
        const form = mountedRegister.find('form')
        const inputs = form.find('input')
        expect(inputs.length).toBe(4)
        expect(inputs.at(0).props().name).toBe('email')
        expect(inputs.at(1).props().name).toBe('password')
        expect(inputs.at(2).props().name).toBe('password_confirmation')
        expect(inputs.at(3).props().type).toBe('submit')
    })
})
