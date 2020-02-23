import React from 'react'
import renderer from 'react-test-renderer'

import App from '../App'

describe('<App />', () => {
	const defaultProps = {}
	const wrapper = renderer.create(<App {...defaultProps} />)

	test('render', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
