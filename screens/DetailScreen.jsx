import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView, Button } from 'react-native';

export default function DetailScreen({ productId, goBack }) {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(res => res.json())
      .then(data => setProductDetails(data));
  }, [productId]);

  if (!productDetails) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: productDetails.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{productDetails.title}</Text>
      <Text style={styles.productPrice}>${productDetails.price}</Text>
      <Text style={styles.productDescription}>{productDetails.description}</Text>
      <Button title="Back to Products" onPress={goBack} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, alignItems: 'center' },
  productImage: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 },
  productTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  productPrice: { fontSize: 16, color: '#008800', marginBottom: 15 },
  productDescription: { fontSize: 14, textAlign: 'center' },
});
