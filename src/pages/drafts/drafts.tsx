import { useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { shallow } from "zustand/shallow";
import { Draft } from "../../components/drafts/draft";
import { StyledText } from "../../components/text/text.styles";
import { useStore } from "../../store";
import { TDraft } from "../../types";
import {
  DraftTable,
  DraftTableCell,
  PageWrapper,
  StatsContainer,
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

  const [isEditing, setIsEditing] = useState<number>();

  const methods = useForm<TDraft[]>({
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
    console.log(data);

    setDrafts(drafts ?? []);
    setIsEditing(undefined);
  };

  const deleteDraft = (i: number) => {
    const newDrafts = drafts?.filter((x, index) => index !== i);
    setDrafts(newDrafts ?? []);
  };

  return (
    <PageWrapper>
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
          <StyledText>Average Rare Gem cost:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? ((totalGemsSpent ?? 0) / (totalRaresDrafted ?? 1)).toFixed(2)
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
          <StyledText>Average Mythic Gem cost:</StyledText>
          <StyledText>
            {!!drafts?.length
              ? ((totalGemsSpent ?? 0) / (totalMythicsDrafted ?? 1)).toFixed(2)
              : 0}
          </StyledText>
        </StatsWrapper>
        <StatsWrapper>
          <StyledText>Total Packs Obtained: </StyledText>
          <StyledText>{totalPacksObtained}</StyledText>
        </StatsWrapper>
      </StatsContainer>
      {!!drafts?.length ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <DraftTable>
              <tr>
                <th>Colors</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Type</th>
                <th>Rares Drafted</th>
                <th>Mythics Drafted</th>
                <th>Packs Obtained</th>
                <th>Draft Start Date</th>
                <th>Edit Draft</th>
                <th>Delete Draft</th>
              </tr>

              {drafts?.map((draft, i) => (
                <Draft
                  key={`${draft.wins}${draft.type}${draft.raresDrafted}${draft.mythicsDrafted}${i}`}
                  draft={draft}
                  index={i}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  deleteDraft={deleteDraft}
                />
              ))}
              {isEditing === drafts.length ? (
                <Draft
                  isEditing={isEditing}
                  index={drafts.length}
                  setIsEditing={setIsEditing}
                  draft={{}}
                  deleteDraft={deleteDraft}
                />
              ) : (
                <tr>
                  <DraftTableCell colSpan={10}>
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
        </FormProvider>
      ) : (
        <StyledText>No drafts saved</StyledText>
      )}
    </PageWrapper>
  );
};

export default Drafts;
