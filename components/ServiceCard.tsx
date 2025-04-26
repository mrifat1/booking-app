import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Service } from '@/types';
import Button from './Button';

interface ServiceCardProps {
  service: Service;
  onBookService: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBookService }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.name}>{service.name}</Text>
        <Text style={styles.description}>{service.description}</Text>
        <View style={styles.details}>
          <Text style={styles.price}>${service.price}</Text>
          <Text style={styles.duration}>{service.duration}</Text>
        </View>
      </View>
      <Button 
        title="Book Now" 
        variant="primary"
        size="small"
        onPress={() => onBookService(service)}
        style={styles.bookButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  content: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2E384D',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
  },
  duration: {
    fontSize: 14,
    color: '#777',
  },
  bookButton: {
    alignSelf: 'flex-end',
  },
});

export default ServiceCard;