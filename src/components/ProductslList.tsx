import React, { useState, useEffect, ChangeEvent } from "react";
import QueryProductService from "../services/queryProductService";
import IProductData from '../types/product';
import { useMutation, useQuery} from "react-query";
import { Link } from "react-router-dom";
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Array<IProductData>>([]);
  const [currentProduct, setcurrentProduct] = useState<IProductData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const { isLoading: isLoadingProducts, refetch: getAllProducts } = useQuery<IProductData[], Error>(
    "query-products",
    async () => {
      return await QueryProductService.findAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        console.log("data",res)
        setProducts(res);
        // setGetResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        // setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  const { isLoading: isSearchingProduct, refetch: findProductsByTitle } = useQuery<IProductData[], Error>(
    "query-products-by-title", // ["query-tutorials-by-title", getTitle],
    async () => {
      return await QueryProductService.findByTitle(searchTitle)
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        console.log("value",res)
        setProducts(res);
        setcurrentProduct(null);
        setCurrentIndex(-1);
        // setGetResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        // setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  useEffect(() => {
    // retriveProducts();
    getAllProducts();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  console.log("search",searchTitle)
  const { isLoading: isdeleteingproducts, mutate: deleteProduct } = useMutation<any, Error>(
    async () => {
      return await QueryProductService.deleteById(currentProduct?.id)
    },
    {
      onSuccess: (res) => {
        refreshList()
      },
      onError: (err: any) => {
        // setPutResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  const refreshList = () => {
    // retriveProducts();
    getAllProducts();
    setcurrentProduct(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (Product: IProductData, index: number) => {
    setcurrentProduct(Product);
    setCurrentIndex(index);
  };
 
  

  

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={()=>findProductsByTitle()}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>products List</h4>

        <ul className="list-group">
          {products &&
            products.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

       
      </div>
      <div className="col-md-6">
        {currentProduct ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentProduct.title}
            </div>
            <div>
              <label>
                <strong>Category:</strong>
              </label>{" "}
              {currentProduct.category}
            </div>
            <div>
              <label>
                <strong>Price:</strong>
              </label>{" "}
              {currentProduct.price}
            </div>
            
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentProduct.description}
            </div>
            <Link
              to={"/product/" + currentProduct.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            <div
              className="badge badge-danger ml-2"
              onClick={()=>deleteProduct()}
            >
              Delete
            </div>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;