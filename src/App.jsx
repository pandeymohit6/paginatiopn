import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalpages] = useState(0);

  const fetchProducts = async () => {
    const res = await axios.get("https://dummyjson.com/products?limit=100");
    if (res && res.data.products) {
      setProducts(res.data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  });

  const handleselect = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    ) {
    }
    setPage(selectedPage);
  };

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                {prod.title}
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => handleselect(page - 1)}
          >
            {" "}
            ⏮
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handleselect(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => handleselect(page + 1)}
          >
            ⏭
          </span>
        </div>
      )}
    </>
  );
}

export default App;
