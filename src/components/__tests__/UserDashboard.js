import React from 'react'
import ReactDOM from 'react-dom'
import UserDashboard from '../UserDashboard'
import Enzyme, { mount,shallow,render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import AuthService from '../../services/AuthService.js'
import { createMemoryHistory } from 'history'

// let auth = new AuthService()
let history
const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) + 3000 }, 'shhhhh');
localStorage.setItem('id_token', token);

beforeAll(() => {
  history = createMemoryHistory({initialEntries: ['/dashboard']})
})

// Enzyme allows to test simulated events able to run with latest React
Enzyme.configure({ adapter: new Adapter() });
describe('page rendering', ()=>{
  // TEST WRITTEN IN JEST
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<UserDashboard history={history}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders edit buttons', () => {
    let mountedDashboard = shallow(<UserDashboard history={history}/>)
    const button = mountedDashboard.find('button.edit-button')
    expect(button.length).toBe(6)
  })

  // it('renders the form',()=>{
  //   expect(.find('form.loginForm').exists()).toBe(true)
  // })
  // it('renders an email input', ()=>{
  //   expect(shallow(<UserDashboard/>).find('input#email').exists()).toBe(true)
  // })
  // it('renders an password input', ()=>{
  //   expect(shallow(<UserDashboard/>).find('input#password').exists()).toBe(true)
  // })
  // it('renders a submit button',()=>{
  //   expect(shallow(<UserDashboard/>).find('input#submit').exists()).toBe(true)
  // })
})

describe('login input',()=>{
  it('should respond to a change to the email field',()=>{
    const wrapper = mount(<UserDashboard/>)
    // expect(wrapper.state().user).toEqual({email: "e@me.com", password: ""})
    expect(wrapper.state().user.email).toEqual("e@me.com")
    wrapper.find('#email').simulate('change', {target: {name: 'email', value:'test@mail.com'}})
    expect(wrapper.state().user.email).toEqual("test@mail.com")
  })
  it('should respond to a change to the password field',()=>{
    const wrapper = mount(<UserDashboard/>)
    // expect(wrapper.state().user).toEqual({email: "e@me.com", password: ""})
    expect(wrapper.state().user.password).toEqual("")
    wrapper.find('#password').simulate('change', {target: {name: 'password', value:'password'}})
    expect(wrapper.state().user.password).toEqual("password")
  })
})
