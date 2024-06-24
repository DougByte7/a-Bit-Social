import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownItem,
} from "@/components/DropDown";
import { Input } from "@/components/Input";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { atom, useAtom } from "jotai";
import {
  Ghost,
  HandMetal,
  MessageCircle,
  Repeat2,
  Send,
  Skull,
} from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
  Text,
  SafeAreaView,
  View,
  Dimensions,
  type TextInput,
} from "react-native";

const messageAtom = atom("");
const triggerFocusAtom = atom(0);

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

      <View
        className="w-full"
        style={{ height: Dimensions.get("screen").height - 260 }}
      >
        <FlashList
          className="overflow-visible"
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return <Tweet {...item} />;
          }}
          estimatedItemSize={200}
          data={tweets}
        />
      </View>

      <Menu />
    </SafeAreaView>
  );
}

function Tweeter() {
  const [message, setMessage] = useAtom(messageAtom);
  const [triggerFocus] = useAtom(triggerFocusAtom);
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    if (!(inputRef.current && triggerFocus)) return;

    inputRef.current.focus();
  }, [triggerFocus]);

  return (
    <View className="flex-row gap-2">
      <Input
        ref={inputRef as any}
        className="grow"
        placeholder="Reclame aqui!"
        multiline
        numberOfLines={4}
        maxLength={280}
        value={message}
        onChangeText={setMessage}
      />
      <Button className="h-full" label={<Send color="white" />} />
    </View>
  );
}

interface TweetProps {
  id: string;
  authorName: string;
  authorHandle: string;
  content: string;
}
function Tweet({ id, authorHandle, authorName, content }: TweetProps) {
  const [, setMessage] = useAtom(messageAtom);
  const [, setTriggerFocus] = useAtom(triggerFocusAtom);

  const imgMark = /\[img\]\((.*)\)/;
  const imgSrc = content.match(imgMark)?.[1];

  const handleReply = () => {
    setMessage(`r:${Math.floor(Math.random() * 100_000)} `);
    setTriggerFocus((prev) => prev + 1);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex-row items-center gap-2">
        <Avatar>
          <AvatarFallback>
            <Ghost color="hsl(84.25 87.33% 43.33%)" />
          </AvatarFallback>
        </Avatar>

        <View className="items-start justify-center">
          <Button className="h-auto p-0" variant="link" label={authorName} />
          <Text className="font-[SpaceMono] text-xs">{authorHandle}</Text>
        </View>
      </CardHeader>

      <CardContent>
        <Text className="font-[SpaceMono]">{content.replace(imgMark, "")}</Text>
        {imgSrc && (
          <View className="mx-auto mt-2 size-80">
            <Image
              style={{ width: "100%", flex: 1 }}
              source={imgSrc}
              contentFit="cover"
              transition={350}
            />
          </View>
        )}
      </CardContent>

      <CardFooter className="z-50 mx-1 my-2 items-center justify-around">
        <Button
          variant="secondary"
          label={<MessageCircle color="black" size={16} />}
          onPress={handleReply}
        />
        <Button
          variant="secondary"
          label={<Repeat2 color="black" size={16} />}
        />

        <ButtonYeah />

        <Button
          variant="destructive"
          labelClasses="no-underline"
          leftSection={<Skull color="white" size={16} />}
          label="Nah..."
        />
      </CardFooter>
    </Card>
  );
}

function ButtonYeah() {
  const handleYeah = (type: string) => () => console.log(type);

  return (
    <DropDown>
      <DropDownTrigger longPress onPress={handleYeah("Yeah!")}>
        <Button
          labelClasses="no-underline"
          leftSection={<HandMetal color="white" size={16} />}
          label="Yeah!"
        />
      </DropDownTrigger>

      <DropDownContent className="-top-16 left-0 w-screen -translate-x-[88px] rotate-0 skew-x-0 skew-y-0 border-0 bg-transparent">
        <DropDownItem className="flex-row">
          <Button
            labelClasses="no-underline"
            label="Yeah..."
            onPress={handleYeah("Yeah...")}
          />
          <Button
            labelClasses="no-underline"
            label="Yeah?!"
            onPress={handleYeah("Yeah?!")}
          />
          <Button
            className="bg-[#555bce]"
            labelClasses="no-underline"
            label="Would~"
            onPress={handleYeah("Would~")}
          />
        </DropDownItem>
      </DropDownContent>
    </DropDown>
  );
}

function Menu() {
  return (
    <View className="flex-row justify-between border-t-2 pt-2">
      <Button label="Início" />
      <Button
        variant="secondary"
        //leftSection={<Smile color="black" size={16} />}
        label="Perfil"
      />
      <Button variant="secondary" label="Notificações" />
      <Button variant="secondary" label="Caos" />
    </View>
  );
}
