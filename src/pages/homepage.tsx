import { FlexCol } from "../components/base.styles";
import { CardCounter } from "../components/card.counter";
import { data } from "../temp.card.data";

const Homepage = () => {
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
