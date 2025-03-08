import { useEffect, useRef } from "react";
import { styled } from "styled-components";

export default function Modal({
	isOpen,
	hasCloseBtn = true,
	onClose,
	children,
}) {
	const modalRef = useRef(null);
	useEffect(() => {
		const modalElement = modalRef.current;

		const handleClickOutside = (event) => {
			if (modalElement && event.target === modalElement) {
				onClose();
			}
		};

		if (isOpen) {
			modalElement?.showModal();
			modalElement?.addEventListener("click", handleClickOutside);
		} else {
			modalElement?.close();
		}

		return () => {
			modalElement?.removeEventListener("click", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleCloseModal = () => {
		onClose();
	};
	return (
		<StyledDialog ref={modalRef} className="modal">
			{hasCloseBtn && (
				<StyledCloseButton
					className="modal-close-button"
					onClick={handleCloseModal}
				>
					X
				</StyledCloseButton>
			)}
			{children}
		</StyledDialog>
	);
}

const breakpoints = {
	small: "500px",
	medium: "700px",
	large: "1200px",
};

const StyledDialog = styled.dialog`
	position: fixed;
	border: 1px solid white;
	top: 20px;
	left: 30%;
	width: 30rem;
	border-radius: 20px;
	background-color: black;

	@media (max-width: ${breakpoints.medium}) {
		min-width: 100vw;
		min-height: 100vh;
		top: 0;
		left: 0;
	}

	&::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}
`;

const StyledCloseButton = styled.button`
	all: unset;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;
	margin: 10px;
	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.2);
	}

	&:active {
		transform: scale(0.9);
	}
`;
