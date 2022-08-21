import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
export const Moves = (props) => {
  const { amount, rate } = props;
  const { loggedUser } = useSelector((state) => {
    return state.userModule;
  });

  function getMovesToDisplay() {
    return amount ? loggedUser.moves.slice(0, amount) : loggedUser.moves;
  }

  if (!loggedUser.moves) return "No moves to display";
  return (
    <section className="container moves">
      <header className="main full"><span className="fa-s"></span> Last {amount} moves</header>
      {getMovesToDisplay().map((move) => {
        return (
          <div key={move.at} className="move">
            <div className="to">
              <span> To </span>
              <Link to={`/contact/${move.to._id}`}>{move.to.name}</Link>
            </div>
            <div className="amount">
              <span className="coins"><span className="fa-b"></span>{move.amount}</span> 
              <span className="coins">
                {"$" + (move.amount * rate).toFixed(2)}
              </span>
            </div>
            <div className="status-box">
              <span>STATUS : </span>
              <span className="status">APROVED</span>
            </div>
          </div>
        );
      })}
    </section>
  );
};
