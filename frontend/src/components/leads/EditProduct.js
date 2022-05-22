import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { updateProduct } from '../../actions/leads'

function EditProduct(props) {
  const { selected,updateProduct } = props;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [coin_type, setCoin_Type] = useState("");
  const [price, setPrice] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeNumber = e => {
    setNumber(e.target.value);
  };
  const onChangeCoin_Type = e => {
    setCoin_Type(e.target.value);
  };
  const onChangePrice = e => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    setName(selected?.name);
    setNumber(selected?.number);
    setCoin_Type(selected?.coin_type);
    setPrice(selected?.price);
    setId(selected?.id)
  },[selected])

  // on submit
  const onSubmit = e => {
    e.preventDefault();
    const product = { id, name, price, number, coin_type };
    console.log(product);
    updateProduct(product)
  };
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Product
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Product</label>
                <br />
                <input type="text" name="name" className="form-group" onChange={onChangeName} value={name} required />
              </div>
              <div className="form-group">
                <label>Number/Packets</label>
                <br />
                <input type="number" name="number" className="form-group" onChange={onChangeNumber} value={number} required />
              </div>
              <div className="form-group">
                <label>Coin Type</label>
                <br />
                <select className="form-group" name="coin_type" id="" onChange={onChangeCoin_Type} value={coin_type} required>
                  <option value="" disabled>
                    Select Coin Type
                  </option>
                  <option value="PENNY">Pennies</option>
                  <option value="CENTS">Cents</option>
                  <option value="KSH">Shillings</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount per packet</label>
                <br />
                <input type="number" name="price" className="form-group" onChange={onChangePrice} value={price} required />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {updateProduct})(EditProduct);
