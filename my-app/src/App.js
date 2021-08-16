import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

//import components
import NavigationBar from './component/navigationBar';


//import pages
import HomePage from './pages/home';
import LoginPage from './pages/login';
// import RegisPage from './pages/register';
import DetailPage from './pages/detail';
import CartPage from './pages/cart';
import HistoryPage from './pages/history';

//import action
import { keepLogin } from './redux/action';




class App extends React.Component {
  componentDidMount() {
    let id = localStorage.getItem('idUser')
    this.props.keepLogin(id)
  }
  render() {
    console.log(this.props.role)
       return (
        <div>
          <NavigationBar />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/login" component={LoginPage} />
            {/* <Route path="/register" component={RegisPage} /> */}
            <Route path="/detail" component={DetailPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/history" component={HistoryPage} />
          
          </Switch>

        </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}
export default connect(mapStateToProps, { keepLogin })(App);
