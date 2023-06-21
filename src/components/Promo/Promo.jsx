import "./style.css"

const Promo = (props) => {
    return <div className="promo-block">
        <div className="promo-img"/>
        <p className="promo-text">{props.text || "-"}</p>
    </div>
}

export default Promo;