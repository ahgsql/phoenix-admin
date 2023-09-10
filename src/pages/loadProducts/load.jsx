import addProduct from "../../hooks/addProduct";
import products from "./products";

export default function LoadProduct() {
  const load = () => {
    products.forEach((product) => {
      let data = {
        productTitle: product.title,
        productPrice: product.price,
        productRating: product.rating,
        ratedPeople: product.ratedPeople,
        productDescription: product.description,
        productSlug:
          product.title.toLowerCase().split(" ").join("-") + "-" + product.id,
        productImg: [{ url: product.photo }],
        productPhotoFull: product.photoFull,
      };

      addProduct(data);
    });
  };
  load();

  return <h1>Loading data...</h1>;
}
