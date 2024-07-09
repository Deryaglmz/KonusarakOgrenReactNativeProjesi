import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (state.favorites.length < 10) {
        state.favorites.push(action.payload);
        (async () => {
          await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
        })();
      } else {
        Alert.alert(
          'Favori karakter ekleme sayısını aştınız',
          'Başka bir karakteri favorilerden çıkarmalısınız.'
        );
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(character => character.id !== action.payload.id);
      (async () => {
        await AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
      })();
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload || [];
    },
  },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;

export const loadFavoritesFromStorage = () => async dispatch => {
  const favorites = await AsyncStorage.getItem('favorites');
  if (favorites) {
    dispatch(loadFavorites(JSON.parse(favorites)));
  }
};

export default favoritesSlice.reducer;
