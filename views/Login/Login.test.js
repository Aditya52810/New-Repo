import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}));
describe("Login page testing", () => {
    let wrapper;

    afterEach(() => {

    });

    it('check login page form loaded', () => {
        wrapper = shallow(<Login />);
        expect(wrapper.find("img").length).toBe(1);
        expect(wrapper.find("Form").length).toBe(1);
        expect(wrapper.find("h5").text()).toBe("Access Your Account");
    });

    it('submit login', () => {
        wrapper = shallow(<Login />);
        const event = { preventDefault: jest.fn() };
        jest.spyOn(event, 'preventDefault');
        const loginForm = wrapper.find("Form");
        loginForm.simulate('submit', event);
        expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
});


