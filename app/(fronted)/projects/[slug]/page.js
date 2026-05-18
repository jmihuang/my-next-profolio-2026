import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/catalogue";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
    return;
  }

  return {
    title: product.name,
    description: product.desc,
  };
}

async function Product({ params }) {
  const product = await getProduct(params.slug);
  //找不到資料頁面
  if (!product) {
    notFound();
    return;
  }
  product.desc = product.desc.replace(/\n/g, "<br/>");
  return (
    <div className="product_detail">
      <div className="row">
        <div className="col s12 m6">
          <Link href={`/projects/${params.slug}/zoomImage`}>
            <div
              className="main-image"
              style={{
                backgroundImage: `url(${product.image})`,
              }}
            ></div>
          </Link>
          <div className="image-list">
            {[product.image, product.image, product.image, product.image].map(
              (url, index) => (
                <div
                  className={`image-item ${index === 4 ? "active" : ""}`}
                  key={index}
                >
                  <a className="img-square" data-url={url}>
                    <Image
                      className="responsive-img"
                      src={url}
                      alt={product.alt}
                      width={100}
                      height={100}
                    />
                  </a>
                </div>
              )
            )}
          </div>
        </div>
        <div className="col s12 m6">
          <div className="product-infor">
            <div className="section-block">
              <h5 className="name">{product.name}</h5>
              <h5 className="en_name">{product.engName}</h5>
              <h4 className="price">ntd.{product.price}</h4>
            </div>
            <div className="section-block">
              <div className="size">{product.capacity}</div>
              <small className="comment"> </small>
            </div>
            <div>
              <div className="number-adjust" id="number-adjust">
                <span className="control minus">
                  <i className="tiny material-icons">remove</i>
                </span>
                <span className="number" id="number">
                  1
                </span>
                <span className="control add">
                  <i className="tiny material-icons">add</i>
                </span>
              </div>
              <div className="custom-select" style={{ width: "200px" }}>
                <div className="select-wrapper">
                  <input
                    className="select-dropdown dropdown-trigger"
                    type="text"
                    readOnly
                    data-target="select-options"
                  />
                  <ul
                    id="select-options"
                    className="dropdown-content select-dropdown"
                    tabIndex="0"
                  >
                    {["玫瑰香味", "扶桑花香味", "茉莉香味"].map(
                      (flavor, index) => (
                        <li
                          key={index}
                          id={`select-options-${index}`}
                          tabIndex="0"
                          className={index === 0 ? "selected" : ""}
                        >
                          <span>{flavor}</span>
                        </li>
                      )
                    )}
                  </ul>
                  <svg
                    className="caret"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M7 10l5 5 5-5z"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                  </svg>
                  <select tabIndex="-1">
                    <option value="0">玫瑰香味</option>
                    <option value="1">扶桑花香味</option>
                    <option value="2">茉莉香味</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="section-block">
              <div className="inquery-btn">
                <button className="btn" id="submit">
                  ADD CART
                </button>
              </div>
              <div className="inquery-btn">
                <button className="btn" id="submit">
                  BUY NOW
                </button>
              </div>
            </div>
            <div className="body">
              <div
                className="section-block"
                dangerouslySetInnerHTML={{
                  __html: product.desc,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <h5>Description</h5>
      <div className="body">...</div>
      <h5>You May Also Like</h5>
      <div className="products_items">
        {[...Array(6)].map((_, index) => (
          <div className="product_item" key={index}>
            <div className="image-box image-hover">
              <Link href="/projects" className="product-item-image">
                <Image
                  className="responsive-img"
                  src="/bath-containers-plant-table.png"
                  alt="自然淨化,環境清潔"
                  width={200}
                  height={200}
                />
              </Link>
              <div className="number">{index + 1}</div>
              <div className="name_price info">
                <Link href="#" className="name">
                  <b>介觀植礦防護液</b>
                </Link>
                <b className="price">ntd.{product.price}</b>
              </div>
              <div className="en info">
                <small className="en_name">
                  Natural All-Purpose Protective Spray
                </small>
                <small className="ml">50ml / 1.69fl.oz</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="wow fadeInUp index_shop_bg index-shop-online">
        <div className="index_shop_left">
          <div className="index_shop_menu">
            <ul>
              <li>
                <Link href="/projects" className="h3">
                  On Line
                </Link>
                <p className="h5">線上購買</p>
              </li>
              <li>
                <Link href="/stories" className="h3">
                  Stores
                </Link>
                <p className="h5">通路展示</p>
              </li>
            </ul>
            <Link href="/projects" className="narrow light-color">
              <span>Shop here</span>
              <span className="right-line"></span>
            </Link>
          </div>
        </div>
        <div className="index_shop_right"></div>
      </section>
    </div>
  );
}

export default Product;
