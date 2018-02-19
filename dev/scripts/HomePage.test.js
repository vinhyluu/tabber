import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import HomePage from "./HomePage";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe("forms in <HomePage />", () => {
    let wrapper;

    beforeEach(() => { wrapper = shallow(<HomePage />); });

    it("Should have a main title of Tabber", () => {
        expect(wrapper.find('.mainTitle').text()).toBe("Tabber")
    })

    it("Should have two forms", () => {
        expect(wrapper.find("form")).toHaveLength(2);
    })

    it("It should include one form with className login", () => {
        expect(wrapper.find("form.login"))
    })

    it("It should include one form with className createUser", () => {
        expect(wrapper.find("form.createUser"))
    })

    it("When login button is clicked, it should do something", () => {
        wrapper.find(".loginButton").simulate("click")   
    })

    it("When form button is clicked, it should do something", () => {
        wrapper.find(".createButton").simulate("click")   
    }) 
})
