import React from 'react'
import Axios from 'axios'

import {
    Carousel,
    Card,
    Button,
    Row,
    Col,
    Modal,
    Navbar,
    Pagination,
    Container,
    Nav

} from 'react-bootstrap'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            carousels: [],
            products: [],
            phProducts: [],
            showBox: null,
            page: 1,
            prodPerPage: 5,
            maxPage: 0,
            error:false
        }
    }


    componentDidMount() {


        Axios.get('http://localhost:2000/products')
            .then(res => {
                this.setState({ products: res.data })
                // Axios.get('http://localhost:2000/products/')
                // .then(res => {
                //     this.setState({phProducts: res.data[0].images})
                // })
            })

    }

    // onNextPage = () => {
    //     this.setState({page: this.state.page+1})
    // }

    // onPreviousPage = () => {
    //     this.setState({page: this.state.page-1})
    // }

    showModal = (id) => {
        if(!this.props.email){
    return
        <Modal >
                
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please login!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> this.setState({error:false})}>OK</Button>
                </Modal.Footer>
                
                </Modal>
        }
        // else if (this.props.email) {
        // //    <Redirect to=`/detail?${id}`/>
        // }
        
    }
    showProduct = () => {
        // let beginningIndex = this.state.page -1
        // let currentProduct = this.state.products.slice(beginningIndex,beginningIndex + this.state.prodPerPage)
        console.log(this.state.products)
        return (
            // currentProduct.map((item, index) => {
            this.state.products.map((item, index) => {
                return (
                    <div className="kartu" key={index} >
                        <div><Button style={{ backgroundColor: '#000051', position: 'absolute', right: '10px', top: '5px' }}><i class="fas fa-bookmark"></i></Button>
                        </div>
                        {/* <Carousel fade variant="dark" className="carouselItem">
                            {item.img.map(item => {
                                return (
                                    <Carousel.Item >
                                        <img
                                            className="d-block"
                                            src={item}
                                            style={{ width: '100%', height: 'auto', backgroundSize: 'cover', borderRadius: '5px', justifyContent: 'center', alignItems: 'center' }}
                                        />
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel> */}

                        <Row xs={1} md={2} >
                            {Array.from({ length: 1 }).map((_, idx) => (
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={item.img} />
                                        <Card.Body style={styles.cardBody}>

                            <Card.Title style={styles.cardTitle}>{item.name}</Card.Title>
                            <div>
                                <Card.Text><strong>IDR{item.price.toLocaleString()}</strong></Card.Text>
                                <div style={styles.contButton}>

                                    
                                    {/* <Button style={{ backgroundColor: '#000051' }} onClick={() => this.onEdit(id) }><i class="fas fa-cart-plus"></i></Button> */}
                                    <Button style={{ backgroundColor: '#000051' }} as={Link} to={this.props.email ? `/detail?${item.id}` : `/login`}><i class="fas fa-cart-plus"></i></Button>
                                    
                                </div>
                            </div>
                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        

                    </div>
                )
            })
        )
    }

    // handleBoxToggle = () => this.setState({ showBox: "1000" })
    // handleBoxStop = () => this.setState({ showBox: "null" })

    // ControlledCarousel() {
    //     const [index, setIndex] = useState(0)
    //     const handleSelect = (selectedIndex, e) => {
    //       setIndex(this.selectedIndex)
    //     }

    render() {
        console.log(this.state.carousels)
        return (
            <div>

                <div style={styles.container}>
                    {/* <div style={styles.contCaro}>
                        <div style={{ border: '2px solid #000051', padding: '10px', opacity: '0.8', width: '90vw', height: '80vh', position: 'absolute', margin: '-10px', top: '-2', left: '-2', borderRadius: '5px' }}></div>
                        <div style={{
                            backgroundColor: '#000051', padding: '10px', opacity: '0.2', width: '90vw', height: '80vh', position: 'absolute', top: '0', left: '2', overFlow: 'hidden', zIndex: '1',
                            margin: '5px', borderRadius: '5px'
                        }}></div>
                        <div style={{
                            backgroundColor: '#000051', padding: '10px', opacity: '0.4', width: '90vw', height: '80vh', position: 'absolute', top: '0', left: '2', overFlow: 'hidden', zIndex: '2',
                            margin: '20px', borderRadius: '5px'
                        }}></div>
                        <div style={styles.carousel}>
                            <Carousel className="carousel">
                                {this.state.carousels.map((item, index) => {
                                    return (
                                        <Carousel.Item interval={1000} key={index} >
                                            <img
                                                className="d-block"
                                                src={item.img}
                                                alt="First slide"
                                                style={{ width: '90vw', height: '80vh', borderRadius: '5px' }}
                                            />
                                            <Carousel.Caption style={styles.caroCaption}>
                                                <h2>{item.title}</h2>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div style={{
                            backgroundColor: '#000051', padding: '10px', opacity: '0.6', width: '90vw', height: '80vh', position: 'absolute', top: '0', left: '0', overFlow: 'hidden', zIndex: '3',
                            margin: '50px', borderRadius: '5px'
                        }}></div>
                        <div style={{
                            backgroundColor: '#000051', padding: '10px', opacity: '0.8', width: '90vw', height: '80vh', position: 'absolute', top: '0', left: '0', overFlow: 'hidden', zIndex: '4',
                            margin: '65px', borderRadius: '5px'
                        }}></div>
                        <div style={{
                            border: '1px solid #000051', padding: '10px', width: '90vw', height: '80vh', position: 'absolute', right: '2', bottom: '2', overFlow: 'hidden', zIndex: '5',
                            margin: '80px', borderRadius: '5px'
                        }}></div>
                    </div> */}

                    <div style={styles.sectProducts} id="listProducts">
                        <h1>Our Products</h1>
                        <div style={{ display: 'flex', width: '205px', alignItems: 'center', justifyContent: 'space-between' }}>

                            {/* <Button style={{backgroundColor:'#0A043C'}} onClick={this.onPreviousPage}><i className= "far fa-chevron-left"></i></Button>
                            <p style={{marginBottom:'0'}}>Page {this.state.page} of {this.state.maxPage}</p>
                            <Button style={{backgroundColor:'#0A043C'}} onClick={this.onNextPage}><i className= "far fa-chevron-right"></i></Button> */}
                        </div>

                        


                        <div style={styles.contProducts}>
                            {this.showProduct()}
                        </div>

                    </div>

                    {/* <button className="scrollToTopBtn">☝️</button> */}
                </div>

                <footer style={styles.footer}>
                    <div style={styles.footerList}>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>PRODUCT</h6>
                            <a href="#">Download</a>
                            <a href="#">Pricing</a>
                            <a href="#">Locations</a>
                        </div>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>ENGAGE</h6>
                            <a href="#">FAQ</a>
                            <a href="#">Tutorials</a>
                            <a href="#">About Us</a>
                        </div>
                        <div style={styles.footerItem}>
                            <h6 style={styles.footerItemh6}>Earn Money</h6>
                            <a href="">Become Partners</a>
                        </div>
                    </div>
                    <div style={styles.footerList}>
                        <div style={styles.footerItem}>
                            <div><h6 style={styles.footerItemh6}>FIND US</h6></div>
                            <div>
                                <a href="#"><i class="fab fa-instagram" style={styles.medSos}></i></a>
                                <a href="#"><i class="fab fa-facebook-square" style={styles.medSos}></i></a>
                                <a href="#"><i class="fab fa-pinterest-square" style={styles.medSos}></i></a>
                            </div>
                        </div>
                        <div style={styles.footerItem}>
                            <div><h6 style={styles.footerItemh6}>DOWNLOAD OUR APP</h6></div>
                            <div>
                                <a href="#"><img src="https://assets.stickpng.com/images/5a902dbf7f96951c82922875.png" style={styles.appStore}></img></a>
                                {/* <a href="#"><img src="http://assets.stickpng.com/images/5a902db97f96951c82922874.png"  style={styles.appStore}></img></a> */}

                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '0', margin: '0' }}>
                        <h6 style={styles.cR}>Copyright@Nicole</h6>
                    </div>
                </footer>

            </div>

        )
    }
}



const styles = {
    container: {
        marginTop: '7vh',
        paddingTop: '2vh',
        paddingLeft: '1vw'

    },
    contCaro: {
        margin: '20px',
        position: 'relative',
        marginBottom: '50px',
        height: 'auto'
    },
    carousel: {
        height: '80vh',
        width: '90vw',
        // marginLeft: 'auto',
        // marginRight:'auto',
        position: 'absolute',
        zIndex: '9',
        margin: '35px'
    },
    caroCaption: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: '5%'
    },
    sectProducts: {
        marginTop: '10px',
        marginLeft: '5vw',
        marginRight: '5vw',

    },
    contProducts: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginBottom: '50px'
    },
    cardBody: {
        // display:'flex',
        // flexDirection:'column',
        // justifyContent:'space-between'
    },
    cardTitle: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,

    },
    contButton: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    footer: {
        backgroundColor: 'rgba(0,0,51,0.9)',
        padding: '40px'
    },
    footerList: {
        display: "flex",
        justifyContent: "space-around",
        padding: "100px 0",
        marginTop: "15px"
    },
    footerItem: {
        display: "flex",
        flexDirection: "column",
    },
    footerItemh6: {
        fontWeight: "600",
        fontSize: "18px",
        margin: "0",
        marginBottom: "10px",
        color: 'white'
    },
    footerItema: {
        color: '#f4f4f2'
    },
    medSos: {
        width: '41px',
        height: '40px'
    },
    appStore: {
        width: '136px',
        heigt: '40px'
    },
    cR: {
        textAlign: 'center',
        background: '#ccc',
        color: '#000051',
        paddingTop: '10px',
        paddingBottom: '15px',
        marginBottom: '10px'
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.userReducer.email
    }
}
export default connect (mapStateToProps)(HomePage)
