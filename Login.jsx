import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useState } from "react";
import axios from "axios";

function Login(){

    const navigate = useNavigate()

    const [ username , setusername] = useState ('');
    const [ password , setpassword] = useState('');

    const handleApi=()=>{
        console.log({username,password});
        const url='http://localhost:4000/login';
        const data={username,password};
        axios.post(url,data)
        .then((res)=>{
            console.log(res.data);
            if(res.data.message){
                alert(res.data.message);
                if(res.data.token){
                    localStorage.setItem('token' , res.data.token)
                    navigate('/');
                }
       
            }
        })
        .catch((err)=>{
            console.log(err)
            alert('server error');
        })
    }

    return(
       
        <div>
            <Header />
            wel-come to Login page
            <br/>
            Username:-
            <input type="text"value={username}
             onChange={(e) =>{
                setusername(e.target.value)
            }} />
            <br/>
            Password:-
            <input type="password"value={password}
            onChange={(e) =>{
                setpassword(e.target.value)
            }} />
            <br/>
            <button onClick={handleApi}>Login</button>
            <Link to="/signup">Signup</Link>
            </div>
    )
}
export default Login;