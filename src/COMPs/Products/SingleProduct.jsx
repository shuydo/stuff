import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";
import { ROUTES } from "../../utils/routes";

import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products);

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  // console.log(data, isLoading);
  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) navigate(ROUTES.HOME); //redirect if wrong product id
  }, [isLoading, isFetching, isSuccess, navigate]);

  useEffect(() => {
    // console.log(data);
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  return !data ? (
    // <section className={styles.preloader}>Loading...</section>
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
