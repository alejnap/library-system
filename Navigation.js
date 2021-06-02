import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';

export class Navigation extends Component{

    render(){
        return(
            <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                Home
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/Book">
                Books
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/IssueBook">
                 Issue Books
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/ReturnBook">
                Return Books
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/Members">
                Members
            </NavLink>
            <NavLink className="d-inline p-2 bg-dark text-white" to="/Feedback">
                Feedback
            </NavLink>

            </Nav>
            </Navbar.Collapse>
        </Navbar>
        
        )
    }
}