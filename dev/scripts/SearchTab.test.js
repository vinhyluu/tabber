import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import SearchTab from "./SearchTab"; 
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//YAY my first ever test case!
describe("<SearchTab />", () => { 
    it("Should include a searchTabs div with className searchTabs and id searchBar", ()=>{
        const wrapper = shallow((
            <div className="searchTabs" id="searchBar"></div>
        ));
        
        expect(wrapper.contains(<div className="searchTabs" id="searchBar"></div>)).toEqual(true);
    })
})