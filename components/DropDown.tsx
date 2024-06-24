import React, {
  cloneElement,
  createContext,
  useContext,
  useReducer,
} from "react";
import { Animated, Text, View } from "react-native";

import { cn } from "../lib/utils";
import { useClickOutside } from "react-native-click-outside";

interface DropDownContextType {
  open: boolean;
  toggleIsOpen: React.DispatchWithoutAction;
}

const DropDownContext = createContext<DropDownContextType | undefined>(
  undefined,
);

const DropDown = ({ children }: { children: React.ReactNode }) => {
  const [open, toggleIsOpen] = useReducer((state) => {
    return !state;
  }, false);

  return (
    <DropDownContext.Provider value={{ open, toggleIsOpen }}>
      <Drop>{children}</Drop>
    </DropDownContext.Provider>
  );
};

const Drop = ({ children }: { children: React.ReactNode }) => {
  const { open, toggleIsOpen } = useDropdown();
  const ref = useClickOutside(() => open && toggleIsOpen());

  return (
    <View collapsable={false} ref={ref} className="relative">
      {children}
    </View>
  );
};

const DropDownTrigger = ({ children, longPress, onPress }: any) => {
  const { open, toggleIsOpen } = useDropdown();

  return longPress
    ? cloneElement(children, {
        delayLongPress: 250,
        onPress() {
          onPress();
          if (open) toggleIsOpen();
        },
        onLongPress: toggleIsOpen,
      })
    : cloneElement(children, {
        onPress: toggleIsOpen,
      });
};

type DropDownContentTypes = {
  className?: string;
  children: React.ReactNode;
};

const DropDownContent = ({ className, children }: DropDownContentTypes) => {
  const { open } = useDropdown();

  return (
    <>
      {open && (
        <Animated.View
          className={cn(
            "ustify-center absolute top-full z-50 mx-auto flex w-full min-w-[9.5rem] gap-2 overflow-hidden border border-border bg-background p-2 text-popover-foreground shadow-md",
            className,
          )}
        >
          {children}
        </Animated.View>
      )}
    </>
  );
};

type DropDownLabelProps = {
  labelTitle: string;
};

const DropDownLabel = ({ labelTitle }: DropDownLabelProps) => {
  return (
    <Text className="text-xl font-semibold text-primary">{labelTitle}</Text>
  );
};

type DropDownItemProps = {
  children: React.ReactNode;
  className?: string;
};

const DropDownItem = ({ children, className }: DropDownItemProps) => {
  return <View className={cn(className)}>{children}</View>;
};

const DropDownItemSeparator = () => {
  return <View className="h-[1px] flex-1 bg-border" />;
};
const useDropdown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error("useDropdown must be used within a DropdownProvider");
  }
  return context;
};
export {
  DropDown,
  DropDownTrigger,
  DropDownContent,
  DropDownLabel,
  DropDownItemSeparator,
  DropDownItem,
  useDropdown,
};
