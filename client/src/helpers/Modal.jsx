import { useEffect, useRef } from "react";
import { styled } from "styled-components";

export default function Modal({
	isOpen,
	hasCloseBtn = true,
	onClose,
	comment,
	children,

}) {
	const modalRef = useRef(null);
	useEffect(() => {
		const modalElement = modalRef.current;

		if (!modalElement) return;
		if (isOpen) {
			modalElement.showModal();
		} else modalElement.close();
	}, [isOpen]);

	const handleCloseModal = () => {
		console.log('handle close runs')
		onClose();
	};
	return (
		<StyledDialog ref={modalRef} className="modal">
			{hasCloseBtn && (
				<button
					className="modal-close-button"
					onClick={handleCloseModal}
				>
					Close
				</button>
			)}
			{children}
		</StyledDialog>
	);
}

const StyledDialog = styled.dialog`
background-color: black`