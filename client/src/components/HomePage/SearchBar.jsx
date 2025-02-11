import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
	return (
		<>
			<StyledDiv>
				<SearchIcon sx={{ color: "gray" }} />
				<StyledInput placeholder="Search"></StyledInput>
			</StyledDiv>
		</>
	);
}

const StyledDiv = styled.div`
	display: flex;
	border: 2px solid gray;
	border-radius: 20px;
	padding: 5px;
	
	&:focus-within {
		border-color: rgb(29, 155, 240);
	}
`;

const StyledInput = styled.input`
	background-color: black;
	color: white;
	border: none;
	outline: none;
	border-radius: 20px;
`;
