import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import LoadingIndicator from '@/components/LoadingIndicator';
import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/context/AuthContext';
import apiService from '@/services/api';
import { Booking, Hospital, Service } from '@/types';

export default function BookingsScreen() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitalMap, setHospitalMap] = useState<Record<string, Hospital>>({});
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async (showRefresh = false) => {

    if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
    if (!user) return;
    
    try {
      const userBookings = await apiService.fetchUserBookings(user.id);
      setBookings(userBookings);
      
      const allHospitals = await apiService.fetchHospitals();
      const hospitalDictionary: Record<string, Hospital> = {};
      allHospitals.forEach(hospital => {
        hospitalDictionary[hospital.id] = hospital;
      });
      setHospitalMap(hospitalDictionary);
    } catch (err) {
      setError('Failed to load your bookings. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false)
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleRefresh = () => {
    fetchBookings(true);
  };

  const getServiceDetails = (hospitalId: string, serviceId: string): Service | undefined => {
    const hospital = hospitalMap[hospitalId];
    if (!hospital) return undefined;
    return hospital.services.find(service => service.id === serviceId);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return <LoadingIndicator message="Loading your bookings..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        message={error}
      />
    );
  }

  if (bookings.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Bookings</Text>
        </View>
        <EmptyState
          title="No bookings yet"
          message="You haven't made any bookings yet. Browse hospitals and services to make your first booking."
          icon={<Calendar size={64} color="#BBBBBB" />}
        />
      </SafeAreaView>
    );
  }

  const renderBookingCard = (item : Booking) => {
    const hospital = hospitalMap[item.hospitalId];
    const service = getServiceDetails(item.hospitalId, item.serviceId);
    
    if (!hospital || !service) return null;
        
    return (
        <View style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <View style={[styles.statusBadge, styles[`status${item.status}`]]}>
                <Text style={styles.statusText}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
            </View>
            </View>
            
            <View style={styles.bookingDetail}>
            <MapPin size={16} color="#4A90E2" />
            <Text style={styles.hospitalName}>{hospital.name}</Text>
            </View>
            
            <View style={styles.bookingDetail}>
            <Calendar size={16} color="#4A90E2" />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
            </View>
            
            <View style={styles.bookingDetail}>
            <Clock size={16} color="#4A90E2" />
            <Text style={styles.detailText}>{service.duration}</Text>
            </View>
            
            <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.price}>${service.price}</Text>
            </View>
        </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        style={{paddingBottom: 40}}
        renderItem={({ item }) => 
            renderBookingCard(item)
        }
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#4F86F7']}
              tintColor="#4F86F7"
            />
          }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2E384D',
  },
  listContent: {
    padding: 16,
  },
  bookingCard: {
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
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#2E384D',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statuspending: {
    backgroundColor: '#FFF9C4',
  },
  statusconfirmed: {
    backgroundColor: '#C8E6C9',
  },
  statuscancelled: {
    backgroundColor: '#FFCDD2',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  bookingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  hospitalName: {
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#555',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#555',
    marginRight: 4,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#4A90E2',
  },
});