import React, { Fragment, useEffect, useState } from "react";
import { connect } from 'react-redux'
import { getCoins } from '../../../actions/leads'
import EditCoin from "./EditCoin";

function CoinMaintainance(props) {
    const {getCoins, coins} = props
    const [selected, setSelected ] = useState({})

    const selectedCoin = product => {
        setSelected(product)
    }
    useEffect(() => {
        getCoins()
    }, [])
  return (
    <Fragment>
      <h1>Coins List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {coins?.map(coin => (
            <tr key={coin.id}>
              <td>{coin.id}</td>
              <td>{coin.type}</td>
              <td>{coin.amount}</td>
              <td>
                <button
                  className="btn btn-primary btn-small"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => selectedCoin(coin)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditCoin selected={selected}/>
    </Fragment>
  );
}

const mapStateToProps =state=>({
    coins:state.leads.coins
})

export default connect(mapStateToProps,{getCoins})(CoinMaintainance);
