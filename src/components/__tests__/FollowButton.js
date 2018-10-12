import React from 'react'
import ReactDOM from 'react-dom'
import FollowButton from '../FollowButton'
import Enzyme, { mount,shallow,render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('component rendering', ()=>{
  // TEST WRITTEN IN JEST
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<FollowButton followText={"this profile"} followUserId={"1"}/>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders follow button', () => {
    let mountedButton = shallow(<FollowButton followText={"this profile"} followUserId={"1"} />)
    const button = mountedButton.find('Button')
    expect(button.length).toEqual(1)
    expect(mountedButton.state().text).toBe('Follow')
    expect(button.props().children).toBe('Follow this profile')
    expect(button.props().onClick).toBeDefined()
  })
})
