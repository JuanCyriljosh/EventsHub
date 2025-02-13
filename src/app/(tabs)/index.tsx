import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // Function to handle Google sign-in
  const signInWithGoogle = async (role: 'Admin' | 'Student') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
        return;
      }

      // Once the user is authenticated, navigate based on role
      if (role === 'Admin') {
        router.replace('/AdminHomepage'); // Navigate to Admin page
      } else {
        router.replace('/StudentHomepage'); // Navigate to Student page
      }
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>NEU</Text>
      <Text style={styles.subtitle}>CAMPUS EVENTS HUB</Text>

      <View style={styles.separator} />

      <Text style={styles.loginText}>Log in as:</Text>

      {/* Administrator Login */}
      <TouchableOpacity style={styles.button} onPress={() => signInWithGoogle('Admin')}>
        <Text style={styles.buttonText}>Administrator</Text>
      </TouchableOpacity>

      {/* Student Login */}
      <TouchableOpacity style={styles.button} onPress={() => signInWithGoogle('Student')}>
        <Text style={styles.buttonText}>Student</Text>
      </TouchableOpacity>

      <Text style={styles.authText}>Authenticated by Google</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Dark background
    padding: 20,
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  separator: {
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  authText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 20,
  },
});
