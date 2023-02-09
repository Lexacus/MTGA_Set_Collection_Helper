import { FlexCol } from "../components/base.styles";
import { CardCounter } from "../components/card.counter";

const Homepage = () => {
  const data = [{ name: "Atraxa", owned: 0 }];

  return (
    <>
      <FlexCol>
        {data.map((card) => (
          <CardCounter {...card} />
        ))}
      </FlexCol>
    </>
  );
};

export default Homepage;
