import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
let searchContext = createContext(null)
export function ProductDetail() {
    const searchItem = useContext(searchContext)
    const [item, setitem] = useState({ products: [{ id: 0, image: '', price: 0, brand: '', color: '' }] })
    useEffect(() => {
        // console.log(searchItem);
        if (searchItem === '') {
            axios.get(`https://fakestoreapi.in/api/products`)
                .then((res) => {
                    setitem(res.data)
                })
                .catch((err) => {
                    console.log(err);

                })
        }
        else {
            axios.get(`https://fakestoreapi.in/api/products/category?type=${searchItem}`)
                .then((res) => {
                    setitem(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [searchItem])
    return (
        <div>
            <div className="fw-bold  ms-3">Products:{searchItem}</div>
            <div className="d-flex flex-wrap">
                {
                    item.products.map((data) => <div key={data.id} className="card " style={{ width: '300px', height: '400px' }}>
                        <img src={data.image} alt="" height={300} width={300} />
                        <div className="card-header">
                            <div className="fw-bold"> Price:  {(data.price * 87).toLocaleString('en-in', { style: 'currency', currency: 'INR' })}</div>
                        </div>



                    </div>)

                }
            </div>
        </div>
    )
}


export function SearchAmazon() {
    const [product, setproduct] = useState('')
    const [searchProduct, setSearchProduct] = useState('')
    function handleProduct(e) {
        setproduct(e.target.value)
    }
    function handleBtnSearch() {
        setSearchProduct(product)
    }
    return (
        <div>
            <div className="d-flex justify-content-center flex-column align-items-center">
                <div className=" w-25 input-group">
                    <input type="text" className="form-control" placeholder="search items" onChange={handleProduct} />
                    <button className="btn btn-primary" onClick={handleBtnSearch}>Search</button>
                </div>
            </div>
            <div>
                <searchContext.Provider value={searchProduct}>
                    <ProductDetail />
                </searchContext.Provider>
            </div>
        </div>
    )
}