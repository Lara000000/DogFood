import {Pagination as BsPag} from "react-bootstrap"

const Pagination = ({hk}) => {
    const step = (e) => {
        hk.step(+e.target.innerText)
    }
    let items = [];
    let i = 1;
    do {
        items.push(<BsPag.Item key={i} active={i === hk.page} onClick={step}>{i}</BsPag.Item>)
        i++;
    } while (i <= hk.maxPage);
    
    return <>
        <BsPag>{items}</BsPag>
    </>
}
export default Pagination;