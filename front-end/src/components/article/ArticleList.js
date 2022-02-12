import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import ArticleCard from "./ArticleCard";

function ArticleList({ articleList, setArticleList, title }) {
	return (
		<Box>
			<Flex wrap={"wrap"}>
				{articleList.map((a) => {
					if (a.title.includes(title))
						return (
							<ArticleCard
								article={a}
								key={a.id}
								setArticleList={setArticleList}
							/>
						);
				})}
			</Flex>
		</Box>
	);
}

export default ArticleList;
