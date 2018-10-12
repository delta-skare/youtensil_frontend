import React from 'react'
import ReactDOM from 'react-dom'
import ImageUploader from '../ImageUploader'
import Enzyme, { mount,shallow,render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('component rendering', ()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<ImageUploader />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders image file input', () => {
    let mountedUploader = shallow(<ImageUploader />)
    const input = mountedUploader.find('input')
    expect(input.length).toEqual(1)
    expect(input.props().type).toBe('file')
  })

  it('renders upload button', () => {
    let mountedUploader = shallow(<ImageUploader />)
    const button = mountedUploader.find('button')
    expect(button.length).toEqual(1)
    expect(button.text()).toBe('Upload')
    expect(button.props().onClick).toBeDefined()
  })
})
