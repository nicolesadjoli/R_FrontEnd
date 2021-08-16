import React from 'react'
import {
    Accordion,
    Card,
    Button,
    Table,
    Image
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getHistory, cancel } from '../redux/action'

class HistoryPage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            history: [],
            product: {}
        }
    }
    componentDidMount() {
        // let idUser = localStorage.getItem('idUser')
        // Axios.get(`http://localhost:2000/history?username/${idUser}`)
        // .then(res => {
        //     this.setState({history: res.data})
        // })
        this.props.getHistory()
    }

    onCancel = () => {
        const { product, qty } = this.state
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
        
        this.props.cancel(this.props.id,obj)
    }
    
    render() {
        // const {history} = this.state

        if (!this.props.email) {
            return <Redirect to='/login' />
        }
        return (
            <div style={{ padding: '1%', minHeight: '100vh' }}>
                <div style={{ marginTop: '10vh' }} >
                    <h1>History Page</h1>
                    <Accordion defaultActiveKey="0">
                        {this.props.history.reverse().map((item, index) => {
                            return (
                                <Card key={index} >
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>Email: {item.email}, Time: {item.time}</Accordion.Toggle>
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <Table striped bordered hover variant="dark">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Total Price</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.products.map((item2, index2) => {
                                                    return (
                                                        <tr>
                                                            <td>{index2 + 1}</td>
                                                            <td><Image src={item2.image} rounded style={{ width: '70px' }} /></td>
                                                            <td>{item2.name}</td>
                                                            <td>IDR{(item2.price * item2.qty).toLocaleString()},00</td>
                                                            <td>{item.status}</td>
                                                            <td> <Button variant="outline-dark" style={{backgroundColor:'#f6f6f6',color:'#000051'}} onClick={this.onCancel}>Cancel</Button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Collapse>
                                </Card>
                            )
                        })}
                    </Accordion>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.userReducer.email,
        history: state.historyReducer.history
    }
}
export default connect(mapStateToProps, { getHistory,cancel })(HistoryPage)
