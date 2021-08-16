import React from 'react'
import Axios from 'axios'

import {
    Carousel,
    Button,
    FormControl,
    Form,
    Card
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addCart } from '../redux/action'

class DetailPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            qty: 1,
            toLogin: false
        }
    }
    componentDidMount() {
        // console.log(this.props.location.search.substring(1))
        Axios.get(`http://localhost:2000/products/${this.props.location.search.substring(1)}`)
            .then(res => {
                this.setState({ product: res.data })
            })
    }

    onChangeQty = (e) => {
        let value = +e.target.value

        let maxQty = this.state.product.stock
        if (value < 1) {
            this.setState({ qty: 1 })
        }
        else if (value > maxQty) {
            this.setState({ qty: maxQty })
        }
        else {
            this.setState({ qty: value })
        }
    }

    onMinus = () => {
        this.setState({ qty: this.state.qty - 1 })
    }
    onPlus = () => {
        this.setState({ qty: this.state.qty + 1 })
    }
    onCheckout = () => {
        const { product, qty } = this.state
        if (!this.props.email) {
            return this.setState({ toLogin: true })
        }

        //siapkan data produk yang mau kita push ke dalam cart user yang sedang aktif
        let obj = {
            id: product.id,
            name: product.name,
            image: product.img,
            price: product.price,
            stock: product.stock,
            qty

            //qty:qty, property:value nya sama,
        }
        console.log(obj)
        this.props.addCart(this.props.id, obj)

        this.setState({ toCart: true })
    }


    render() {
        const { product, qty, toLogin, toCart } = this.state

        console.log(this.props.dataUser)

        if (toLogin) {
            return <Redirect to="/login" />
        } else if (toCart) {
            return <Redirect to="/cart" />
        }
        return (
            <>

                <div style={styles.contTitle}>
                    <h1 style={{ color: '#000051' }}>Detail Page</h1>

                </div>
                <section>
                    <div style={{ display: 'flex' }}>
                        <div style={styles.contImg}>
                            
                            <Card style={{ height: '60vh', width: '75%', marginLeft: 'auto', marginRight: 'auto' }}>
                                <Card.Img variant="top" src={product.img ? product.img : ""} />
                            </Card>
                        </div>
                        <div style={styles.contDesc}>

                            <h3>{product.name ? product.name : ""}</h3>
                            <p><bold>Category:</bold> {product.category ? product.category : ""}</p>
                            <p><bold>{product.brand ? product.brand : ""}</bold> </p>
                            <p>{product.colour ? product.colour : ""}</p>
                            <p> {product.description ? product.description : ""}</p>
                            <p><bold>Price:</bold> IDR {(product.price ? product.price : "").toLocaleString()}</p>

                        </div>
                        <div style={styles.order}>
                            <p>{product.stock ? product.stock : ""} stock available</p>
                            <p>Quantity:</p>
                            <div style={styles.PM}>
                                <Button onClick={this.onMinus} disabled={(qty <= 1) ? true : false} style={styles.buttonPM}>-</Button>
                                <FormControl style={{ width: '100px' }} value={qty} onChange={(e) => this.onChangeQty(e)} />
                                <Button onClick={this.onPlus} disabled={(qty >= product.stock) ? true : false} style={styles.buttonPM}>+</Button>

                            </div>
                            <div>
                                <Form.Text style={styles.textErrb} >
                                    {(qty <= 0) ? "You've haven't reached the minimum stock purchase" : ""}
                                </Form.Text>
                                <Form.Text style={styles.textErrb} >
                                    {(qty > product.stock) ? "Sorry your purchase have exceed the available stock" : ""}
                                </Form.Text>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* <Button variant="outline-light" style={{backgroundColor:'#000051',width:'250px',textAlign:'center',marginBottom:'5px'}}>Order Now</Button> */}
                                {this.props.role === 'user' ?
                                    <Button variant="outline-light" onClick={this.onCheckout} style={{ backgroundColor: '#000051', color: 'white' }}>ADD TO CART</Button>
                                    : null}
                        
                            </div>
                            <div>
                                <div><p>SHARE</p></div>
                                <div>

                                    <a href="#"><i class="fab fa-facebook-square" style={styles.medSos}></i></a>
                                    <a href="#"><i class="fab fa-twitter-square" style={styles.medSos}></i></a>

                                    <a href="#"><i class="fab fa-pinterest-square" style={styles.medSos}></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Modal show={this.props.errorLogin}>
                
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>This account doesn't exist</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.errLoginFalse}>OK</Button>
                    
                </Modal.Footer>
                
                </Modal> */}
                </section>

            </>
        )
    }
}

const styles = {
    contTitle: {
        marginTop: '50px',
        display: 'flex', justifyContent: 'space-between', padding: '1%', backgroundColor: '#f4f4f2'
    },
    contImg: {
        bacgroundColor: 'salmon',
        flexBasis: '40%'
    },
    contDesc: {

        flexBasis: '30%',
        padding: '1%',
        color: '#000051'
    },
    img: {
        height: '50%',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    order: {
        flexBasis: '20%',
        padding: '25px',
        border: '1px solid #d3d6db',
        margin: '5px',
        display: 'flex',
        flexDirection: 'column'
    },
    textErrb: {
        color: '#000051',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    PM: {
        display: 'flex', width: '30%', align: 'center'
    },
    buttonPM: {
        backgroundColor: '#000051', color: '#e3e8f8', fontWeight: 'bold'
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.userReducer.email,
        id: state.userReducer.id,
        dataUser: state.userReducer,
        role: state.userReducer.role
    }
}
export default connect(mapStateToProps, { addCart })(DetailPage)