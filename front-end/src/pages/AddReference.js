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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";
function AddReference({ articleList, setReferenceList }) {
	const [title, setTitle] = useState("");
	const [authors, setAuthors] = useState("");
	const [article, setArticle] = useState("");
	const [date, setDate] = useState(new Date());
	const navigate = useNavigate();

	const onChangeSelect = (e) => {
		setArticle(e.target.value);
	};

	async function onAddClick() {
		const reference = {
			title: title,
			authors: authors,
			articleId: article,
			date: date,
		};
		try {
			const response = await post("/reference/", { ...reference });
			if (response.status === 201) {
				setReferenceList((value) => [
					...value,
					response.data.reference,
				]);
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
				Add Reference
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

				<Flex justifyItems={"center"}>
					<Box width="50em" mx="auto">
						<Select
							placeholder="Select existing article"
							width={"15em"}
							marginTop={"2em"}
							variant="outline"
							size="md"
							onChange={onChangeSelect}
							isRequired={true}
							border="2px"
							borderColor="black.300"
							defaultValue={article}
						>
							{articleList.map((f) => (
								<option value={f.id} key={f.id}>
									{f.title}
								</option>
							))}
						</Select>
					</Box>
					<Box width="50em" mx="auto">
						<Input
							placeholder="Authors"
							marginTop={"2em"}
							variant="outline"
							size="md"
							value={authors}
							border="2px"
							borderColor="black.300"
							isRequired={true}
							onChange={(e) => setAuthors(e.target.value)}
						/>

						<Spacer />
					</Box>
				</Flex>
				<DatePicker
					selected={date}
					onChange={(date) => setDate(date)}
				/>
				<Button
					size="md"
					colorScheme="purple"
					marginTop="2em"
					align="center"
					variant="outline"
					border="2px"
					onClick={onAddClick}
				>
					Add Reference
				</Button>
			</Box>
		</Box>
	);
}

export default AddReference;
