import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { Menu, Provider, Divider } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchType, setSearchType] = useState('episodes');
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    if (searchType === 'episodes') {
      fetchEpisodes();
    } else if (searchType === 'characters') {
      fetchCharacters();
    }
  }, [page, search, searchType]);

  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode`, {
        params: {
          page,
          name: search,
        },
      });
      setEpisodes(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character`, {
        params: {
          page,
          name: search,
        },
      });
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToFavorites = () => {
    navigation.navigate('Favorites');
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderEpisodeItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EpisodeDetail', { episodeId: item.id })}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCharacterItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EpisodeDetail', { episodeId: item.id })}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={searchType === 'episodes' ? fetchEpisodes : fetchCharacters}
          />
          <TouchableOpacity style={styles.favoritesButton} onPress={navigateToFavorites}>
            <Ionicons name="md-star" size={38} color="#faf702" />
          </TouchableOpacity>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
                <Ionicons name="md-menu" size={32} color="black" />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => setSearchType('episodes')}
              title="Bölümler"
              titleStyle={styles.menuItemTitle}
            />
            <Divider />
            <Menu.Item
              onPress={() => setSearchType('characters')}
              title="Karakterler"
              titleStyle={styles.menuItemTitle}
            />
          </Menu>
        </View>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        <FlatList
          data={searchType === 'episodes' ? episodes : characters}
          keyExtractor={item => item.id.toString()}
          renderItem={searchType === 'episodes' ? renderEpisodeItem : renderCharacterItem}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 18,
  },
  item: {
    backgroundColor: '#AEDEF0',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoritesButton: {
    marginLeft: 10,
  },
  menuButton: {
    marginLeft: 10,
  },
  menuItemTitle: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;
