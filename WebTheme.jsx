import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
const theme = createContext(null)


export function WebTheme() {
    const settheme = useContext(theme)
    const [product, setproduct] = useState({ products: [{ id: 0, image: '', title: '' }] })
    useEffect(() => {
        axios.get('https://fakestoreapi.in/api/products')
            .then((resp) => {
                setproduct(resp.data)
            })
    }, [])
    return (
        <div>


            <div className="d-flex flex-wrap ">
                {
                    product.products.map((data) => <div className={(settheme == 1) ? 'card bg-dark border text-white' : 'card'} key={data.id} style={{ height: "300px", width: '300px' }}>
                        <img src={data.image} height="100px" width="300px" />
                        <div className="card-body">
                            {data.title}
                        </div>


                    </div>)
                }

            </div>

        </div>
    )
}
export function HeaderCompenet() {
    const [dark, setdark] = useState(0)
    
    function handleTheme() {
        setdark(pretheme => pretheme == 0 ? 1 : 0)

    }
    return (
        <div >
            <div className="d-flex justify-content-around">
                <div>
                    Shooper
                </div>
                <div>
                    <div className="form-switch ms-4 mt-4">
                        <button className="btn btn-primary" onClick={handleTheme}>{(dark==0?"light":'dark')}</button>

                    </div>
                </div>
            </div>
            <div>
                <theme.Provider value={dark}>

                    <WebTheme />
                </theme.Provider>
            </div>


        </div>
    )
}