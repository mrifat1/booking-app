import { Image, StyleSheet, Platform, View, Text, TextInput, FlatList, SafeAreaView } from 'react-native';
import { Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Hospital } from '@/types';
import { useAuth } from '@/context/AuthContext';
import EmptyState from '@/components/EmptyState';
import HospitalCard from '@/components/HospitalCard';
import apiService from '@/services/api';
import LoadingIndicator from '@/components/LoadingIndicator';


export default function HospitalsScreen() {
  const { user } = useAuth();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await apiService.fetchHospitals();
        setHospitals(data);
        setFilteredHospitals(data);
      } catch (err) {
        setError('Failed to load hospitals. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredHospitals(hospitals);
    } else {
      const filtered = hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.services.some(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredHospitals(filtered);
    }
  }, [searchQuery, hospitals]);

  if (loading) {
    return <LoadingIndicator message="Loading hospitals..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        message={error}
      />
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name || 'User'}!</Text>
        <Text style={styles.title}>Find Hospitals</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search hospitals or services"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {filteredHospitals.length === 0 ? (
        <EmptyState
          title="No hospitals found"
          message={searchQuery ? `No results for "${searchQuery}"` : "No hospitals available at the moment."}
        />
      ) : (
        <FlatList
          data={filteredHospitals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HospitalCard hospital={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#2E384D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -16,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#333',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});
