import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { format } from 'date-fns';

const articles = [
  {
    id: '1',
    title: 'The Future of AI in Healthcare: A Revolutionary Approach',
    excerpt: 'New developments in artificial intelligence are transforming how medical professionals diagnose and treat patients...',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800',
    author: 'Sarah Johnson',
    date: new Date(),
    commentCount: 12,
  },
  {
    id: '2',
    title: 'Global Climate Summit Reaches Historic Agreement',
    excerpt: 'World leaders have come together to sign a groundbreaking climate accord that promises to reshape environmental policy...',
    image: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?auto=format&fit=crop&w=800',
    author: 'Michael Chen',
    date: new Date(),
    commentCount: 28,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.date}>{format(new Date(), 'EEEE, MMMM d, yyyy')}</Text>
          <Text style={styles.title}>Today's Stories</Text>
        </View>

        {articles.map((article) => (
          <View key={article.id} style={styles.articleCard}>
            <Image source={{ uri: article.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
              <View style={styles.articleMeta}>
                <Text style={styles.articleAuthor}>{article.author}</Text>
                <Link href={`/discussion/${article.id}`} asChild>
                  <Pressable style={styles.commentContainer}>
                    <MessageCircle size={16} color="#666" />
                    <Text style={styles.commentCount}>{article.commentCount}</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
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
  date: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 32,
    color: '#000',
  },
  articleCard: {
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
  articleTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    marginBottom: 8,
    color: '#000',
  },
  articleExcerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: '#444',
    marginBottom: 12,
    lineHeight: 22,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleAuthor: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  commentCount: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#666',
  },
});