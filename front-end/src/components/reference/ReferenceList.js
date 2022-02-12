import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ReferenceCard from "./ReferenceCard";

function ReferenceList({
	referenceList,
	setReferenceList,
	referenceTitle,
	canEdit,
}) {
	return (
		<Box>
			{referenceList.map((a) => {
				if (a.title.includes(referenceTitle))
					return (
						<ReferenceCard
							border="2px"
							variant="outline"
							key={a.id}
							reference={a}
							setReferenceList={setReferenceList}
							canEdit={canEdit}
						/>
					);
			})}
		</Box>
	);
}

export default ReferenceList;
