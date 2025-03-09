import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { ArrowLeft, MessageCircle, Clock, Users } from 'lucide-react-native';
import { format } from 'date-fns';
import { groupDetails } from '../[id]';

// Mock data for discussions
const groupDiscussions = {
  '1': [
    {
      id: '1',
      articleTitle: 'OpenAI Announces GPT-5: A New Era in Artificial Intelligence',
      articleImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800',
      excerpt: 'The latest iteration of GPT brings unprecedented capabilities in natural language understanding and generation...',
      lastActive: new Date(),
      participants: 12,
      comments: 45,
      source: 'TechCrunch',
    },
    {
      id: '2',
      articleTitle: 'Quantum Computing Breakthrough: Google Claims Quantum Supremacy 2.0',
      articleImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800',
      excerpt: "Google's latest quantum computer has achieved a milestone by solving a problem that would take classical computers millions of years...",
      lastActive: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      participants: 8,
      comments: 23,
      source: 'Nature',
    },
    {
      id: '3',
      articleTitle: 'The Rise of Edge Computing: Transforming IoT Architecture',
      articleImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800',
      excerpt: 'Edge computing is revolutionizing how IoT devices process and transmit data, leading to faster response times and reduced bandwidth usage...',
      lastActive: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      participants: 15,
      comments: 37,
      source: 'Wired',
    },
  ],
  '2': [
    {
      id: '1',
      articleTitle: 'Global Carbon Emissions Hit Record Low During Renewable Energy Surge',
      articleImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800',
      excerpt: 'Renewable energy adoption reaches unprecedented levels, leading to significant drop in global carbon emissions...',
      lastActive: new Date(),
      participants: 24,
      comments: 89,
      source: 'Reuters',
    },
    {
      id: '2',
      articleTitle: 'Ocean Cleanup Project Removes 100,000 Tons of Plastic',
      articleImage: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800',
      excerpt: 'Revolutionary ocean cleanup system exceeds expectations in removing plastic waste from the Pacific Ocean...',
      lastActive: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      participants: 18,
      comments: 56,
      source: 'National Geographic',
    },
  ],
};

export default function GroupDiscussionsScreen() {
  const { id } = useLocalSearchParams();
  const discussions = groupDiscussions[id as keyof typeof groupDiscussions] || [];
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
            <Link href={`/group/${id}`} asChild>
              <Pressable style={styles.backButton}>
                <ArrowLeft size={24} color="#000" />
              </Pressable>
            </Link>
          ),
          title: 'Discussions',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Active Discussions</Text>
          <Text style={styles.subtitle}>Join the conversation on trending news</Text>
        </View>

        {discussions.map((discussion) => (
          <Link key={discussion.id} href={`/discussion/${discussion.id}`} asChild>
            <Pressable style={styles.discussionCard}>
              <Image source={{ uri: discussion.articleImage }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <View style={styles.sourceContainer}>
                  <Text style={styles.source}>{discussion.source}</Text>
                </View>
                <Text style={styles.articleTitle}>{discussion.articleTitle}</Text>
                <Text style={styles.articleExcerpt} numberOfLines={2}>
                  {discussion.excerpt}
                </Text>
                <View style={styles.stats}>
                  <View style={styles.stat}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.statText}>
                      {format(discussion.lastActive, "MMM d, h:mm a")}
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.stat}>
                    <Users size={16} color="#666" />
                    <Text style={styles.statText}>
                      {discussion.participants} participating
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.stat}>
                    <MessageCircle size={16} color="#666" />
                    <Text style={styles.statText}>
                      {discussion.comments} comments
                    </Text>
                  </View>
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
  backButton: {
    marginLeft: 16,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 28,
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  discussionCard: {
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
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleContent: {
    padding: 16,
  },
  sourceContainer: {
    marginBottom: 8,
  },
  source: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
  articleTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleExcerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 8,
  },
  statText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#666',
  },
});