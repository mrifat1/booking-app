import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { Hospital } from '@/types';

interface HospitalCardProps {
  hospital: Hospital;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital }) => {

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: hospital.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{hospital.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={16} color="#FFD700" />
          <Text style={styles.rating}>{hospital.rating.toFixed(1)}</Text>
        </View>
        <View style={styles.addressContainer}>
          <MapPin size={16} color="#4A90E2" />
          <Text style={styles.address} numberOfLines={1}>
            {hospital.address}
          </Text>
        </View>
        <Text style={styles.services}>
          {hospital.services.length} services available
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2E384D',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
    flex: 1,
  },
  services: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
});

export default HospitalCard;