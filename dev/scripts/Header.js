import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <ul className="mainNav">
                        <li>Home</li>
                        <li>Favourite Tabs</li>
                        <li>Login</li>
                    </ul>
                </div>

                <div className="mainTitle">
                    <h1>Tabber</h1>
                </div>
            </div>
        )
    }
}