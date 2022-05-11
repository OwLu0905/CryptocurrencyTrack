import { favActions } from "./favSlice";

export const fetchFavData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-demo-9f6d3-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch fav data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const favData = await fetchData();
      dispatch(
        favActions.replaceFavItem({
          items: favData.items || [],
        })
      );
    } catch (error) {
      console.log("error");
    }
  };
};

export const sendFavData = (fav) => {
  return async (dispatch) => {
    const sendData = async () => {
      console.log(fav);
      const response = await fetch(
        'https://react-demo-9f6d3-default-rtdb.firebaseio.com/favCoins.json"',
        {
          method: "PUT",
          body: JSON.stringify({ items: fav.items }),
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Error");
      }
    };
    try {
      await sendData();
    } catch (error) {
      console.log("error");
    }
  };
};
