import { Button } from "@/components/ui/Button";
import Tweet from "@/components/Tweet";
import { Tweeter } from "@/components/Tweeter";
import { FlashList } from "@shopify/flash-list";

import { Text, SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  const tweets = Array(50)
    .fill(null)
    .map(() => ({
      id: String(Math.random()),
      authorName: "Hollow",
      authorHandle: "@DougByte",
      content: "Xablau \\o/ [img](https://picsum.photos/seed/696/3000/2000)",
    }));

  return (
    <SafeAreaView className="flex-1 gap-4 bg-background p-4 pt-12">
      <Tweeter />

      <View className="flex-1 flex-row">
        <Menu />

        <View className="flex-1">
          <FlashList
            className="overflow-visible"
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => {
              return index === tweets.length - 1 ? (
                <>
                  <Tweet {...item} />
                  <View className="pb-24 pt-6">
                    <Text className="text-center">
                      As reclamações acabaram! 😱
                    </Text>
                    <Text className="text-center text-sm text-ring">
                      ou você está sem internet... 🦖
                    </Text>
                  </View>
                </>
              ) : (
                <Tweet {...item} />
              );
            }}
            estimatedItemSize={200}
            data={tweets}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Menu() {
  return (
    <View className="absolute bottom-0 z-20 w-full flex-row justify-center border-t-2 bg-background pt-2 md:relative md:w-64 md:flex-col md:justify-start md:border-r-2 md:border-t-0 md:pr-2">
      <Button label="Início" />
      <Button variant="secondary" label="Perfil" />
      <Button variant="secondary" label="Notificações" />
      <Button variant="secondary" label="Caos" />
    </View>
  );
}
