import { type VariantProps, cva } from "class-variance-authority";
import { Text, TouchableOpacity, View } from "react-native";
import { Marquee } from "@animatereactnative/marquee";
import { cn } from "../../lib/utils";
import { ReactNode } from "react";

const buttonVariants = cva("flex flex-row gap-2 items-center justify-center", {
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      destructive: "bg-destructive",
      ghost: "bg-slate-700",
      link: "text-primary underline-offset-4",
    },
    size: {
      default: "h-10 px-4",
      sm: "h-8 px-2",
      lg: "h-12 px-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("text-center font-[SpaceMono] font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      ghost: "text-primary-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string | React.ReactNode;
  labelClasses?: string;
  leftSection?: React.ReactNode;
  marquee?: boolean;
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  leftSection,
  marquee,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      role="button"
      aria-label={typeof label === "string" ? label : undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant !== "link" && (
        <>
          <View className="absolute -bottom-[2px] -top-[2px] left-0 right-0 border-2 border-x-0 border-foreground" />
          <View className="absolute -left-[2px] -right-[2px] bottom-0 top-0 border-2 border-y-0 border-foreground" />
          <View className="absolute bottom-0 left-0 right-0 top-0 border-2 border-l-0 border-t-0 border-[rgba(0,0,0,.4)]" />
        </>
      )}
      {leftSection}

      {marquee ? (
        <Marquee style={{ flex: 1 }} spacing={20} speed={0.4}>
          <ButtonLabel
            label={label}
            variant={variant}
            size={size}
            labelClasses={labelClasses}
          />
        </Marquee>
      ) : (
        <ButtonLabel
          label={label}
          variant={variant}
          size={size}
          labelClasses={labelClasses}
        />
      )}
    </TouchableOpacity>
  );
}

interface ButtonLabelProps extends VariantProps<typeof buttonVariants> {
  label: ReactNode;
  labelClasses?: string;
}
function ButtonLabel({ label, variant, size, labelClasses }: ButtonLabelProps) {
  return typeof label === "string" ? (
    <Text
      className={cn(
        buttonTextVariants({
          variant,
          size,
          className: labelClasses,
        }),
        "text-nowrap flex-nowrap whitespace-nowrap break-keep",
      )}
    >
      {label}
    </Text>
  ) : (
    label
  );
}

export { Button, buttonVariants, buttonTextVariants };
