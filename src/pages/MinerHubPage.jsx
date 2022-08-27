import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPending, minePending } from "../store/actions/tokenActions";
import { useState } from "react";
export const MinerHub = (props) => {
  //   useDispatch
  const dispatch = useDispatch();

  const { pending, block } = useSelector((state) => state.tokenModule);
  useEffect(() => {
    dispatch(loadPending());
  }, []);

  const [mineList, setMineList] = useState([]);

  useEffect(() => {
    console.log(block);
  }, [block]);

  //   const [pendingToMine, []] = useState([])

  function showPending() {
    console.log(pending.length);
    return pending.length ? (
      <>
        {pending.map((tx) => {
          return (
            <li key={tx._id} className="pending-tx">
              {tx.index} <input type="checkbox" name={tx._id} />
              {tx.signature}...
            </li>
          );
        })}
      </>
    ) : (
      ""
    );
  }

  function showMineList() {
    console.log("change");
    return mineList.length ? (
      <>
        {mineList.map((tx) => {
          return (
            <li key={tx._id} className="mine-tx">
              {tx._id.substring(0, 12)}...
            </li>
          );
        })}
      </>
    ) : (
      ""
    );
    // console.log(pending);
  }

  function onMine() {
    dispatch(minePending());
  }

  return (
    <section className="container miner-hub-page">
      <form className="pending-container">
        <label>
          Pending:
          <ul>{showPending()}</ul>
        </label>

        <button onClick={() => onMine()}>mine</button>
      </form>
    </section>
  );
};
