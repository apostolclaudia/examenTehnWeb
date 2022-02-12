import { Box, Button, Flex, Spacer, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../utils/useAxios";

function AddArticle({ setArticleList }) {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const navigate = useNavigate();

	async function onAddClick() {
		const article = {
			title: title,
			summary: summary,
		};
		try {
			const response = await post("/article/", { ...article });
			if (response.status === 201) {
				setArticleList((value) => [...value, response.data.article]);
				navigate("/");
			} else {
				alert("Invalid");
			}
		} catch (error) {
			alert("Invalid");
			console.log(error);
		}
	}

	return (
		<Box textAlign="center" width="50em" margin-top="1em" mx="auto">
			<Heading marginTop={"1em"} textColor="purple.500">
				Add Article
			</Heading>
			<Flex justifyItems={"center"}>
				<Box width="50em" mx="auto">
					<Input
						placeholder="Add article title"
						marginTop={"3em"}
						variant="outline"
						size="md"
						value={title}
						border="2px"
						borderColor="black.300"
						// errorBorderColor="red.300"
						onChange={(e) => setTitle(e.target.value)}
					/>
					<Input
						placeholder="Add summary"
						marginTop={"2em"}
						width="30em"
						height="10em"
						variant="outline"
						size="md"
						value={summary}
						border="2px"
						borderColor="black.300"
						onChange={(e) => setSummary(e.target.value)}
					/>
				</Box>
			</Flex>
			<Spacer />
			<Spacer />
			<Button
				size="md"
				colorScheme="purple"
				marginTop="3em"
				onClick={onAddClick}
				align="center"
				variant="outline"
				border="2px"
			>
				Add Article
			</Button>
		</Box>
	);
}

export default AddArticle;
