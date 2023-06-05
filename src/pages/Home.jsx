import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { Journals } from "react-bootstrap-icons";
import Slider from "../components/Slider";
import Banner from "../components/Banner";
import bannersData from "../assents/data/banners.json";

const Home = ({ user, setActive }) => {
	return <>
		<div className="banner__dog">
			<Container className="d-block" >
				<Col xs={12} lg={6}>
					<h1 className="text">DogFood</h1>
					<h4 className="text2">Крафтовые лакомства для<br /> вашего питомца</h4>
					<div className="info">
						{user && <Link to="/catalog" className="info-link">
							<Journals style={{ marginRight: "10px" }} />
							Каталог товаров
						</Link>}
						{!user && <>
							<span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь,</span>
							чтобы получить доступ к сайту</>}
					</div>
				</Col>
			</Container>
		</div>
		<Container className="d-block">

			<Row className="g-4">
				<Col xs={12}>
					<Banner  {...bannersData[0]} pattern={true} />
				</Col>
				<Col xs={12}>
					<Banner {...bannersData[1]} pattern={true} />
				</Col>
				{user && <Col xs={12}>
					<Slider desktop={3} mobile={2} />
				</Col>}
				<Col xs={12} lg={6} style={{color: "green"}}>
					<Banner {...bannersData[2]} pattern={true} />
				</Col>
				<Col xs={12} lg={6}>
					<Banner {...bannersData[3]} pattern={true} />
				</Col>
				<Col xs={12}>
					<Banner {...bannersData[0]} pattern={true} />
				</Col>
			</Row>
		</Container>

	</>

}

export default Home;