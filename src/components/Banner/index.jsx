import "./index.css";
import Banners from "../../assents/images"

const Banner = ({
    text,
    bg,
    title,
    title2,
    bgPos = "center",
    color
}) => {
    const bannerStyle = {
        backgroundImage: `url(${Banners[bg]})`,
        backgroundSize: "cover",
        backgroundPosition: bgPos,
        color: color
    }
    return <div className="banner" style={bannerStyle}>
            <h2 className="banner__caption">{title}</h2>
            <h2 className="banner__caption">{title2}</h2>
            <div className="banner__text">{text}</div>
    </div>
}

export default Banner;
