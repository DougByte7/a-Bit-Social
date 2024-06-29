import { useAtom } from "jotai";
import {
  Ghost,
  MessageCircle,
  Repeat2,
  Skull,
  HandMetal,
} from "lucide-react-native";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownItem,
} from "./ui/DropDown";
import { messageAtom, triggerFocusAtom } from "./Tweeter";
import { Button } from "./ui/Button";

enum Interaction {
  REPLY = "r",
  SHARE = "s",
}
interface TweetProps {
  id: string;
  authorName: string;
  authorHandle: string;
  content: string;
}
export default function Tweet({
  id,
  authorHandle,
  authorName,
  content,
}: TweetProps) {
  const [, setMessage] = useAtom(messageAtom);
  const [, setTriggerFocus] = useAtom(triggerFocusAtom);

  const imgMark = /\[img\]\((.*)\)/;
  const imgSrc = content.match(imgMark)?.[1];

  const handleInteract = (interaction: Interaction) => () => {
    setMessage(`${interaction}:${Math.floor(Math.random() * 100_000)} `);
    setTriggerFocus((prev) => prev + 1);
  };

  return (
    <Card className="mx-auto w-full max-w-[400px]">
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

      <CardFooter className="mx-auto my-2 max-w-[350px] items-center justify-around gap-2">
        <Button
          variant="secondary"
          label={<MessageCircle color="black" size={16} />}
          onPress={handleInteract(Interaction.REPLY)}
        />
        <Button
          variant="secondary"
          label={<Repeat2 color="black" size={16} />}
          onPress={handleInteract(Interaction.SHARE)}
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
