import React from 'react'
import ReactDOM from 'react-dom'
import Landing from '../Landing'
import Enzyme, { mount,shallow,render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('component rendering', ()=>{
  // TEST WRITTEN IN JEST
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Landing />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders the logo', () => {
    let mountedLanding = shallow(<Landing />)
    const image = mountedLanding.find('img')
    expect(image.length).toEqual(1)
    expect(image.props().src).toBe('youtensil_tagline_blk.png')
    expect(image.props().alt).toBe('Youtensil Logo')
  })

  it('renders login and register buttons', () => {
    let mountedLanding = shallow(<Landing />)
    const button = mountedLanding.find('Button')
    expect(button.length).toEqual(2)
    expect(button.at(0).props().children).toEqual(<a href="/login">Login</a>)
    expect(button.at(1).props().children).toEqual(<a href="/register">Register</a>)
  })
})
