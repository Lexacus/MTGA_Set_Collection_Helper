import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import { shallow } from "zustand/shallow";
import { FlexCol, FlexRow } from "../../components/base.styles";
import { StyledText } from "../../components/text/text.styles";
import { useStore } from "../../store";
import { TDraft } from "../../types";
import {
  Form,
  Select,
  Option,
  DraftWrapper,
  DraftTable,
  DraftTableCell,
  Input,
  StatsWrapper,
} from "./drafts.styles";

const Drafts = () => {
  const { drafts, setDrafts } = useStore(
    ({ drafts, setDrafts }) => ({
      drafts,
      setDrafts,
    }),
    shallow
  );

  const { register, handleSubmit, setValue } = useForm<TDraft>({
    defaultValues: {
      raresDrafted: 0,
      mythicsDrafted: 0,
      type: "quick",
      wins: 0,
    },
  });

  const QuickDraftGemCost = [700, 650, 500, 400, 300, 100, -100, -200];
  const PremierDraftGemCost = [1450, 1400, 1250, 500, 100, -100, -300, -700];

  const onSubmit: SubmitHandler<TDraft> = (data) => {
    console.log(data);

    setDrafts([
      ...(drafts ?? []),
      { ...data, date: dayjs().format("DD/MM/YYYY") },
    ]);
  };
  return (
    <FlexCol>
      <FlexCol>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Select {...register("wins")} placeholder="Wins">
            <Option value={0}>0</Option>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
            <Option value={6}>6</Option>
            <Option value={7}>7</Option>
          </Select>
          <Select {...register("type")}>
            <Option value={"premier"}>Premier/Traditional</Option>
            <Option value={"quick"}>Quick</Option>
          </Select>
          <Input {...register("raresDrafted")} placeholder="No. of rares" />
          <Input {...register("mythicsDrafted")} placeholder="No. of mythics" />

          <button type="submit">Insert Draft</button>
        </Form>
      </FlexCol>
      <FlexCol>
        {/*TODO: Memoize?*/}
        <StatsWrapper>
          <StyledText>Total Gems Spent:</StyledText>
          <StyledText>
            {drafts?.reduce(
              (acc, next) =>
                acc + next.type === "quick"
                  ? QuickDraftGemCost[next.wins]
                  : PremierDraftGemCost[next.wins],
              0
            )}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Average Gems Spent per Draft:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? (
                  drafts?.reduce(
                    (acc, next) =>
                      acc + next.type === "quick"
                        ? QuickDraftGemCost[next.wins]
                        : PremierDraftGemCost[next.wins],
                    0
                  ) / drafts?.length
                ).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Total Rares Drafted:</StyledText>
          <StyledText>
            {drafts?.reduce((acc, next) => acc + Number(next.raresDrafted), 0)}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Average Rares Drafted per Draft:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? (
                  drafts?.reduce(
                    (acc, next) => acc + Number(next.raresDrafted),
                    0
                  ) / drafts?.length
                ).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          Total Mythics Drafted:
          <StyledText>
            {drafts?.reduce(
              (acc, next) => acc + Number(next.mythicsDrafted),
              0
            )}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Average Mythics Drafted per Draft:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? (
                  drafts?.reduce(
                    (acc, next) => acc + Number(next.mythicsDrafted),
                    0
                  ) / drafts?.length
                ).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
      </FlexCol>
      {!!drafts?.length ? (
        <DraftTable>
          <tr>
            <th>Wins</th>
            <th>Type</th>
            <th>Rares Drafted</th>
            <th>Mythics Drafted</th>
            <th>Draft Start Date</th>
            <th>Delete Draft</th>
          </tr>
          {drafts?.map((draft, i) => (
            <tr>
              <DraftTableCell>{draft.wins}</DraftTableCell>
              <DraftTableCell>{draft.type}</DraftTableCell>
              <DraftTableCell>{draft.raresDrafted}</DraftTableCell>
              <DraftTableCell>{draft.mythicsDrafted}</DraftTableCell>
              <DraftTableCell>{draft.date}</DraftTableCell>
              <DraftTableCell
                onClick={() => {
                  const newDrafts = drafts.filter((x, index) => index !== i);
                  setDrafts(newDrafts);
                }}
              >
                X
              </DraftTableCell>
            </tr>
          ))}
        </DraftTable>
      ) : (
        <StyledText>No drafts saved</StyledText>
      )}
    </FlexCol>
  );
};

export default Drafts;
