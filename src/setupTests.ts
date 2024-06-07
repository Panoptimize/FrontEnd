// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
    useLocation: () => jest.fn(),
    useParams: () => jest.fn(),
    useRouteMatch: () => jest.fn(),
    useSearchParams: () => jest.fn(),
    useHistory: () => jest.fn(),
}));
