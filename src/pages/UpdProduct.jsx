import {useState,  useContext, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Container, Row, Col, Form} from "react-bootstrap";
import Ctx from "../ctx";


const UpdProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {api, setBaseData} = useContext(Ctx);
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [price, setPrice] = useState(0);
    const [cnt, setCnt] = useState(0);
    const [description, setDescription] = useState("");
    const [discount, setDiscount] = useState(0);
    const [wight, setWight] = useState("0 г");
    const [tagWord, setTagWord] = useState(""); 
    const [tags, setTags] = useState(["df"]);
    useEffect(() => {
		api.getSingleProduct(id)
			.then(serverData => {
                setName(serverData.name);
                setLink(serverData.pictures);
                setPrice(serverData.price);
                setCnt(serverData.stock);
                setDescription(serverData.description);
                setDiscount(serverData.discount);
                setWight(serverData.wight);
                setTags(serverData.tags);
                setDiscount(serverData.discount);
			})
	}, [api, id]);
    

    const tagsHandler = (e) => {
        const val = e.target.value;
        const last = val[val.length - 1];
        if (/\s/.test(last)) {
            const word = val.slice(0, val.length - 1);
            const test = tags.filter(tg => tg.toLowerCase() === word.toLowerCase());
            if (!test.length) {
                setTags(prev => [...prev, word]);
            }
            setTagWord("");
        } else {
            setTagWord(val);
        }
    }

    const delTag = (e) => {
        const val = e.target.innerText;
        setTags(prev => prev.filter(tg => tg !== val));
    }
    const formHandler = (e) => {
        e.preventDefault();
        const body = {
            name: name,
            price: price,
            discount: discount,
            stock: cnt,
            wight: wight,
            description: description,
            pictures: link,
            tags: tagWord && !tags.includes(tagWord) ? [...tags, tagWord] : tags
        };
        api.updSingleProduct(id, body)
            .then(data => {
                navigate(`/product/${data._id}`)
                setBaseData(prev => [...prev.filter((el) =>el._id !== id), data])
            })
    }
    return <Container style={{gridTemplateColumns: "auto"}}>
        <Row>
            <Col xs={12}><h1>Изменить товар</h1></Col>
            <Form onSubmit={formHandler}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-name">Название товара</Form.Label>
                            <Form.Control 
                                id="pro-name" 
                                type="text" 
                                value={name} 
                                onChange={e => {setName(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-img">Ссылка на изображение</Form.Label>
                            <Form.Control 
                                id="pro-img" 
                                type="url" 
                                value={link}
                                onChange={e => {setLink(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-price">Цена товара</Form.Label>
                            <Form.Control 
                                id="pro-price" 
                                type="number" 
                                value={price} 
                                step="10"
                                min="9"
                                max="29999"
                                onChange={e => {setPrice(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-cnt">Количество на складе</Form.Label>
                            <Form.Control 
                                id="pro-cnt" 
                                type="number" 
                                value={cnt}
                                min="0"
                                max="10000"
                                onChange={e => {setCnt(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-w">Вес товара</Form.Label>
                            <Form.Control 
                                id="pro-w" 
                                type="text" 
                                value={wight}
                                placeholder="100 г"
                                onChange={e => {setWight(e.target.value)}}
                            />
                            <Form.Text>Не забудьте прописать единицу измерения вместе с весом</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-disc">Скидка</Form.Label>
                            <Form.Select 
                                id="pro-disc"
                                type="text"
                                value={discount}
                                onChange={e => {setDiscount(e.target.value)}}
                            >
                                <option value={0}>Без скидки</option>
                                <option value={5}>5 %</option>
                                <option value={10}>10 %</option>
                                <option value={20}>20 %</option>
                                <option value={30}>30 %</option>
                                <option value={40}>40 %</option>
                                <option value={50}>50 %</option>
                                <option value={60}>60 %</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-info">Описание</Form.Label>
                            <Form.Control 
                                id="pro-info" 
                                type="text" 
                                value={description}
                                as="textarea"
                                rows={4}
                                onChange={e => {setDescription(e.target.value)}}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="pro-tag">Добавить теги</Form.Label>
                            <Form.Control 
                                id="pro-tag" 
                                type="text" 
                                value={tagWord}
                                onChange={tagsHandler}
                            />
                            <Form.Text as="div" className="mt-1 d-flex" style={{gap: ".25rem"}}>
                                {tags.map(tg => <Button 
                                    key={tg} 
                                    variant={tg === "df" ? "warning" : "secondary"}
                                    disabled={tg === "df"}
                                    onClick={delTag}
                                >{tg}</Button>)}
                            </Form.Text>
                        </Form.Group>
                        <Button variant="outline-success" type="submit"> Сохранить изменения</Button>
                    </Col>
                </Row>
            </Form>
        </Row>
    </Container>
       
}
export default UpdProduct;

