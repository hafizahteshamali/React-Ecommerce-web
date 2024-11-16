import "./Cards.css";

const Cards = ({ data }) => {
  const { title, price, image, description, category } = data;
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 40)}...</h5>
        <h6>{category}</h6>
        <p className="card-text">{description.slice(0, 40)}...</p>
        {/* <a href="#" className="btn">
          Go somewhere
        </a> */}
      </div>
    </div>
  );
};

export default Cards;
