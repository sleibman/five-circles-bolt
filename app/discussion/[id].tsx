import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { ArrowLeft, Heart, Share, MessageCircle } from 'lucide-react-native';
import { format } from 'date-fns';

// Mock data for discussions
const discussionData = {
  '1': {
    id: '1',
    articleTitle: 'OpenAI Announces GPT-5: A New Era in Artificial Intelligence',
    articleImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800',
    source: 'TechCrunch',
    publishDate: new Date(),
    content: 'OpenAI has unveiled GPT-5, marking a significant leap forward in artificial intelligence capabilities. The new model demonstrates unprecedented abilities in reasoning, creativity, and understanding context, potentially revolutionizing how we interact with AI systems.',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400',
      role: 'Tech Editor',
    },
    likes: 234,
    shares: 89,
    comments: [
      {
        id: '1',
        user: {
          name: 'Marcus Johnson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400',
        },
        content: 'This is fascinating! The implications for healthcare and scientific research are enormous.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        likes: 45,
        replies: [
          {
            id: '1.1',
            user: {
              name: 'Elena Rodriguez',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400',
            },
            content: 'Absolutely! I work in medical research and we are already exploring ways to integrate this into our diagnostic processes.',
            timestamp: new Date(Date.now() - 1000 * 60 * 25),
            likes: 28,
          },
        ],
      },
      {
        id: '2',
        user: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400',
        },
        content: 'While the advancements are impressive, we need to carefully consider the ethical implications and potential biases in the system.',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        likes: 67,
        replies: [],
      },
    ],
  },
  // Add more discussion data as needed
};

function Comment({ comment, depth = 0 }) {
  return (
    <View style={[styles.comment, { marginLeft: depth * 20 }]}>
      <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{comment.user.name}</Text>
          <Text style={styles.commentTime}>
            {format(comment.timestamp, 'MMM d, h:mm a')}
          </Text>
        </View>
        <Text style={styles.commentText}>{comment.content}</Text>
        <View style={styles.commentActions}>
          <Pressable style={styles.commentAction}>
            <Heart size={16} color="#666" />
            <Text style={styles.actionText}>{comment.likes}</Text>
          </Pressable>
          <Pressable style={styles.commentAction}>
            <MessageCircle size={16} color="#666" />
            <Text style={styles.actionText}>Reply</Text>
          </Pressable>
        </View>
        {comment.replies?.map((reply) => (
          <Comment key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </View>
    </View>
  );
}

export default function DiscussionScreen() {
  const { id } = useLocalSearchParams();
  const discussion = discussionData[id as keyof typeof discussionData];

  if (!discussion) {
    return (
      <View style={styles.container}>
        <Text>Discussion not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => (
            <Link href=".." asChild>
              <Pressable style={styles.backButton}>
                <ArrowLeft size={24} color="#000" />
              </Pressable>
            </Link>
          ),
          title: 'Discussion',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: discussion.articleImage }} style={styles.articleImage} />
        <View style={styles.content}>
          <View style={styles.sourceContainer}>
            <Text style={styles.source}>{discussion.source}</Text>
            <Text style={styles.date}>
              {format(discussion.publishDate, 'MMM d, yyyy')}
            </Text>
          </View>
          <Text style={styles.title}>{discussion.articleTitle}</Text>
          <View style={styles.authorContainer}>
            <Image source={{ uri: discussion.author.avatar }} style={styles.authorAvatar} />
            <View>
              <Text style={styles.authorName}>{discussion.author.name}</Text>
              <Text style={styles.authorRole}>{discussion.author.role}</Text>
            </View>
          </View>
          <Text style={styles.articleContent}>{discussion.content}</Text>
          <View style={styles.articleActions}>
            <Pressable style={styles.action}>
              <Heart size={20} color="#666" />
              <Text style={styles.actionText}>{discussion.likes}</Text>
            </Pressable>
            <Pressable style={styles.action}>
              <Share size={20} color="#666" />
              <Text style={styles.actionText}>{discussion.shares}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Discussion</Text>
          <View style={styles.commentInput}>
            <TextInput
              placeholder="Add to the discussion..."
              style={styles.input}
              multiline
            />
            <Pressable style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Post</Text>
            </Pressable>
          </View>
          {discussion.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
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
  articleImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  source: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
  date: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#111827',
    lineHeight: 32,
    marginBottom: 16,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  authorRole: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  articleContent: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 20,
  },
  articleActions: {
    flexDirection: 'row',
    gap: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  commentsSection: {
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  commentsTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 16,
  },
  commentInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#111827',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  submitButtonText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  commentAuthor: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    color: '#111827',
  },
  commentTime: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  commentText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  commentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});