/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


function Home() {
  // State and variables
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);

  // useEffect to check for authentication token
 /* useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  // useEffect to fetch products from the server
  useEffect(() => {
    const url = 'http://localhost:4000/get-products';
    axios.get(url)
      .then((res) => {
        console.log(res.data); // Log the response
        if (res.data.Products) {
          setProducts(res.data.Products);
          console.log(products); // Log the state after setting
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong while fetching products.');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  

  // JSX rendering
  return (
    <div>
      <Header />
        {localStorage.getItem('token') ? (
         <Link to='/add-product'>ADD PRODUCT</Link>
          ) : null}



      <h2>MY PRODUCT:</h2>
      <div className="d-flex justify-content-center flex-wrap">
      {products && products.length > 0 &&
      products.map((item, index) => {
        
        return (
          <div className="card mt-4" key={item._id}>
                  <img width="400px"
                    height="300px"
                    src={`http://localhost:4000/${item.pimage}`}
                    alt={`Product image: ${item.pname}`} />
                <p className="m-2">{item.pname} | {item.category}</p>
               <h3 className="m-2 text-danger">{item.pdesc}</h3>
                <p className="m-2 text-success">{item.price}</p>
              </div>
            )
          },)}
        </div>
    </div>
  );
}

export default Home;
