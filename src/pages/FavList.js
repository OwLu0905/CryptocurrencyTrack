import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchFavData, sendFavData } from "../api/facAction";
import { favActions } from "../api/favSlice";

const FavList = () => {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.fav);
  // useEffect(() => {
  //   dispatch(fetchFavData());
  // }, [dispatch]);
  console.log(favItems);
  useEffect(() => {
    dispatch(sendFavData(favItems));
  }, [dispatch, favItems]);
  return <div>FavList</div>;
};

export default FavList;
