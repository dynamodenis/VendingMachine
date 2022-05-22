import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateProduct } from "../../actions/leads";

function BuyProduct(props) {
  const { selected, updateProduct } = props;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [coin_type, setCoin_Type] = useState("");
  const [price, setPrice] = useState("");
  const [coins, setCoins] = useState([{
    coin_type:"",
    price:"",
    index:1
  }]);

  const onChangeNumber = e => {
    setNumber(e.target.value);
  };
  const onChangeCoin_Type = (e,index) => {
    const available_coins = [...coins]
    const selected = available_coins.findIndex(coin => coin.index === index)
    if(selected > -1){
        available_coins[selected].coin_type = e.target.value
        setCoins(available_coins)
    }
  };
  const onChangePrice = (e,index) => {
    console.log(e.target.value)
    console.log(index)
    const available_coins = [...coins]
    const selected = available_coins.findIndex(coin => coin.index === index)
    if(selected > -1){
        available_coins[selected].price = e.target.value
        console.log(available_coins)
        setCoins(available_coins)
    }
  };

  const addCoinType =()=> {
    setCoins(prevArray => [...prevArray, {coin_type:"",price:"",index:coins.length + 1}])
    console.log(coins)
  }

  useEffect(() => {
    setName(selected?.name);
    setCoin_Type(selected?.coin_type);
    setPrice(selected?.price);
    setId(selected?.id);
  }, [selected]);

  // on submit
  const onSubmit = e => {
    e.preventDefault();
    const product = { id, name, coins };
    console.log(product);
    // updateProduct(product);
  };
  return (
    <div className="modal fade" id="buyModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Buy {name}
            </h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body container">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label>Number/Packets to buy</label>
                <br />
                <input type="number" name="number" className="form-control" onChange={onChangeNumber} value={number} required />
              </div>
              <div className="form-group">
                <button type="button" className="btn btn-sm btn-info" onClick={addCoinType}>
                  Add Coins
                </button>
              </div>
              {coins.map((coin) => (
                <div className="" key={coin.index}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Coin Type</label>
                        <br />
                        <select className="form-control" name="coin_type" id="" onChange={(e) => onChangeCoin_Type(e,coin.index)} value={coin.coin_type} required>
                          <option value="" disabled>
                            Select Coin Type
                          </option>
                          <option value="PENNY">Pennies</option>
                          <option value="CENTS">Cents</option>
                          <option value="KSH">Shillings</option>
                        </select>
                        
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Total Amount</label>
                        <br />
                        <input type="number" name="price" className="form-control" onChange={(e) => onChangePrice(e, coin.index)} value={coin.price} required />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Buy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, { updateProduct })(BuyProduct);
