import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    paddingHorizontal: 3,
    backgroundColor: '#553c9a',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 7,
    borderRadius: 8,
    transform: [{
      rotateX: ('10deg')
    }],
  },
  button: {
    backgroundColor: '#6156ad',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transform: [{
      rotateX: ('10deg')
    }],
  }
});