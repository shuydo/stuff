import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../../styles/Category.module.css";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import Products from "../Products/Products";
import { useSelector } from "react-redux";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [values, setValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [cat, setCat] = useState(null);
  const [items, setItems] = useState([]); //for pag
  const [isEnd, setEnd] = useState(false); //end item when work pag

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);

  useEffect(() => {
    if (!id) return;

    setValues(defaultValues);
    setItems([]); //clear products when change cat
    setEnd(false); //return button See more when change cat
    setParams({ ...defaultParams, categoryId: id }); //params was change to defPar for return offset
  }, [id]);

  useEffect(() => {
    //to serv pag    // if (isLoading || !data.length) return;
    if (isLoading) return;
    if (!data.length) return setEnd(true);
    // if (!products.length) return setIsEnd(true);

    const products = Object.values(data);

    setItems(_items => [..._items, ...products]);
  }, [data, isLoading]); //isLoading

  useEffect(() => {
    //to serv category
    if (!id || !list.length) return;

    const category = list.find(item => item.id === +id); //*1 //{ name }
    setCat(category);
  }, [list, id]);

  // console.log(data);

  const handleChange = ({ target: { value, name } }) =>
    setValues({ ...values, [name]: value });

  const handleSubmit = evt => {
    evt.preventDefault();
    setItems([]); //when filter product clear product list before render
    setEnd(false); //for button visibility
    setParams({ ...defaultParams, ...values }); //reset when change filter
  };

  const handleReset = () => {
    //UI filters reset
    setValues(defaultValues);
    setParams(defaultParams);
    setEnd(false);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>
      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            placeholder="Product name"
            onChange={handleChange}
            value={values.title}
          />
        </div>

        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            placeholder="0"
            onChange={handleChange}
            value={values.price_min}
          />
          <span>Price from</span>
        </div>

        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            placeholder="0"
            onChange={handleChange}
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden></button>
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {/* preloader? */}
      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
