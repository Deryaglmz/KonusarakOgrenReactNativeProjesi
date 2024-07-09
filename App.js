import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import EpisodesScreen from './src/screens/EpisodesScreen';
import EpisodeDetailScreen from './src/screens/EpisodeDetailScreen';
import CharacterDetailScreen from './src/screens/CharacterDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Episodes" component={EpisodesScreen} />
          <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
