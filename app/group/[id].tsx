import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { ArrowLeft, MessageCircle, Users } from 'lucide-react-native';

// Mock data for group details
export const groupDetails = {
  '1': {
    id: '1',
    name: 'Tech Enthusiasts',
    description: 'A community of tech lovers discussing the latest in technology, from AI to quantum computing.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800',
    members: [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400',
        status: 'online',
        lastActive: 'now',
        role: 'admin'
      },
      {
        id: '2',
        name: 'Marcus Johnson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400',
        status: 'online',
        lastActive: '2m ago',
        role: 'member'
      },
      {
        id: '3',
        name: 'Elena Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400',
        status: 'away',
        lastActive: '1h ago',
        role: 'member'
      },
      {
        id: '4',
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400',
        status: 'offline',
        lastActive: '3h ago',
        role: 'member'
      }
    ],
    activeDiscussions: 3,
    totalMembers: 128
  },
  '2': {
    id: '2',
    name: 'Climate Action',
    description: 'Discussing environmental issues and solutions for a sustainable future.',
    image: 'https://images.unsplash.com/photo-1498925008800-019c7d59d903?auto=format&fit=crop&w=800',
    members: [
      {
        id: '5',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400',
        status: 'online',
        lastActive: 'now',
        role: 'admin'
      },
      {
        id: '6',
        name: 'James Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400',
        status: 'away',
        lastActive: '30m ago',
        role: 'member'
      }
    ],
    activeDiscussions: 5,
    totalMembers: 256
  }
};

export default function GroupScreen() {
  const { id } = useLocalSearchParams();
  const group = groupDetails[id as keyof typeof groupDetails];

  if (!group) {
    return (
      <View style={styles.container}>
        <Text>Group not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => (
            <Link href="/" asChild>
              <Pressable style={styles.backButton}>
                <ArrowLeft size={24} color="#000" />
              </Pressable>
            </Link>
          ),
          title: group.name,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{ uri: group.image }} style={styles.coverImage} />
          <View style={styles.headerContent}>
            <Text style={styles.description}>{group.description}</Text>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <Users size={20} color="#666" />
                <Text style={styles.statText}>{group.totalMembers} members</Text>
              </View>
              <Link href={`/group/${id}/discussions`} asChild>
                <Pressable style={styles.stat}>
                  <MessageCircle size={20} color="#666" />
                  <Text style={styles.statText}>{group.activeDiscussions} active discussions</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Members</Text>
          {group.members.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <Image source={{ uri: member.avatar }} style={styles.avatar} />
                <View style={[styles.statusIndicator, { backgroundColor: member.status === 'online' ? '#34D399' : member.status === 'away' ? '#FBBF24' : '#9CA3AF' }]} />
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberStatus}>
                    {member.status === 'online' ? 'Active now' : `Last active ${member.lastActive}`}
                  </Text>
                </View>
              </View>
              {member.role === 'admin' && (
                <View style={styles.adminBadge}>
                  <Text style={styles.adminText}>Admin</Text>
                </View>
              )}
            </View>
          ))}
        </View>
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
  backButton: {
    marginLeft: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  headerContent: {
    padding: 20,
  },
  description: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    gap: 24,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 30,
  },
  memberDetails: {
    marginLeft: 16,
  },
  memberName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  memberStatus: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  adminBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  adminText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#4B5563',
  },
});