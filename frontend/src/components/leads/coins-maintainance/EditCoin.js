import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { updateCoin } from '../../../actions/leads'

function EditCoin(props) {
  const { selected,updateCoin } = props;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangePrice = e => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    setName(selected?.type);
    setPrice(selected?.amount);
    setId(selected?.id)
  },[selected])

  // on submit
  const onSubmit = e => {
    e.preventDefault();
    const coins = { id, type:name, amount:price };
    console.log(coins);
    updateCoin(coins)
  };
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Coin
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <br />
                <input type="text" name="name" className="form-control" onChange={onChangeName} value={name} required readOnly/>
              </div>
              <div className="form-group">
                <label>Amount</label>
                <br />
                <input type="number" name="price" className="form-control" onChange={onChangePrice} value={price} required />
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

export default connect(null, {updateCoin})(EditCoin);
