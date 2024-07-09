import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { getEpisodeDetails, getCharacterDetails } from '../api/api';
import CharacterCard from '../components/CharacterCard';

const EpisodeDetailScreen = ({ route, navigation }) => {
  const { episodeId } = route.params;
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEpisodeDetails();
  }, [episodeId]);

  const fetchEpisodeDetails = async () => {
    setLoading(true);
    try {
      const response = await getEpisodeDetails(episodeId);
      setEpisode(response.data);

      const characterPromises = response.data.characters.map(url => {
        const characterId = url.split('/').pop();
        return getCharacterDetails(characterId);
      });
      const characterResponses = await Promise.all(characterPromises);
      setCharacters(characterResponses.map(res => res.data));
      setTotalPages(Math.ceil(characterResponses.length / 10));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderCharacter = ({ item }) => (
    <CharacterCard
      character={item}
      onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}
    />
  );

  const paginateCharacters = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return characters.slice(startIndex, endIndex);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      {episode && (
        <>
          <Text style={styles.episodeName}>{episode.name}</Text>
          <Text style={styles.airDate}>Air Date: {episode.air_date}</Text>
          <FlatList
            data={paginateCharacters()}
            renderItem={renderCharacter}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListFooterComponent={
              <View style={styles.paginationContainer}>
                <TouchableOpacity
                  onPress={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  <Text style={page === 1 ? styles.disabledButton : styles.button}>Previous</Text>
                </TouchableOpacity>
                <Text>{page} / {totalPages}</Text>
                <TouchableOpacity
                  onPress={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  <Text style={page === totalPages ? styles.disabledButton : styles.button}>Next</Text>
                </TouchableOpacity>
              </View>
            }
          />
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
  episodeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  airDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    fontSize: 16,
    color: '#007bff',
  },
  disabledButton: {
    fontSize: 16,
    color: '#f53b3b',
  },
});

export default EpisodeDetailScreen;
