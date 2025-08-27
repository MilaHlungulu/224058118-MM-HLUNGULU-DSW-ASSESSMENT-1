import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function HomeScreen({ goToDetail }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => goToDetail(item.id)}>
          <Image source={{ uri: item.image }} style={styles.thumbnail} />
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, margin: 8, borderWidth: 1, borderRadius: 10, borderColor: '#ccc', alignItems: 'center' },
  thumbnail: { width: 100, height: 100, resizeMode: 'contain' },
  title: { marginTop: 5, textAlign: 'center' },
});
