import { Button } from "@/components/ui/Button";
import Tweet from "@/components/Tweet";
import { Tweeter } from "@/components/Tweeter";
import { FlashList } from "@shopify/flash-list";

import { Text, SafeAreaView, View, Dimensions, Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Menu } from "@/components/Menu";

interface FeedEntry {
  id: string;
  link?: string;
  title?: string;
  description?: string;
  published?: string;
}

interface FeedData {
  link?: string;
  title?: string;
  description?: string;
  generator?: string;
  language?: string;
  published?: string;
  entries?: Array<FeedEntry>;
}

export default function HomeScreen() {
  const { data: rssFeed, isLoading } = useQuery({
    queryKey: ["el-rss"],
    queryFn: () => {
      return fetch(
        "/api/rss?feed=https://www.omnycontent.com/d/playlist/f7f86f6a-2fbd-4ac7-ab53-b01900e5d187/29a40f8a-f647-4a82-b434-b03f00cd7866/638fd98e-8c28-49db-9cab-b03f00cd788c/podcast.rss",
      ).then((res) => res.json() as FeedData);
    },
  });

  const tweets =
    rssFeed?.entries?.map((entry) => ({
      id: entry.id,
      authorName: entry.title ?? "",
      authorHandle: rssFeed.title ?? "",
      content: entry.description ?? "",
      date: entry.published ?? "",
      link: entry.link,
    })) ??
    Array(10)
      .fill(null)
      .map(() => ({
        id: String(Math.random()),
        authorName: "Hollow",
        authorHandle: "@DougByte",
        content: "Xablau \\o/ [img](https://picsum.photos/seed/696/3000/2000)",
        date: new Date().toISOString(),
      }));

  return (
    <SafeAreaView className="d flex-1 bg-background" collapsable={false}>
      <View className="mx-auto flex-row p-4 pt-12">
        <Menu />

        <View role="main" className="w-full max-w-[450px] gap-4">
          <View className="flex-row">
            <Button className="w-1/3" label="RSS" size="sm" />
            <Button
              className="w-1/3"
              label="Seguindo"
              variant="secondary"
              size="sm"
            />
            <Button
              className="w-1/3"
              label="Grupos"
              variant="secondary"
              size="sm"
            />
          </View>

          <Tweeter />

          <View
            className="h-[calc(100vh-46px)]"
            style={
              Platform.OS !== "web" && {
                height: Dimensions.get("screen").height - 256,
              }
            }
          >
            {isLoading && (
              <View className="mx-auto mt-64 h-16 w-16 animate-spin border-2" />
            )}
            {!isLoading && (
              <FlashList
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <Tweet {...item} />
                      {index === tweets.length - 1 && (
                        <View className="pb-64 pt-6">
                          <Text className="text-center">
                            As reclamações acabaram! 😱
                          </Text>
                          <Text className="text-center text-sm text-ring">
                            ou você está sem internet... 🦖
                          </Text>
                        </View>
                      )}
                    </>
                  );
                }}
                estimatedItemSize={200}
                data={tweets}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
