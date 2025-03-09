import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const groups = [
  {
    id: '1',
    name: 'Tech Enthusiasts',
    members: 128,
    lastActive: '2 min ago',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800',
  },
  {
    id: '2',
    name: 'Climate Action',
    members: 256,
    lastActive: '5 min ago',
    image: 'https://images.unsplash.com/photo-1498925008800-019c7d59d903?auto=format&fit=crop&w=800',
  },
  {
    id: '3',
    name: 'Global Politics',
    members: 184,
    lastActive: '12 min ago',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800',
  },
];

export default function GroupsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Groups</Text>
          <Text style={styles.subtitle}>Join discussions with like-minded readers</Text>
        </View>

        {groups.map((group) => (
          <Link key={group.id} href={`/group/${group.id}`} asChild>
            <Pressable style={styles.groupCard}>
              <Image source={{ uri: group.image }} style={styles.groupImage} />
              <View style={styles.groupContent}>
                <Text style={styles.groupName}>{group.name}</Text>
                <View style={styles.groupMeta}>
                  <Text style={styles.groupMembers}>{group.members} members</Text>
                  <Text style={styles.groupActive}>Active {group.lastActive}</Text>
                </View>
              </View>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#666',
  },
  groupCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: 100,
    height: 100,
  },
  groupContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  groupName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#000',
    marginBottom: 4,
  },
  groupMeta: {
    gap: 4,
  },
  groupMembers: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  groupActive: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
});