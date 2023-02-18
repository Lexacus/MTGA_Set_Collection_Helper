import { useFormContext } from "react-hook-form";
import {
  DraftTableCell,
  Input,
  Select,
} from "../../pages/drafts/drafts.styles";
import { TDraft } from "../../types";
import { Option } from "../../pages/drafts/drafts.styles";
import dayjs from "dayjs";

export const Draft = ({
  index,
  isEditing,
  setIsEditing,
  draft,
  deleteDraft,
}: {
  index: number;
  isEditing?: number;
  setIsEditing: (num?: number) => void;
  draft: Partial<TDraft>;
  deleteDraft: (index: number) => void;
}) => {
  const { register } = useFormContext<TDraft[]>();

  const { wins, date, mythicsDrafted, packsObtained, raresDrafted, type } =
    draft;

  return isEditing === index ? (
    <tr>
      <DraftTableCell>
        <Select
          {...register(`${index}.wins`, {
            value: wins,
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
          {...register(`${index}.type`, {
            value: type,
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
          {...register(`${index}.raresDrafted`, {
            value: raresDrafted,
            required: true,
          })}
          type="number"
          placeholder="No. of rares"
        />
      </DraftTableCell>
      <DraftTableCell>
        <Input
          {...register(`${index}.mythicsDrafted`, {
            value: mythicsDrafted,
            required: true,
          })}
          type="number"
          placeholder="No. of mythics"
        />
      </DraftTableCell>
      <DraftTableCell>
        {" "}
        <Input
          {...register(`${index}.packsObtained`, {
            value: packsObtained,
            required: true,
          })}
          type="number"
          placeholder="Packs obtained"
        />
      </DraftTableCell>
      <DraftTableCell>
        <Input
          {...register(`${index}.date`, {
            value: dayjs(date).toDate(),
          })}
          placeholder="Draft Start Date"
          type="date"
        />
      </DraftTableCell>
      <DraftTableCell>
        <button type="submit">{"Done"}</button>
      </DraftTableCell>
      <DraftTableCell
        onClick={() => {
          setIsEditing(undefined);
        }}
      >
        X
      </DraftTableCell>
    </tr>
  ) : (
    <tr>
      <DraftTableCell>{wins}</DraftTableCell>
      <DraftTableCell>{type}</DraftTableCell>
      <DraftTableCell>{raresDrafted}</DraftTableCell>
      <DraftTableCell>{mythicsDrafted}</DraftTableCell>
      <DraftTableCell>{packsObtained}</DraftTableCell>
      <DraftTableCell>{dayjs(date).format("DD/MM/YYYY")}</DraftTableCell>
      <DraftTableCell
        onClick={() => {
          setIsEditing(index);
        }}
      >
        {/* isEditing === i ? "Done" :  */ "Edit"}
      </DraftTableCell>
      <DraftTableCell
        onClick={() => {
          deleteDraft(index);
        }}
      >
        X
      </DraftTableCell>
    </tr>
  );
};
