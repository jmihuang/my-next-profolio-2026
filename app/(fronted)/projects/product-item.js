import Image from "next/image";
function productItem({ alt, image, price, name, engName, capacity, slug }) {
  return (
    <div className="product_item">
      <div className="image-box image-hover">
        <a className="product-item-image" href={`/projects/${slug}`}>
          <Image className="responsive-img" src={image} alt={alt} fill />
        </a>
        <div className="name_price info">
          <a className="name" href="#">
            <b>{name}</b>
          </a>
          <b className="price">ntd.{price}</b>
        </div>
        <div className="en info">
          <small className="en_name">{engName}</small>
          <small className="ml">{capacity}</small>
        </div>
      </div>
    </div>
  );
}

export default productItem;
