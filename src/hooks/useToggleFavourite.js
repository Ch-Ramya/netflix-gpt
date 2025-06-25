// hooks/useToggleFavourite.js
import { useDispatch, useSelector } from "react-redux";
import { saveUserFavourites } from "../utils/firestore";
import { addToFavourites, removeFromFavourites } from "../utils/userSlice";

const useToggleFavourite = (movieDetails) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const favourites = user?.favourites || [];
  const isFavourite = favourites.some((item) => item.id === movieDetails?.id);

  const toggleFavourite = async () => {
    if (!movieDetails || !user?.uid) return;

    let updatedFavourites = [];

    if (isFavourite) {
      dispatch(removeFromFavourites({ id: movieDetails.id }));
      updatedFavourites = favourites.filter(
        (item) => item.id !== movieDetails.id
      );
    } else {
      dispatch(addToFavourites(movieDetails));
      updatedFavourites = [...favourites, movieDetails];
    }

    await saveUserFavourites(user.uid, updatedFavourites);
  };

  return { isFavourite, toggleFavourite };
};

export default useToggleFavourite;
