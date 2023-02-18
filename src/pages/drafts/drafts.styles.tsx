import styled from "@emotion/styled";

export const PageWrapper = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  max-width: 600px;
`;

export const Select = styled.select`
  font-family: Montserrat;
  text-align: center;
`;

export const Option = styled.option`
  font-family: Montserrat;
  text-align: center;
`;

export const Input = styled.input`
  font-family: Montserrat;
  text-align: center;
`;

export const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  row-gap: 5px;
`;

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
`;

export const DraftTable = styled.table`
  width: 100%;
  max-width: 800px;
  text-align: center;
  border-collapse: collapse;
  font-family: Montserrat;
  margin-top: 30px;
`;

export const DraftTableCell = styled.td`
  text-align: center;
  background-color: rgba(122, 77, 39, 0.1);
  padding: 10px;
  cursor: ${(props) => (props.onClick ? "pointer" : "normal")};
`;

export const DraftWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  height: 50px;
  background-color: rgba(122, 77, 39, 0.1);
  width: 100%;
  max-width: 800px;
  justify-content: space-around;
  align-items: center;
`;
