import { DraftTableCell, Select } from "../../pages/drafts/drafts.styles";

export const Draft = ({
  index,
  isEditing,
}: {
  index: number;
  isEditing: number;
}) => {
  const { register } = use;

  return isEditing === index ? (
    <>
      <DraftTableCell>
        <Select
          {...register(`${i}.wins`, {
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
          {...register(`${i}.type`, {
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
          {...register(`${i}.raresDrafted`, {
            value: raresDrafted,
            required: true,
          })}
          type="number"
          placeholder="No. of rares"
        />
      </DraftTableCell>
      <DraftTableCell>
        <Input
          {...register(`${i}.mythicsDrafted`, {
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
          {...register(`${i}.packsObtained`, {
            value: packsObtained,
            required: true,
          })}
          type="number"
          placeholder="Packs obtained"
        />
      </DraftTableCell>
      <DraftTableCell>
        <Input
          {...register(`${i}.date`, {
            value: dayjs(date).toDate(),
          })}
          placeholder="Draft Start Date"
          type="date"
        />
      </DraftTableCell>
      <DraftTableCell>
        <button type="submit">{"Done"}</button>
      </DraftTableCell>
      <DraftTableCell>X</DraftTableCell>
    </>
  ) : (
    <>
      <DraftTableCell>{wins}</DraftTableCell>
      <DraftTableCell>{type}</DraftTableCell>
      <DraftTableCell>{raresDrafted}</DraftTableCell>
      <DraftTableCell>{mythicsDrafted}</DraftTableCell>
      <DraftTableCell>{packsObtained}</DraftTableCell>
      <DraftTableCell>{dayjs(date).format("DD/MM/YYYY")}</DraftTableCell>
      <DraftTableCell
        onClick={() => {
          setIsEditing(i);
        }}
      >
        {/* isEditing === i ? "Done" :  */ "Edit"}
      </DraftTableCell>
      <DraftTableCell
        onClick={() => {
          const newDrafts = drafts.filter((x, index) => index !== i);
          setDrafts(newDrafts);
        }}
      >
        X
      </DraftTableCell>
    </>
  );
};
