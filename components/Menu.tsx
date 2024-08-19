import { View } from "react-native";
import { Button } from "./ui/Button";
import clsx from "clsx";

export function Menu() {
  return (
    <View
      role="navigation"
      className={clsx(
        "absolute bottom-0 z-20 w-screen",
        "flex-row justify-center border-t-2 bg-background pt-2",
        "md:relative md:mr-4 md:w-64 md:flex-col md:justify-start md:border-e-2 md:border-t-0 md:pr-4 md:pt-0",
      )}
    >
      <Button label="Início" />
      <Button variant="secondary" label="Perfil" />
      <Button variant="secondary" label="Notificações" />
      <Button variant="secondary" label="Caos" />
    </View>
  );
}
