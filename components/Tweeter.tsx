import { atom, useAtom } from "jotai";
import { Send } from "lucide-react-native";
import { useRef, useEffect } from "react";
import { type TextInput, View } from "react-native";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

export const messageAtom = atom("");
export const triggerFocusAtom = atom(0);

export function Tweeter() {
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
        rows={4}
        maxLength={280}
        value={message}
        onChangeText={setMessage}
      />
      <Button className="h-full" label={<Send color="white" />} />
    </View>
  );
}
