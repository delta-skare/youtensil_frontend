import React from 'react'
import ReactDOM from 'react-dom'
import Landing from '../Landing'
import Enzyme, { mount,shallow,render } from 'enzyme'
import { Router, MemoryRouter } from 'react-router-dom'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('component rendering', ()=>{
  // TEST WRITTEN IN JEST
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MemoryRouter><Landing /></MemoryRouter>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders the logo', () => {
    let mountedLanding = mount(<MemoryRouter><Landing /></MemoryRouter>)
    const image = mountedLanding.find('img')
    expect(image.length).toEqual(1)
    expect(image.props().src).toBe('youtensil_tagline_blk.png')
    expect(image.props().alt).toBe('Youtensil Logo')
  })

  it('renders login and register buttons', () => {
    let mountedLanding = mount(<MemoryRouter><Landing /></MemoryRouter>)
    const button = mountedLanding.find('Button')
    expect(button.length).toEqual(2)
    expect(button.at(0).props().children).toEqual("Login")
    expect(button.at(1).props().children).toEqual("Register")
  })
  // 
  // it('redirects to Dashboard if logged in', () => {
  //   let mountedLanding = mount(<MemoryRouter><Landing /></MemoryRouter>)
  //
  // })
})
