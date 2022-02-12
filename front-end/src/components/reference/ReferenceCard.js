import { Box, Button, Spacer, IconButton } from "@chakra-ui/react";
import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";

function ReferenceCard({ reference, setReferenceList, canEdit }) {
	const onDeleteClick = async () => {
		try {
			const response = await remove(`/reference/${reference.id}`);
			if (response.status == 200) {
				if (setReferenceList) {
					setReferenceList((oldReferences) => {
						const newReferences = oldReferences.filter(
							(v) => v.id != reference.id
						);
						return newReferences;
					});
				}
			}
		} catch (error) {
			alert("error");
		}
	};

	return (
		<Box
			maxW={"20em"}
			border="2px"
			variant="outline"
			borderColor="purple.500"
			borderRadius="15"
			marginTop="3em"
			marginLeft={"5em"}
			marginRight={"2em"}
			alignItems={"center"}
			display="inline-flex"
		>
			<Box alignItems="center">
				<Box display="flex" alignItems="center">
					<Box fontWeight="bold" fontSize="18px">
						{reference.title}
					</Box>
				</Box>
				<Box
					fontWeight="semibold"
					color="purple.300"
					fontSize="12px"
					as="i"
				>
					{reference.authors}
				</Box>
				{canEdit && (
					<Box>
						<Link to={`/reference/edit/${reference.id}`}>
							<IconButton
								size="md"
								colorScheme="black.300"
								marginTop="0.5em"
								align="center"
								variant="ghost"
								border="2px"
								marginRight="1em"
								icon={<EditIcon />}
							></IconButton>
						</Link>

						<IconButton
							size="md"
							colorScheme="black.300"
							marginTop="0.5em"
							align="center"
							variant="ghost"
							border="2px"
							icon={<DeleteIcon />}
							onClick={onDeleteClick}
						></IconButton>
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default ReferenceCard;
