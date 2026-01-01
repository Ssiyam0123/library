import { View, FlatList, ActivityIndicator, Text } from "react-native";
import BookReviewCard from "../../components/BookReviewCard";
import { useBooks } from "../../hooks/useBooks.jsx";

export default function Index() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useBooks();

  const books = data?.pages.flatMap((page) => page.books) ?? [];
  console.log(books);

  if (isLoading) {
    return <ActivityIndicator size="large" className="mt-10" />;
  }
  console.log(isFetchingNextPage);
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BookReviewCard book={item} />}
        onEndReached={() => {
          console.log("END REACHED");
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" className="my-4" />
          ) : null
        }
      />
    </View>
  );
}
