import { FlexCol, FlexRow } from "./base.styles";
import { Text } from "./text";

type TCard = {
  name: string;
  owned: number;
};

export const CardCounter = ({ name, owned }: TCard) => {
  return (
    <FlexRow>
      <Text>{name}</Text>
      <Text>{owned}</Text>
    </FlexRow>
  );
};
