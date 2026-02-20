import axios from "axios";
import Swal from "sweetalert2";
const serverURL = 'http://localhost:5000'

function generateOTP() {
     var otp = parseInt(Math.random() * 899999) + 100000
     return otp
}

function getDate() {
     var cd = new Date()
     return (`${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`)
}

function getTime() {
     var cd = new Date()
     return (`${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`)
}


async function postData(url, body) {
     try {


          var response = await axios.post(`${serverURL}/${url}`, body)
          var data = response.data
          return (data)
     }
     catch (e) {
          if (e.response.status == 401) { Swal.fire('Your session has been expired,please login..') }

          else { Swal.fire('Site is not working properly.. pls wait for some time...') }

          return ([])
     }
}



async function getData(url) {
     try {
          const config = {
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Token')
               }
          }
          var response = await axios.get(`${serverURL}/${url}`, config)
          var data = response.data
          return (data)
     }
     catch (e) {
          if (e.response.status == 401) { Swal.fire('Your session has been expired,please login..') }

          else { Swal.fire('Site is not working properly.. pls wait for some time...') }

          return ([])
     }
}



async function postDatabranch(url, body) {
     try {
          var response = await axios.post(`${serverURL}/${url}`, body)
          var data = response.data
          return (data)
     }
     catch (e) {
          return (null)
     }
}



export { postData, postDatabranch, serverURL, getDate, getTime, getData, generateOTP }