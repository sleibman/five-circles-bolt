import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { MessageCircle, Bookmark } from 'lucide-react-native';

const savedArticles = [
  {
    id: '1',
    title: 'The Rise of Sustainable Architecture',
    excerpt: 'How architects are revolutionizing building design with eco-friendly materials...',
    savedDate: '2 days ago',
    commentCount: 45,
  },
  {
    id: '2',
    title: 'Space Tourism: The Next Frontier',
    excerpt: 'Private companies are making space travel accessible to civilians...',
    savedDate: '5 days ago',
    commentCount: 32,
  },
];

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Saved Stories</Text>
          <Text style={styles.subtitle}>Articles you've bookmarked for later</Text>
        </View>

        {savedArticles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`} asChild>
            <Pressable style={styles.articleCard}>
              <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
                <View style={styles.articleMeta}>
                  <View style={styles.metaLeft}>
                    <Bookmark size={16} color="#666" />
                    <Text style={styles.savedDate}>Saved {article.savedDate}</Text>
                  </View>
                  <View style={styles.commentContainer}>
                    <MessageCircle size={16} color="#666" />
                    <Text style={styles.commentCount}>{article.commentCount}</Text>
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
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    marginBottom: 8,
    color: '#000',
  },
  articleExcerpt: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  savedDate: {
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