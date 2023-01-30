import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "react-query";
import IProductData from "../types/product";
import QueryProductService from "../services/queryProductService";
const Tutorial:React.FC = () => {
  const { id }= useParams();
  let navigate = useNavigate();
  const initialProductState = {
  title: "",
  category: "",
  price: "",
  description: "",
  };
  const [currentProduct, setCurrentProduct] = useState<IProductData>(initialProductState);
  const [message, setMessage] = useState<string>("");
  console.log("curre",currentProduct)
  const { isLoading: isLoadingProduct, refetch: getProductById } = useQuery<IProductData, Error>(
    "query-product-by-id",
    async () => {
      return await QueryProductService.findById(id)
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        setCurrentProduct(res);
      },
      onError: (err: any) => {
        // setPutResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  useEffect(() => {
    if (id !==""){
     getProductById()
    }
  }, [id]);
  const { isLoading: isUpdatingTutorial, mutate: updateProduct } = useMutation<any, Error>(
    async () => {
      return await QueryProductService.update(
        id,currentProduct);
    },
    {
      onSuccess: (res) => {
        setCurrentProduct(res)
        // setPutResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        // setPutResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  // const updateTutorial = (id:any) => {
  //   ProductService.update(id, currentProduct)
  //     .then((response: any) => {
  //       console.log(response.data);
  //       setMessage("The tutorial was updated successfully!");
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // };
  const { isLoading: isdeleteingproducts, mutate: deleteProduct } = useMutation<any, Error>(
    async () => {
      return await QueryProductService.deleteById(
        id)
    },
    {
      onSuccess: (res) => {
        navigate('/')
      },
      onError: (err: any) => {
        // setPutResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
  const deleteProducts = () => {
    deleteProduct()
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Category</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="category"
                value={currentProduct.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Price</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="price"
                value={currentProduct.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

        
          <button
            type="submit"
            className="badge badge-success mr-2"
            onClick={()=>updateProduct()}
          >
            Update
          </button>
          <button className="badge badge-danger" onClick={deleteProducts}>
            Delete
          </button>

         
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;