import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
      <Button title='Load data' onPress={() => navigation.navigate('MyModal')} />
    </View>
  );
};

DetailScreen.navigationOptions = ({ navigation }) => {
  return {
    title: `Loading...`,
    headerRight: () => <Button title='+ 1' onPress={navigation.getParam('increment')} />,
  };
};

const AppNavigator = createBottomTabNavigator(
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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={20} tintColor={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: navigation.state.routeName === 'Home' ? '#e91e63' : 'orange',
        inactiveTintColor: '#000',
        labelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: '#fec',
        },
      },
    }),
  },
);

const RootStack = createStackNavigator(
  {
    Main: AppNavigator,
    MyModal: {
      screen: () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>My Modal Screen</Text>
        </View>
      ),
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(RootStack);

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
