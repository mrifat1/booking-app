import { Hospital, Booking } from '@/types';

// Mock Hospital Data
export const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    address: 'Badda, Dhaka',
    imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipOWGgnxY-f5_3WUqoTIghmd-fT4FHscdL9Bp76W=s680-w680-h510',
    rating: 4.5,
    services: [
      {
        id: '101',
        name: 'General Consultation',
        description: 'Comprehensive check-up with a general physician',
        price: 100,
        duration: '30 min'
      },
      {
        id: '102',
        name: 'Blood Test',
        description: 'Complete blood count analysis',
        price: 50,
        duration: '15 min'
      },
      {
        id: '103',
        name: 'X-Ray',
        description: 'Diagnostic imaging service',
        price: 120,
        duration: '20 min'
      }
    ]
  },
  {
    id: '2',
    name: 'Square Hospital ltd',
    address: 'Panthapath, Dhaka',
    imageUrl: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg',
    rating: 4.8,
    services: [
      {
        id: '201',
        name: 'Specialist Consultation',
        description: 'Appointment with medical specialist',
        price: 150,
        duration: '45 min'
      },
      {
        id: '202',
        name: 'Physical Therapy',
        description: 'Therapeutic exercises for rehabilitation',
        price: 80,
        duration: '60 min'
      },
      {
        id: '203',
        name: 'Nutritional Counseling',
        description: 'Personalized dietary advice',
        price: 90,
        duration: '45 min'
      }
    ]
  },
  {
    id: '3',
    name: 'Community Health Clinic',
    address: 'Mirpur 2, Dhaka',
    imageUrl: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg',
    rating: 4.2,
    services: [
      {
        id: '301',
        name: 'Vaccination',
        description: 'Routine immunization services',
        price: 40,
        duration: '10 min'
      },
      {
        id: '302',
        name: 'Mental Health Counseling',
        description: 'Therapy session with mental health professional',
        price: 110,
        duration: '50 min'
      },
      {
        id: '303',
        name: 'Allergy Testing',
        description: 'Comprehensive allergy panel tests',
        price: 130,
        duration: '30 min'
      }
    ]
  },
  {
    id: '4',
    name: 'Advanced Diagnostic Center',
    address: 'Uttara, Dhaka',
    imageUrl: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg',
    rating: 4.7,
    services: [
      {
        id: '401',
        name: 'MRI Scan',
        description: 'Magnetic resonance imaging',
        price: 350,
        duration: '45 min'
      },
      {
        id: '402',
        name: 'Ultrasound',
        description: 'Diagnostic ultrasound imaging',
        price: 180,
        duration: '30 min'
      },
      {
        id: '403',
        name: 'Cardiac Stress Test',
        description: 'Evaluation of heart function during exercise',
        price: 220,
        duration: '60 min'
      }
    ]
  }
];

export const bookings: Booking[] = [];

export const addBooking = (booking: Omit<Booking, 'id'>): Booking => {
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
  };
  bookings.push(newBooking);
  return newBooking;
};