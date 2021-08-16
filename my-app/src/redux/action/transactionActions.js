import Axios from 'axios'

export const addCart = (id,data) => {
    return (dispatch) => {
        Axios.get (`http://localhost:2000/users/${id}`)
        .then( res => {
            console.log(res.data)
            
            let tempCart = res.data.cart
            //logic extract "name" dari object2 di res.data.cart , save di list unique names & index. 
            let list = []
            tempCart.forEach((item,index) => {
                let tempList = [index,item.name]
                list.push(tempList)
            })
            //compare data.name dengan list of unique names dari res.data.cart
            let checkName = false
            console.log(list)
            list.forEach(item => {
                if(item[1] === data.name){
                    //push logic becomes tempCart[i].quantity += data.quantity; tempCart[i].totalPrice = tempCart[i].price * tempCart[i].quantity
                    console.log(tempCart[item[0]])
                    console.log(item[0])
                    console.log(tempCart)
                    let newQty = tempCart[item[0]].qty + data.qty
                    // tempCart[item[0]].qty += data.qty
                    if(newQty > tempCart[item[0]].stock){
                        //comment klo qty lebih dr stock
                        // newQty = data.stock
                        alert('Quantity melebihi stock')
                        newQty = tempCart[item[0]].qty
                    }
                    console.log(data.stock,newQty)
                    tempCart[item[0]].qty = newQty
                    checkName = true                    
                }
            })
            
            if (!checkName) { 
                if(data.qty > data.stock){
                        //comment klo qty lebih dr stock
                        data.qty = data.stock
                        alert('Quantity melebihi stock')
                    }
                    tempCart.push(data)
                    
             }
            
            console.log(tempCart)
            Axios.patch(`http://localhost:2000/users/${id}`, {cart: tempCart})
            .then ( res => {
                Axios.get(`http://localhost:2000/users/${id}`)
                .then ( res => {
                    console.log(res.data)
                    return dispatch ({
                        type:'LOGIN',
                        payload:res.data
                    })
                })
            })
        })
    }
}

export const delCart = (idUser, idProdCart) => {
    console.log(idUser, idProdCart)
    return (dispatch) => {
        Axios.get(` http://localhost:2000/users/${idUser}`)
        .then(res => {
            let tempCart = res.data.cart
            
            tempCart.splice(idProdCart, 1)
            console.log(tempCart)
            Axios.patch (`http://localhost:2000/users/${idUser}`, {cart: tempCart})
            .then(res => {
                Axios.get(`http://localhost:2000/users/${idUser}`)
                .then(res => {
                    return dispatch({
                        type:'LOGIN',
                        payload: res.data
                    })
                })
            })
            //console.log(tempCart)
        })
    }
}

export const saveCart = (idUser, idProdCart, qtyUpdate) => {
    return (dispatch) => {
        Axios.get(`http://localhost:2000/users/${idUser}`)
        .then(res=> {
            //tempCart untuk menampung data cart yg sekarang
            let tempCart = res.data.cart
            
            //tempProd nuntuk menampung data product yang mau kita update qty nya
            let tempProd = res.data.cart[idProdCart]

            //update qty prod yang lama dengan qty yang baru
            tempProd.qty = qtyUpdate

            //kita ganti data cart dengan data product yang sudah kita edit
            tempCart.splice (idProdCart,1,tempProd)

            //kita patch data cart di user dengan yang terbaru
            Axios.patch(`http://localhost:2000/users/${idUser}`, {cart:tempCart})
            .then(res => {
                //karena data base sudah terupdate maka kita perlu menyesuaikan data update di database
                //dengan yang ada di redux
                Axios.get(`http://localhost:2000/users/${idUser}`)
                .then(res=> {
                    return dispatch ({
                        type:'LOGIN',
                        payload: res.data
                    })
                })
            })
        })
    }
}

export const checkout = (idUser, dataTrans) => {
    return (dispatch) => {
        //untuk mencatat data history ke dalam database - GAGAL POST TAPI CONSOLE LOG idUser dan dataTrans BISA
    Axios.post(`http://localhost:2000/history`, dataTrans)
    .then(res => {
        let idUser = localStorage.getItem('idUser')
            Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
            .then (res => {
                return dispatch({
                    type:'GET_HISTORY',
                    payload: res.data
                })
            })
            
        })
    .catch(err => {
        console.log(err)
    })
        .then(res => {
            //untuk mengosongkan cart user
            Axios.patch(`http://localhost:2000/users/${idUser}`,{cart: []})
            .then(res=> {
                //untuk update data di redux
                Axios.get(`http://localhost:2000/users/${idUser}`)
                .then(res => {
                    return dispatch ({
                        type:'LOGIN',
                        payload: res.data
                    })
                })
            })
        })

    }
    
}

export const delQty = (isidatahistory) => {
    return(dispatch) => {
    //ambil database stok
    Axios.get(`http://localhost:2000/products/`)
    .then(res => {
        console.log(res.data) //bentuk array
        console.log(isidatahistory) //bentuk object { products:[]}

        //ambil id produk dari isidatahistory
        let produkDB = res.data //bentuk array
        let produkH = isidatahistory.products
        console.log(isidatahistory.products)
       
        let listidproduk = []
        let indexidprodukdidb = []
        let delProdIndex = []

        console.log(produkDB,produkH,listidproduk)
        
        //cek id produk dari isidatahistory ada di index ke berapa di db
        produkH.forEach((item2,index2) => { //0123 3 id 1234
                let itemPembelian = item2.name
            produkDB.forEach((item,index) => { //01 0 id 14
                console.log(item.name)
                console.log(item2.name)
                console.log(item.stock)
                console.log(item2.stock)
                //cek id produk
                if(item.name === itemPembelian){
                    //delete stok produkDB sesuai qty produkH
                    item.stock = item.stock - item2.qty
                    console.log(item.stock,"new")
                    
                }
            })
        })
        console.log(produkDB)

        // listidproduk.forEach((item,index) => {
        //     if(item[2] === indexidprodukdidb[2]){
        //         let tempList =[index]
        //         delProdIndex.push(tempList)
        //     }
        // })
        // console.log(indexidprodukdidb)        
        
    })
    }
}

export const getHistory  = () => {
    return (dispatch) => {
        let idUser = localStorage.getItem('idUser')
        Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
        .then(res => {
            return dispatch ({
                type: 'GET_HISTORY',
                payload:res.data
            })
        })

    }

}

export const cancel = (idUser,dataTrans) => {
    return(dispatch) => {

        //untuk mencatat data history kembali ke cart
        
        let idUser = localStorage.getItem('idUser')
        let tempCart = []
        Axios.patch(`http://localhost:2000/users/${idUser}`,{cart: tempCart})
        .then (res => {
            //tampung data dr history ke cart user
            tempCart = res.data.cart
            //untuk update data stock quantity
            Axios.get(`http://localhost:2000/products/`)
            .then( res => {
                let produkDB = res.data
                let produkC = dataTrans
                produkC.forEach((item2,index2) => { 
                    produkDB.forEach((item,index) => {
                        console.log(item.id)
                        console.log(item2.id)
                        console.log(item.stock)
                        console.log(item2.stock)
                        //cek id produk
                        if(item.id === item2.id){
                            //delete stok produkDB sesuai qty produkH
                            item.stock = item.stock + item2.qty
                            console.log(item.stock,"new")
                            
                        }
                    })
                })
                console.log(produkDB)

            })
            //untuk update data cart terbaru
            Axios.get(`http://localhost:2000/users/${idUser}`)
                .then ( res => {
                    console.log(res.data)
                    return dispatch ({
                        type:'LOGIN',
                        payload:res.data
                    })
                })
            
        })


        //untuk mengosongkan history user
        .then(res => {
            Axios.patch(`http://localhost:2000/history?idUser=${idUser}`,{history: []})
            .then ( res => {
                //untuk update data di redux
                Axios.get(`http://localhost:2000/history?idUser=${idUser}`)
                .then ( res => {
                    console.log(res.data)
                    return dispatch ({
                        type:'LOGIN',
                        payload:res.data
                    })
                })
            })
        })  
    }
}