import { Text, View } from "react-native";

import { cn } from "../lib/utils";

function Card({
  className,

  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View className={cn(className)}>
      <View className="absolute bottom-[2px] left-2 right-2 top-[2px] border-2 border-x-0 border-dashed border-foreground" />
      <View className="absolute bottom-2 left-[2px] right-[2px] top-2 border-2 border-y-0 border-dashed border-foreground" />
      <View {...props} />
    </View>
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn("p-4", className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <Text
      className={cn(
        "text-2xl font-semibold tracking-tight text-primary",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <Text
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn("p-4 pt-0", className)} {...props} />;
}

function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn(className, "flex flex-row items-center p-2")}
      {...props}
    />
  );
}

interface SimpleCardProps {
  className?: string;
  title?: string;
  description?: string;
  content?: string;
  footer?: string;
}
function SimpleCard({
  className,
  title,
  description,
  content,
  footer,
}: SimpleCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && (
          <Text className="text-2xl font-semibold tracking-tight text-primary">
            {title}
          </Text>
        )}
        {description && (
          <Text className="text-sm text-muted-foreground">{description}</Text>
        )}
      </CardHeader>
      {content && (
        <CardContent>
          <Text className="text-base text-primary">{content}</Text>
        </CardContent>
      )}
      {footer && (
        <CardFooter>
          <Text className="text-sm text-muted-foreground">{footer}</Text>
        </CardFooter>
      )}
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  SimpleCard,
};