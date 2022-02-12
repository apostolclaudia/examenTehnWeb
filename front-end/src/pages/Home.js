import {
	Box,
	Button,
	Heading,
	Input,
	Flex,
	IconButton,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ArticleList from "../components/article/ArticleList";

function Home({ articleList, setArticleList }) {
	const [title, setTitle] = useState("");

	return (
		<Box>
			<Box textAlign="center" marginBottom="2em">
				<Heading textColor="purple.500">Articles</Heading>
				<Box width="50em" margin-top="1em" mx="auto">
					<Flex justifyItems={"center"}>
						<Input
							placeholder="Search by title"
							marginTop={"3em"}
							variant="outline"
							size="md"
							value={title}
							border="2px"
							borderColor="black.300"
							onChange={(e) => setTitle(e.target.value)}
						/>
					</Flex>
					<Flex justifyItems={"center"}>
						<Link to="/article/add">
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
							Add a new article
						</Text>
					</Flex>
				</Box>
			</Box>

			<ArticleList
				articleList={articleList}
				setArticleList={setArticleList}
				title={title}
			/>
		</Box>
	);
}

export default Home;
