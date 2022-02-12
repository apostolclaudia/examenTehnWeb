import {
	Spacer,
	Flex,
	IconButton,
	Box,
	Button,
	Heading,
	Text,
	Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReferenceList from "../components/reference/ReferenceList";

function ReferencePage({ referenceList, setReferenceList, canEdit }) {
	const [referenceTitle, setReferenceTitle] = useState("");

	return (
		<Box>
			<Box textAlign="center" marginBottom="2em">
				<Heading marginTop={"1em"} textColor="purple.500">
					References
				</Heading>
				<Box width="50em" margin-top="1em" mx="auto">
					<Flex justifyItems={"center"}>
						<Input
							placeholder="Search by reference title"
							marginTop={"3em"}
							variant="outline"
							size="md"
							border="2px"
							borderColor="black.300"
							value={referenceTitle}
							onChange={(e) => setReferenceTitle(e.target.value)}
						/>
					</Flex>
					<Flex justifyItems={"center"}>
						<Link to="/reference/add">
							<IconButton
								size="md"
								colorScheme="black.300"
								marginTop="3em"
								align="center"
								variant="outline"
								border="2px"
								icon={<AddIcon />}
							></IconButton>
						</Link>
						<Text
							marginTop="4em"
							align="center"
							fontWeight={"semibold"}
						>
							Add a new reference
						</Text>
					</Flex>
				</Box>
			</Box>

			<ReferenceList
				referenceList={referenceList}
				setReferenceList={setReferenceList}
				referenceTitle={referenceTitle}
				canEdit={canEdit}
			/>
		</Box>
	);
}

export default ReferencePage;
