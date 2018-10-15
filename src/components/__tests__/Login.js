import React from 'react'
import ReactDOM from 'react-dom'
import Login from '../Login'
import Enzyme, { mount,shallow,render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('component rendering', ()=>{
  // TEST WRITTEN IN JEST
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Login />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders a form', () => {
    let mountedLogin = shallow(<Login />)
    const form = mountedLogin.find('form')
    expect(form.length).toEqual(1)
    expect(form.props().onSubmit).toBeDefined()
  })

  it('renders three inputs', () => {
    let mountedLogin = shallow(<Login />)
    const form = mountedLogin.find('form')
    const inputs = form.find('input')
    expect(inputs.length).toBe(3)
    expect(inputs.at(0).props().name).toBe('email')
    expect(inputs.at(1).props().name).toBe('password')
    expect(inputs.at(2).props().type).toBe('submit')
  })
})
