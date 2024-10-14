import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
    <div className="navbar">
        <div className="nav-base-header">
            <p className="nav-header1">BY</p>
            <p className="nav-header2">F I A C H R A</p> 
        </div>
        <hr />
            <div className="bar">
                <nav>
                    <ul className="create-section">
                        <li><button>+</button></li>
                    </ul>
                    <ul className="sections">
                        <li>
                            <Link to={'/'}>
                                <p>About Me</p>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/HomePage'}>
                                <p>Home Page</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        <hr />
    </div>
    )
}

export default NavBar;