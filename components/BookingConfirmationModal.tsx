import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet 
} from 'react-native';
import { Calendar, Clock } from 'lucide-react-native';
import Button from '@/components/Button';
import { Service, Hospital } from '@/types';

type ConfirmationModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  service: Service | null;
  hospital: Hospital;
  loading?: boolean;
};

export default function BookingConfirmationModal({
  visible,
  onCancel,
  onConfirm,
  service,
  hospital,
  loading = false,
}: ConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Booking</Text>

          {service && (
            <>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.hospitalName}>{hospital.name}</Text>

              <View style={styles.bookingDetail}>
                <Calendar size={16} color="#4A90E2" />
                <Text style={styles.detailText}>Today</Text>
              </View>

              <View style={styles.bookingDetail}>
                <Clock size={16} color="#4A90E2" />
                <Text style={styles.detailText}>{service.duration}</Text>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Total:</Text>
                <Text style={styles.price}>${service.price}</Text>
              </View>

              <View style={styles.modalActions}>
                <Button
                  title="Cancel"
                  variant="outline"
                  onPress={onCancel}
                  style={styles.cancelButton}
                />
                <Button
                  title="Confirm Booking"
                  loading={loading}
                  onPress={onConfirm}
                  style={styles.confirmButton}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
