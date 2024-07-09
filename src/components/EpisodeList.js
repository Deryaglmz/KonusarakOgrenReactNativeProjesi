import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const EpisodeList = ({ episodes, onEpisodePress }) => {
  const renderEpisode = ({ item }) => (
    <TouchableOpacity onPress={() => onEpisodePress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={episodes}
      renderItem={renderEpisode}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default EpisodeList;