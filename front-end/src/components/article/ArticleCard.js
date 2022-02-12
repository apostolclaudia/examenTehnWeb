import { Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { remove } from "../../utils/useAxios";

function ArticleCard({ article, setArticleList }) {
	const onDeleteClick = async () => {
		try {
			const response = await remove(`/article/${article.id}`);
			if (response.status == 200) {
				setArticleList((value) => {
					const newArticle = value.filter((f) => f.id != article.id);
					return newArticle;
				});
			}
		} catch (error) {
			alert("error");
		}
	};

	return (
		<Box
			border="2px"
			variant="outline"
			borderColor="purple.500"
			borderRadius="15"
			marginTop="1em"
			marginLeft={"3em"}
			marginRight={"1em"}
			alignItems={"center"}
		>
			<Box alignItems="center">
				<Box display="flex" alignItems="center">
					<Box fontWeight="bold" fontSize="16px">
						{article.title}
					</Box>
				</Box>
				<Box>
					<Box
						fontWeight="semibold"
						color="purple.300"
						fontSize="12px"
						as="i"
					>
						{article.createdAt}
					</Box>
				</Box>
				<Link to={`/article/edit/${article.id}`}>
					<IconButton
						size="md"
						colorScheme="black.300"
						marginTop="0.5em"
						align="center"
						variant="ghost"
						border="2px"
						marginRight="1em"
						icon={<EditIcon />}
					>
						Edit Article
					</IconButton>
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
		</Box>
	);
}

export default ArticleCard;
