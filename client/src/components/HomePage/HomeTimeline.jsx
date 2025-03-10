import ComposePost from "./ComposePost";
import TimelinePosts from "./DisplayPostComponents/TimelinePosts";
import { styled } from "styled-components";
import PropTypes from "prop-types";

export default function HomeTimeline({ profileInfo }) {
	return (
		<StyledDiv
			className="post-container"
			style={{ display: "flex", flexDirection: "column" }}
		>
			<ComposePost
				profileInfo={profileInfo}
				placeholderText="What is happening?!"
				buttonText="Post"
			/>
			<TimelinePosts />
		</StyledDiv>
	);
}

const breakpoints = {
	small: "500px",
	medium: "769px",
	large: "1200px",
};

const StyledDiv = styled.div`
	@media (max-width: ${breakpoints.medium}) {
		width: 75vw;
	}

	@media (max-width: ${breakpoints.small}) {
		width: 100vw;
	}
`;

HomeTimeline.propTypes = {
	profileInfo: PropTypes.object,
};
