import React from 'react'
import {
    Navbar,
    Nav,
    Dropdown,
    Button,
    Image,
    Form,
    FormControl,
    Badge
} from 'react-bootstrap'
import { LOGO } from '../assets'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../redux/action'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toLogin: false,
            toCart: false
        }
    }
    onCart = () => {
        // if(this.props.username){
        //     this.setState({toCart: true})
        // } else {
        //     this.setState({toLogin: true})
        // }
    }
    render() {
        // if(this.state.toCart){
        //     return <Redirect to="/cart" />
        // } else if (this.state.toLogin){
        //     return <Redirect to="/login" />
        // }
        // console.log(this.props.cart.length)

        return (
            <Navbar fixed="top" style={styles.navbar} className="px-5" expand="lg">
                <Image src={LOGO.default} style={styles.image} />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/" style={styles.navLink}>Home</Nav.Link>
                        
                    </Nav>
                    {this.props.email ?
                    <Button variant="outline-light" as={Link} to="/cart"><i class="fa fa-cart-plus" aria-hidden="true"></i><Badge variant="outline-light">{this.props.cart.length}</Badge></Button>
    :null}
                     <Dropdown style={{ marginLeft: '10px' }}>
                        <Dropdown.Toggle variant="outline-light" style={styles.button} className="btnTog" id="dropdown-basic">
                            {this.props.email ? this.props.email : "Username"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.email
                                ?
                                <>
                                    
                                    <Dropdown.Item as={Link} to="/history">
                                        Transaction
                                        </Dropdown.Item>
                                    <Dropdown.Item onClick={this.props.logout}>Logout</Dropdown.Item>
                                </>
                                :
                                <>
                                    <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                                    
                                </>
                            }



                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const styles = {
    navbar: {
        backgroundColor: 'rgba(0,0,51,1)',
    },
    button: {
        border: 'none',

    },
    image: {
        height: '40px'
    },
    navLink: {
        color: 'white',
        marginRight: '5px',
        marginLeft: '20px'
    }
}


//1aa237e

const mapStateToProps = (state) => {
    return {
        email: state.userReducer.email,
        cart: state.userReducer.cart,
        role: state.userReducer.role
    }
}
export default connect (mapStateToProps, { logout })(NavigationBar)
