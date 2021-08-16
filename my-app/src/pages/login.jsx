import React from 'react'
import {
    FormControl,
    InputGroup,
    Button,
    Modal,
    Form
} from 'react-bootstrap'

import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login,register} from '../redux/action'


class LoginPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visibility:false,
            error: false,
            caps: [false,""],
            emailErr: [false, ""],
            registerErr: [false,""]
            // errorLogin: false dpindah k action
        }
    }

    clickEnter = (e) => {
        if(e.key === 'Enter'){
            this.onLogin()
        }
    }

    onLogin = () => {
        //ambil data dari input username dan password
        let email = this.refs.email.value
        let password = this.refs.password.value
        //console.log(username,password)
        //kalau ada input masih kosong kita notif bahwa data tidak boleh kosong
        // if (!username || !password){
        //     return this.setState ({error: true})
        // }
        // //cek apakah data yang dikirim oleh user sudah ada di daftar users di database
        // this.props.login(username, password)

        //alert('cek setelah error')
        //kalau tidak ada kasih info

        //kalau ada langsung menuju ke halaman utama atau landing pages

        

        //tidak boleh ada error
        // if(this.state.emailErr[0] || this.state.passErr [0]) return this.setState({registerErr: [true, "Make sure all of your data is valid"]})
        
        //cek apakah confirm password sama dengan password
        // if(this.refs.confpassword.value !== password) return this.setState({registerErr: [true, "Confirm password doesn't match with password"]})
        
        //semua input terisi
        if (!email || !password) return this.setState({registerErr: [true, "Please input all of data"]})
        
        //siapkan object data user
        let obj = {
            email,
            password,
            role: 'user',
            cart:[]
        }

        //cek username dan email apakah sudah ada di database atau belum
        this.props.login(email,password,obj)
    }

    
    onCaps = (e) => {        
        if (e.getModifierState ('CapsLock')){
            return this.setState({caps:[true, "WARNING! Caps lock is ON."]})
        }
        this.setState({caps:[false,""]})
    }
    
    emailValid = (e) => {
        let regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(e.target.value)) return this.setState({emailErr: [true, "email not valid"]})
        this.setState({emailErr:[false,""]})
    }

    passValid = (e) => {
        let number = /[0-9]/
        let symb = /[!@#$%^&*]/
        let caps = /[A-Z]/ 
        if (!symb.test(e.target.value) || !number.test(e.target.value)|| !caps.test(e.target.value) || e.target.value.length < 6) return this.setState ({passErr: [true, `Your password must have: 
        At least 6 characters long, Upper & lowercase letters, At least one number and one special character, and must not contain spaces or emoji.`]})
        this.setState({passErr: [false,""]})
    }

    render(){
        if(this.props.email){
            return <Redirect to="/" />
        }
        //console.log(this.props.username)
        const {visibility} = this.state
        return(
            <div style={styles.cont}>
                <div style={styles.contForm} className="conForm">
                    <h1 style={{color:'#000051'}}>Hello</h1>
                    <h3 className="mb-4" style={{color:'#000051'}}>Welcome Back!</h3>

                    <label>Email</label>
                    <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><i className="fas fa-user-circle"></i></InputGroup.Text>
                                        <FormControl
                    placeholder="Input Your Email"
                    onChange= {(e) => this.emailValid(e)}
                    ref="email"
                    />
                </InputGroup>
                <div>

                    {/* <Form.Text style={styles.textErr}>
                        {this.state.emailErr[0] ? this.state.emailErr[1] : ""}
                    </Form.Text> */}
                
                </div>
                <label>Password</label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1" id = "myInput" onClick = {() => this.setState({visibility: !visibility})}>
                        {visibility ? <i className="fas fa-eye"></i> :  <i className="fas fa-eye-slash"></i>}
                        </InputGroup.Text> 
                    <FormControl
                    placeholder="Input Your Password Here"
                    type={visibility ? "text" : "password"}
                    ref="password"
                    onKeyDown={(e) => this.clickEnter(e)}
                    onKeyUp={(e) => this.onCaps(e)}
                    />
                </InputGroup>
                <Form.Text style={styles.textErrb} >
                        {this.state.caps[0] ? this.state.caps[1] : ""}
                    </Form.Text>

                <div style={styles.contButton}>
                <Button variant="primary" style={styles.button} onClick={this.onLogin}>Login</Button>

                </div>         
                    
                </div>
                <Modal show={this.state.error}>
                
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Please input all of the data!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=> this.setState({error:false})}>OK</Button>
                </Modal.Footer>
                
                </Modal>

                {/* <Modal show={this.props.errorLogin}>
                
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>This account already exist, Please try again</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.errLoginFalse}>OK</Button>
                    
                </Modal.Footer> */}
                
                {/* </Modal> */}

                <Modal show={this.state.registerErr[0]}>
                        <Modal.Header>
                        <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{this.state.registerErr[1]}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={()=> this.setState({registerErr:[false,""]})}>OK</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}

const styles = {
    cont:{
        background: "url(https://images.unsplash.com/photo-1508125673219-7cec6bc90159?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80) no-repeat center",
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center'
    },
    contForm:{
        width:'30vw',
        height: '70vh',
        marginTop: '12vh',
        backgroundColor:'rgba(255,255,255,0.6)',
        padding: '2%',
        borderRadius: '10px',
    },
    textErrb: {
        color:'#000051',
        fontWeight: 'bold',
        marginBottom: '15px'
    },
    contButton: {
        display:'flex',
        justifyContent: 'center',
        marginBottom: '20px'        
    },
    button:{
        backgroundColor: '#062B4C',
        border:'none',
        marginLeft:'auto',
        marginRight:'auto',
        fontWeight:'bold',
        width:'400px',
    },
    gotoregis: {
        fontWeight: 'bold',
        textAlign:'center'
    },
    forgot:{
        fontWeight: 'bold',color:'#000051', fontSize:'12px'
    },
}

const mapStateToProps = (state) => {
    return {
        errorLogin: state.userReducer.errorLogin,
        email: state.userReducer.email,
        successReg: state.userReducer.successRegister
    }
}
export default connect(mapStateToProps,{login,register})(LoginPage)