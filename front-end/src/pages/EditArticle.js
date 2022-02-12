import {
	Box,
	Text,
	Button,
	Flex,
	Spacer,
	Heading,
	IconButton,
	Input,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReferenceCard from "../components/reference/ReferenceCard";
import { get, patch } from "../utils/useAxios";

function EditArticle({ articleList, setArticleList, canEdit }) {
	let { id } = useParams();
	id = parseInt(id);
	const article = articleList.filter((f) => f.id == id)[0];
	const [title, setTitle] = useState(article.title);
	const [summary, setSummary] = useState(article.summary);
	const [references, setReferences] = useState([]);
	const [offset, setOffset] = useState(0);
	const [count, setCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchReferences = async () => {
			try {
				const response = await get(
					`/reference/byArticle/${article.id}/${offset}`
				);
				if (response.status === 200) {
					setReferences(response.data.rows);
					setCount((value) => value + 1);
					setTotalCount(response.data.count);
				}
			} catch (error) {
				alert("error");
			}
		};
		fetchReferences();
	}, []);
	const onNextPageClick = async () => {
		try {
			const response = await get(
				`/reference/byArticle/${article.id}/${offset + 1}`
			);
			if (response.status === 200) {
				setOffset((value) => value + 1);
				setCount((value) => value + 1);
				setReferences(response.data.rows);
			}
		} catch (error) {
			alert("error");
		}
	};
	const onPreviousPageClick = async () => {
		try {
			const response = await get(
				`/reference/byArticle/${article.id}/${offset - 1}`
			);
			if (response.status === 200) {
				setOffset((value) => value - 1);
				setCount((value) => value - 1);
				setReferences(response.data.rows);
			}
		} catch (error) {
			alert("error");
		}
	};
	async function onEditClick() {
		try {
			const response = await patch(`/article/${article.id}`, {
				title,
				summary,
			});
			if (response.status === 200) {
				setArticleList((value) => {
					let newArticle = articleList.filter((f) => f.id != id);
					newArticle = [...newArticle, response.data.article];
					return newArticle;
				});
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
				Edit Articles
			</Heading>
			<Text>{article.title}</Text>
			<Box width="50em" marginX="auto">
				<Flex justifyItems={"center"}>
					<Box width="50em" mx="auto">
						<Input
							placeholder="Edit title"
							marginTop={"3em"}
							variant="outline"
							size="md"
							value={title}
							border="2px"
							borderColor="black.300"
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
					onClick={onEditClick}
					align="center"
					variant="outline"
					border="2px"
				>
					Edit Article
				</Button>
			</Box>

			<Box width="50em" marginTop="2em">
				{references.map((reference) => (
					<Box textAlign={"left"} key={reference.id}>
						<ReferenceCard
							reference={reference}
							canEdit={canEdit}
						/>
					</Box>
				))}
				{totalCount > 0 && (
					<Flex justifyContent={"space-between"}>
						<IconButton
							size="md"
							colorScheme="purple"
							marginTop="3em"
							align="center"
							variant="ghost"
							border="2px"
							icon={<ArrowBackIcon />}
							onClick={onPreviousPageClick}
							disabled={offset <= 0}
						>
							Previous page
						</IconButton>
						<IconButton
							size="md"
							colorScheme="purple"
							marginTop="3em"
							align="center"
							variant="ghost"
							border="2px"
							icon={<ArrowForwardIcon />}
							onClick={onNextPageClick}
							disabled={totalCount <= count}
						>
							Next page
						</IconButton>
					</Flex>
				)}
			</Box>
		</Box>
	);
}

export default EditArticle;
