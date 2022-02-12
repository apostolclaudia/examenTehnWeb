import {
	Flex,
	Box,
	Spacer,
	Button,
	Heading,
	Input,
	Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { patch } from "../utils/useAxios";
function EditReference({ articleList, setReferenceList, referenceList }) {
	let { id } = useParams();
	id = parseInt(id);
	const reference = referenceList.filter((v) => v.id == id)[0];
	const [title, setTitle] = useState(reference.title);
	const [authors, setAuthors] = useState(reference.authors);
	const [article, setArticle] = useState(reference.articleId);
	const [date, setDate] = useState(new Date(reference.date));
	const navigate = useNavigate();

	const onChangeSelect = (e) => {
		setArticle(e.target.value);
	};

	async function onEditClick() {
		const reference = {
			title: title,
			authors: authors,
			articleId: article,
			date: date,
		};

		try {
			const response = await patch(`/reference/${id}`, {
				...reference,
			});
			if (response.status === 200) {
				console.log(response.data);
				setReferenceList((value) => {
					let newReferences = referenceList.filter((v) => v.id != id);
					newReferences = [...newReferences, response.data.reference];
					return newReferences;
				});
				navigate("/references");
			} else {
				alert("Invalid");
			}
		} catch (error) {
			alert("Invalid");
			console.log(error);
		}
	}

	return (
		<Box textAlign="center" margin-top="1em" mx="auto">
			<Heading marginTop={"1em"} textColor="purple.500">
				Edit Reference
			</Heading>
			<Box width="50em" mx="auto">
				<Input
					placeholder="Title"
					marginTop={"3em"}
					variant="outline"
					size="md"
					value={title}
					isRequired={true}
					border="2px"
					borderColor="black.300"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<Input
					placeholder="Description"
					marginTop={"2em"}
					variant="outline"
					size="md"
					value={authors}
					border="2px"
					borderColor="black.300"
					isRequired={true}
					onChange={(e) => setAuthors(e.target.value)}
				/>
				<DatePicker
					selected={date}
					onChange={(date) => setDate(date)}
				/>

				<Flex justifyItems={"center"}>
					<Button
						size="md"
						colorScheme="purple"
						marginTop="2em"
						align="center"
						variant="outline"
						border="2px"
						onClick={onEditClick}
					>
						Edit Reference
					</Button>
				</Flex>
			</Box>
		</Box>
	);
}

export default EditReference;
