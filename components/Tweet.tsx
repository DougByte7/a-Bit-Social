import { useAtom } from "jotai";
import {
  Ghost,
  MessageCircle,
  Repeat2,
  Skull,
  HandMetal,
  Flag,
} from "lucide-react-native";
import { View, Text, Linking } from "react-native";
import { Image } from "expo-image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownItem,
} from "./ui/DropDown";
import { messageAtom, triggerFocusAtom } from "./Tweeter";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
const scicastLogo = require("@/assets/images/scicast.jpg");

function timeSince(isoDate: string) {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(isoDate).getTime()) / 1000,
  );

  let interval = seconds / 31536000;

  // if (interval > 1) {
  //   return Math.floor(interval) + " anos";
  // }
  interval = seconds / 2592000;
  // if (interval > 1) {
  //   return Math.floor(interval) + " meses";
  // }
  interval = seconds / 86400;
  if (interval > 1) {
    // return Math.floor(interval) + " dias";
    return new Date(isoDate).toLocaleDateString();
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " horas";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutos";
  }
  return Math.floor(seconds) + " segundos";
}

enum Interaction {
  REPLY = "r",
  SHARE = "s",
}
interface TweetProps {
  id: string;
  avatarUri?: string;
  authorName: string;
  authorHandle: string;
  content: string;
  date: string;
  link?: string;
}
export default function Tweet({
  id,
  avatarUri,
  authorHandle,
  authorName,
  content,
  date,
  link,
}: TweetProps) {
  const [, setMessage] = useAtom(messageAtom);
  const [, setTriggerFocus] = useAtom(triggerFocusAtom);

  const imgMark = /\[img\]\((.*)\)/;
  const imgSrc = content.match(imgMark)?.[1];

  const handleOpenProfile = async () => {
    if (link) {
      const supported = await Linking.canOpenURL(link);

      if (supported) {
        await Linking.openURL(link);
      }
    }
  };

  const handleInteract = (interaction: Interaction) => () => {
    setMessage(`${interaction}:${Math.floor(Math.random() * 100_000)} `);
    setTriggerFocus((prev) => prev + 1);
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="flex-row items-center gap-2">
        <Avatar>
          {(avatarUri || authorHandle === "Scicast") && (
            <AvatarImage
              source={
                authorHandle === "Scicast" ? scicastLogo : { uri: avatarUri }
              }
            />
          )}
          <AvatarFallback>
            <Ghost color="hsl(84.25 87.33% 43.33%)" />
          </AvatarFallback>
        </Avatar>

        <View className="flex-1 items-start justify-center overflow-hidden">
          <Button
            marquee={authorName.length > 30}
            className={cn(link && "w-full", "h-auto px-0")}
            variant="link"
            label={authorName}
            onPress={handleOpenProfile}
          />
          <Text className="font-[SpaceMono] text-xs">
            {authorHandle} - {timeSince(date)}
          </Text>
        </View>
        {!link && (
          <Button
            variant="link"
            label={<Flag size={18} color="hsl(8.82 90.43% 63.14%)" />}
          />
        )}
      </CardHeader>

      <CardContent>
        <Text className="font-[SpaceMono]">{content.replace(imgMark, "")}</Text>
        {imgSrc && (
          <View className="mx-auto mt-2 h-80 w-80">
            <Image
              style={{ width: "100%", flex: 1 }}
              source={imgSrc}
              contentFit="cover"
              transition={350}
            />
          </View>
        )}
      </CardContent>

      {!link && (
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
      )}
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
