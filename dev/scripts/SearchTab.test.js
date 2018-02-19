import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import SearchTab from "./SearchTab"; 
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
//Enzyme
//rendering out react in an environment and giving us a jQuery api for a rendered react component
//take away the pain of testing with reacts test utils. ie. if you want to test in an about component that was rendering an h1 with eext, you'd have to render react components, do .props.children, etc. 
//enzyme: render the about component and can we find an h1 in there, does anywhere in the component contain hi my name is etc.

//can do this OR below
// describe("<SearchTab />", () => {
//     it("Should include a div <div>", () => {
//         const wrapper = shallow(<SearchTab />);
//         expect(wrapper.contains(<div className="searchTabs" id="searchBar"></div>)).to.equal(true);
//     });
// });

// test("App component should render as expected", ()=>{
//     const component = shallow(<App />)
//     console.log(component);
// })


//YAY my first ever test case!
describe("<SearchTab />", () => { 
    it("Should include a div <div>", ()=>{
        const wrapper = shallow((
            <div className="searchTabs" id="searchBar"></div>
        ));
        
        expect(wrapper.contains(<div className="searchTabs" id="searchBar"></div>)).toEqual(true);
    })
})