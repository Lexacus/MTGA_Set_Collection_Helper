import dayjs from "dayjs";
import { useMemo, useState } from "react";
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
  StatsContainer,
  PageWrapper,
} from "./drafts.styles";

const Drafts = () => {
  const { drafts, setDrafts } = useStore(
    ({ drafts, setDrafts }) => ({
      drafts,
      setDrafts,
    }),
    shallow
  );

  const [isEditing, setIsEditing] = useState<number>();

  const { register, handleSubmit, setValue } = useForm<TDraft[]>({
    defaultValues: drafts,
    shouldUnregister: true,
  });

  const QuickDraftGemCost = useMemo(() => {
    return [700, 650, 500, 400, 300, 100, -100, -200];
  }, []);
  const PremierDraftGemCost = useMemo(() => {
    return [1450, 1400, 1250, 500, 100, -100, -300, -700];
  }, []);

  const totalGemsSpent = useMemo(() => {
    return drafts?.reduce(
      (acc, next) =>
        acc +
        Number(
          next.type === "quick"
            ? QuickDraftGemCost[next.wins]
            : PremierDraftGemCost[next.wins]
        ),
      0
    );
  }, [drafts]);

  const totalRaresDrafted = useMemo(() => {
    return drafts?.reduce((acc, next) => acc + Number(next.raresDrafted), 0);
  }, [drafts]);

  const totalMythicsDrafted = useMemo(() => {
    return drafts?.reduce((acc, next) => acc + Number(next.mythicsDrafted), 0);
  }, [drafts]);

  const totalPacksObtained = useMemo(() => {
    return drafts?.reduce((acc, next) => acc + Number(next.packsObtained), 0);
  }, [drafts]);

  const onSubmit: SubmitHandler<TDraft[]> = (data) => {
    /*     if (!isEditing) {
      return;
    } */
    drafts?.splice(isEditing!, 1, Object.values(data)[0]);
    console.log(drafts);

    /*     setDrafts(drafts ?? []); */
    setIsEditing(undefined);
  };

  return (
    <PageWrapper>
      {/*      <FlexCol>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Select
            {...register(`${drafts?.length ?? 0}.wins`)}
            placeholder="Wins"
          >
            <Option value={0}>0</Option>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
            <Option value={3}>3</Option>
            <Option value={4}>4</Option>
            <Option value={5}>5</Option>
            <Option value={6}>6</Option>
            <Option value={7}>7</Option>
          </Select>
          <Select {...register(`${drafts?.length ?? 0}.type`)}>
            <Option value={"premier"}>Premier</Option>
            <Option value={"traditional"}>Traditional</Option>
            <Option value={"quick"}>Quick</Option>
          </Select>
          <Input
            {...register(`${drafts?.length ?? 0}.raresDrafted`)}
            placeholder="No. of rares"
          />
          <Input
            {...register(`${drafts?.length ?? 0}.mythicsDrafted`)}
            placeholder="No. of mythics"
          />
          <Input
            {...register(`${drafts?.length ?? 0}.packsObtained`)}
            placeholder="Packs obtained"
          />

          <button type="submit">Insert Draft</button>
        </Form>
      </FlexCol> */}
      <StatsContainer>
        <StatsWrapper>
          <StyledText>Total Gems Spent:</StyledText>
          <StyledText>{totalGemsSpent}</StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Average Gems Spent per Draft:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? ((totalGemsSpent ?? 0) / drafts?.length).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Total Rares Drafted:</StyledText>
          <StyledText>{totalRaresDrafted}</StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Average Rares Drafted per Draft:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? ((totalRaresDrafted ?? 0) / drafts?.length).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Total Mythics Drafted:</StyledText>
          <StyledText>{totalMythicsDrafted}</StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Average Mythics Drafted per Draft:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? ((totalMythicsDrafted ?? 0) / drafts?.length).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Total Packs Obtained: </StyledText>
          <StyledText>{totalPacksObtained}</StyledText>
        </StatsWrapper>
      </StatsContainer>
      {!!drafts?.length ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <DraftTable>
            <tr>
              <th>Wins</th>
              <th>Type</th>
              <th>Rares Drafted</th>
              <th>Mythics Drafted</th>
              <th>Packs Obtained</th>
              <th>Draft Start Date</th>
              <th>Edit Draft</th>
              <th>Delete Draft</th>
            </tr>

            {drafts?.map(
              (
                {
                  wins,
                  date,
                  mythicsDrafted,
                  packsObtained,
                  raresDrafted,
                  type,
                },
                i
              ) => (
                <tr
                  key={`${wins}${type}${raresDrafted}${mythicsDrafted}${i}`}
                ></tr>
              )
            )}
            {isEditing === drafts.length ? (
              <tr>
                <DraftTableCell>
                  <Select
                    {...register(`${drafts.length}.wins`, {
                      required: true,
                    })}
                    placeholder="Wins"
                  >
                    <Option value={0}>0</Option>
                    <Option value={1}>1</Option>
                    <Option value={2}>2</Option>
                    <Option value={3}>3</Option>
                    <Option value={4}>4</Option>
                    <Option value={5}>5</Option>
                    <Option value={6}>6</Option>
                    <Option value={7}>7</Option>
                  </Select>
                </DraftTableCell>
                <DraftTableCell>
                  <Select
                    {...register(`${drafts.length}.type`, {
                      required: true,
                    })}
                  >
                    <Option value={"premier"}>Premier</Option>
                    <Option value={"traditional"}>Traditional</Option>
                    <Option value={"quick"}>Quick</Option>
                  </Select>
                </DraftTableCell>
                <DraftTableCell>
                  <Input
                    {...register(`${drafts.length}.raresDrafted`, {
                      required: true,
                    })}
                    type="number"
                    placeholder="No. of rares"
                  />
                </DraftTableCell>
                <DraftTableCell>
                  <Input
                    {...register(`${drafts.length}.mythicsDrafted`, {
                      required: true,
                    })}
                    type="number"
                    placeholder="No. of mythics"
                  />
                </DraftTableCell>
                <DraftTableCell>
                  {" "}
                  <Input
                    {...register(`${drafts.length}.packsObtained`, {
                      required: true,
                    })}
                    type="number"
                    placeholder="Packs obtained"
                  />
                </DraftTableCell>
                <DraftTableCell>
                  <Input
                    {...register(`${drafts.length}.date`, {
                      value: dayjs().toDate(),
                    })}
                    placeholder="Draft Start Date"
                    type="date"
                  />
                </DraftTableCell>
                <DraftTableCell>
                  <button type="submit">{"Done"}</button>
                </DraftTableCell>
                <DraftTableCell>X</DraftTableCell>
              </tr>
            ) : (
              <tr>
                <DraftTableCell colSpan={8}>
                  <button
                    onClick={() => {
                      setIsEditing(drafts.length);
                    }}
                  >
                    Add Draft
                  </button>
                </DraftTableCell>
              </tr>
            )}
          </DraftTable>
        </form>
      ) : (
        <StyledText>No drafts saved</StyledText>
      )}
    </PageWrapper>
  );
};

export default Drafts;
