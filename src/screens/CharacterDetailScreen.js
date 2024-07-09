import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/slices/favoriteSlice';
import { getCharacterDetails } from '../api/api';

const CharacterDetailScreen = ({ route, navigation }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      try {
        const response = await getCharacterDetails(characterId);
        setCharacter(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while fetching character details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  const handleAddFavorite = () => {
    dispatch(addFavorite(character));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(character));
  };

  const isFavorite = favorites.some(fav => fav.id === characterId);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {character && (
        <>
          <Text style={styles.characterName}>{character.name}</Text>
          <Text>Status: {character.status}</Text>
          <Text>Species: {character.species}</Text>
          <Text>Gender: {character.gender}</Text>
          <View style={styles.buttonContainer}>
            {isFavorite ? (
              <TouchableOpacity
                style={[styles.favoriteButton, { backgroundColor: '#f53b3b' }]}
                onPress={handleRemoveFavorite}
              >
                <Text style={[styles.buttonText, { color: '#fff' }]}>Remove from Favorites</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.favoriteButton, { backgroundColor: '#aedef0' }]}
                onPress={handleAddFavorite}
              >
                <Text style={[styles.buttonText, { color: '#000' }]}>Add to Favorites</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#dfecf0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  favoriteButton: {
    backgroundColor: '#f53b3b',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CharacterDetailScreen;
