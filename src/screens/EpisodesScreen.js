import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Pagination from '../components/Pagination';

const EpisodesScreen = ({ navigation }) => {
  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
        setEpisodes(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisodes();
  }, [page]);

  const renderEpisode = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('EpisodeDetail', { episodeId: item.id })}>
      <Text style={styles.episode}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={episodes}
        renderItem={renderEpisode}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pagination page={page} setPage={setPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  episode: {
    fontSize: 16,
    color: '#1E90FF',
    marginBottom: 5,
  },
});

export default EpisodesScreen;
