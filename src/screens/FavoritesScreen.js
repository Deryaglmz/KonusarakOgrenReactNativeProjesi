import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/slices/favoriteSlice';

const FavoritesScreen = () => {
  const favorites = useSelector(state => state.favorites.favorites); // Buraya dikkat!
  const dispatch = useDispatch();

  const handleRemoveFavorite = (character) => {
    Alert.alert(
      'Favori Kaldır',
      `${character.name} adlı karakteri favorilerinizden kaldırmak istediğinize emin misiniz?`,
      [
        {
          text: "Hayır",
          style: "cancel"
        },
        { text: "Evet", onPress: () => dispatch(removeFavorite(character)) }
      ]
    );
  };

  const renderFavorite = ({ item }) => (
    <View style={styles.favoriteContainer}>
      <Text style={styles.favoriteText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
        <Text style={styles.removeButtonText}>SİL</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesText}>Favori karakter bulunmamaktadır.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavorite}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  favoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#AEDEF0',
    padding: 12,
    borderRadius: 8,
  },
  favoriteText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
