import {useState, useEffect, createContext} from "react";
import {Routes, Route} from "react-router-dom";

// import testData from "./assents/data.json";
import Ctx from "./ctx"
import Api from "./Api"
// Подключаем компоненты
import Modal from "./components/Modal";
import {Header, Footer} from "./components/General"; // index.jsx

// Подключаем странички
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("user12"));
    const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
    const [token, setToken] = useState(localStorage.getItem("token12"));
    const [baseData, setBaseData] = useState([]);
    const [goods, setGoods] = useState(baseData);
    const [searchResult, setSearchResult] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [api, setApi] = useState(new Api(token));
    
    useEffect(() => {
        if (user) {
            setUserId(localStorage.getItem("user12-id"));
            setToken(localStorage.getItem("token12"));
        } else {
            localStorage.removeItem("user12-id")
            localStorage.removeItem("token12")
            setUserId(null);
            setToken(null);
        }
    }, [user])

    useEffect(() => {
        setApi(new Api(token));
        console.log("token", token);
    }, [token])

    useEffect(() => {
        if (token) {
            api.getProducts()
                .then(data => {
                    console.log(data);
                    setBaseData(data.products);
                })
        } else {
            setBaseData([]);
        }
    }, [api])

    useEffect(() => {
        // console.log("000")
        // console.log(baseData.filter(el => el._id === "622c77cc77d63f6e70967d1e")[0].likes);
        // setGoods(baseData)
    }, [baseData])

    return (
        <Ctx.Provider value={{
            searchResult,
            setSearchResult,
            setBaseData,
            baseData,
            goods,
            setGoods,
            userId,
            token,
            api
        }}>
                <Header
                    user={user}
                    upd={setUser}
                    searchArr={baseData}
                    setGoods={setGoods}
                    setModalOpen={setModalOpen}
                />
            <main>
                <Routes>
                    <Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
                    <Route path="/catalog" element={
                        <Catalog 
                            goods={goods}
                            userId={userId}
                        />
                    }/>
                    <Route path="/old" element={
                        <OldPage
                            goods={goods}
                        />
                    }/>
                    <Route path="/profile" element={
                        <Profile user={user} setUser={setUser}/>}
                    />
                    <Route path="/favorites" element={
                        <Favorites />}
                    />
                    <Route path="/product/:id" element={<Product />}/>
                    <Route path="/add/product" element={<AddProduct/>}/>
                </Routes>
            </main>
            <Footer/>
            <Modal 
                isActive={modalOpen} 
                setIsActive={setModalOpen}
                setUser={setUser}
            />
        </Ctx.Provider>
    )
}

export default App;

