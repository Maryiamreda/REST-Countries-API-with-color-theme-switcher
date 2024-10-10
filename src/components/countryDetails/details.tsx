import { useParams } from "react-router-dom";

const Details = () => {
    const { name } = useParams();

    return (<>hi,{name}!!</>);
}

export default Details;