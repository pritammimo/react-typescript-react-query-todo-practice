import React, { useState, ChangeEvent } from "react";
import QueryProductService from "../services/queryProductService";
import IProductData from '../types/product';
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
const AddProduct: React.FC = () => {
  const initialProductState = {
  title: "",
  category: "",
  price: "",
  description: "",
  };
  const navigate=useNavigate()
  const [product, setProduct] = useState<IProductData>(initialProductState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };
  console.log("product",product)
  const { isLoading: isPostingTutorial, mutate: postproduct } = useMutation<any, Error>(
    async () => {
      return await QueryProductService.create(
        {
          title: product.title,
          category:product.category,
          price:product.price,
          description: product.description,
        });
    },
    {
      onSuccess: (res) => {
        console.log("item",res);
        navigate("/")
        // setPostResult(fortmatResponse(res));
      },
      onError: (err: any) => {
        // setPostResult(fortmatResponse(err.response?.data || err));
      },
    }
  );
   const saveproduct=()=>{
     postproduct()
   }
 

  const newproduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newproduct}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={product.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Category</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.category}
              onChange={handleInputChange}
              name="category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Price</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={product.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={product.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveproduct} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};


export default AddProduct;