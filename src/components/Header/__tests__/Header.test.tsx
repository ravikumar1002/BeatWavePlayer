import { RenderResult, fireEvent, render } from '@testing-library/react'
import Header from '../Header'
import { wrapperReactRouter } from '../../../tests/wrappers'


jest.mock('react-router', () => ({
    ...jest.requireActual('react-router')             ,
    useNavigate: jest.fn(() => jest.fn)
}))

describe('Header', () => {
    let wrapper: RenderResult

    beforeEach(() => {
        wrapper = render(<Header />, {
            wrapper: wrapperReactRouter
        })
    })

    it('should render the header with title', () => {
        expect(wrapper.getByTestId('pageTitle')).toBeDefined()
    })
    it('should navigte to the home page', () => {
        const titleEl = wrapper.getByTestId('pageTitle')
        fireEvent.click(titleEl)
    })
})