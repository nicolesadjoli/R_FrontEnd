import Axios from 'axios';

export const login = (email,password,data) => {
    return (dispatch) => {
        //cek kesamaan email di database
        Axios.get(`http://localhost:2000/users?email=${email}`)
        .then (res=> {
            if(res.data.length !== 0){
                return dispatch ({
                    type: 'USERNAME_EMAIL_EXIST'
                })
            }
            //post data user baru
            Axios.post('http://localhost:2000/users',data)
            .then(res => {
                return dispatch ({
                    type:'SUCCESS_REGISTER'
                })
            })
        })

        Axios.get(` http://localhost:2000/users?email=${email}&password=${password}`)
        .then ( res => {
            console.log(res.data)
            if(res.data.length ===0){
                //kalau tidak ada muncul error
                return dispatch({
                    type: 'ERROR_LOGIN'
                })
            } else{
                //simpan data id user ke local storage
                localStorage.setItem ('idUser',res.data[0].id)
                //kalau berhasil, data user akan dikirim userReducer
                //alert('selamat kamu sudah login')
                console.log(res.data)
                return dispatch ({
                    type: 'LOGIN',
                    payload: res.data[0]
                })
            }
            
        })
    }
}

// export const errLoginFalse = () => {
//     return (dispatch) => {
//         return dispatch({
//             type: 'ERROR_LOGIN_FALSE'
//         })
//     }
// }

export const logout = () => {
    return (dispatch) => {
        //menghapus data idUser di localStorage
        localStorage.removeItem('idUser')

        return dispatch ({
            type:'LOG_OUT'
        })
    }
}

export const keepLogin = (id) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${id}`)
        .then (res => {
            return dispatch ({
                type: 'LOGIN', //dia sama returnnya sm login jd drpd bkin case baru mending pake case ud ad
                payload: res.data
            })
        })
    }
    
}

export const register = (email,data) => {
    return (dispatch) => {
    
            //cek kesamaan email di database
            Axios.get(`http://localhost:2000/users?email=${email}`)
            .then (res=> {
                if(res.data.length !== 0){
                    return dispatch ({
                        type: 'USERNAME_EMAIL_EXIST'
                    })
                }
                //post data user baru
                Axios.post('http://localhost:2000/users',data)
                .then(res => {
                    return dispatch ({
                        type:'SUCCESS_REGISTER'
                    })
                })
            })
        
    }
}

export const resetRegErr = () => {
    return (dispatch) => {
        return dispatch ({
            type: 'RESET_REGISTER_ERR'
        })
    }
}

