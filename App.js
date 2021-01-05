import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const Logo = () => {
  return <Text>Custom Header</Text>;
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title='Go to detail'
        onPress={() => navigation.navigate('Detail', { data: 'Hello World', userId: 2 })}
      />
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: <Logo />,
  headerStyle: {
    backgroundColor: '#f00',
  },
};

const DetailScreen = ({ navigation }) => {
  const data = navigation.getParam('data', 'default value');
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    navigation.setParams({ increment });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
      <Text>{count}</Text>
      <Button title='Go home' onPress={() => navigation.goBack()} />
      <Button
        title='Load data'
        onPress={() =>
          navigation.setParams({
            userId: 10,
          })
        }
      />
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation, navigationOptions }) => {
  const userId = navigation.getParam('userId');
  const bgColor = navigationOptions.headerStyle.backgroundColor;

  return {
    title: `${userId} - Detail`,
    headerStyle: {
      backgroundColor: bgColor,
    },
    headerRight: () => <Button title='+ 1' onPress={navigation.getParam('increment')} />,
  };
};

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Detail: {
      screen: DetailScreen,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fec',
      },
      headerTintColor: '#555',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRightContainerStyle: {
        padding: 20,
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return <AppContainer />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
