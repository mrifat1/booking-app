import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MapPin, Star, ArrowLeft, Calendar, Clock } from 'lucide-react-native';
import LoadingIndicator from '@/components/LoadingIndicator';
import ServiceCard from '@/components/ServiceCard';
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import apiService from '@/services/api';
import { Hospital, Service } from '@/types';
import BookingConfirmationModal from '@/components/BookingConfirmationModal';

export default function HospitalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchHospitalDetail = async () => {
      if (!id) return;
      
      try {
        const data = await apiService.fetchHospitalById(id);
        if (data) {
          setHospital(data);
        } else {
          setError('Hospital not found');
        }
      } catch (err) {
        setError('Failed to load hospital details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetail();
  }, [id]);

  const handleBookService = (service: Service) => {
    setSelectedService(service);
    setShowConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    if (!user || !hospital || !selectedService) return;
    
    setBookingInProgress(true);
    
    try {
      const booking = await apiService.createBooking({
        userId: user.id,
        hospitalId: hospital.id,
        serviceId: selectedService.id,
        date: new Date().toISOString(),
        status: 'confirmed'
      });
      
      setShowConfirmation(false);
      
      Alert.alert(
        "Booking Confirmed",
        `Your appointment for ${selectedService.name} at ${hospital.name} has been confirmed.`,
        [
          { 
            text: "View My Bookings", 
            onPress: () => router.push('/bookings') 
          },
          {
            text: "OK",
            onPress: () => setSelectedService(null)
          }
        ]
      );
    } catch (err) {
      Alert.alert("Error", "Failed to book service. Please try again later.");
      console.error(err);
    } finally {
      setBookingInProgress(false);
    }
  };

  if (loading) {
    return <LoadingIndicator message="Loading hospital details..." />;
  }

  if (error || !hospital) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Hospital not found'}</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: hospital.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{hospital.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FFD700" />
            <Text style={styles.rating}>{hospital.rating.toFixed(1)}</Text>
          </View>
          
          <View style={styles.addressContainer}>
            <MapPin size={16} color="#4A90E2" />
            <Text style={styles.address}>{hospital.address}</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Available Services</Text>
          
          {hospital.services.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onBookService={handleBookService}
            />
          ))}
        </View>
      </ScrollView>

      <BookingConfirmationModal
        visible={showConfirmation}
        onCancel={() => setShowConfirmation(false)}
        onConfirm={handleConfirmBooking}
        service={selectedService}
        hospital={hospital}
        loading={bookingInProgress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2E384D',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#555',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  address: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#555',
    flex: 1,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#2E384D',
    marginBottom: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: '#E53935',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#2E384D',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2E384D',
    marginBottom: 4,
  },
  hospitalName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#555',
    marginBottom: 16,
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#555',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#555',
    marginRight: 8,
  },
  price: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#4A90E2',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 2,
    marginLeft: 8,
  },
});