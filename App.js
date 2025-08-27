import React, { useState } from 'react';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'home' && (
        <HomeScreen
          goToDetail={(id) => {
            setSelectedId(id);
            setCurrentScreen('detail');
          }}
        />
      )}
      {currentScreen === 'detail' && (
        <DetailScreen
          productId={selectedId}
          goBack={() => setCurrentScreen('home')}
        />
      )}
    </View>
  );
}
