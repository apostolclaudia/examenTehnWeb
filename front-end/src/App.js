import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import AddArticle from "./pages/AddArticle";
import AddReference from "./pages/AddReference";
import EditArticle from "./pages/EditArticle";
import EditReference from "./pages/EditReference";
import Home from "./pages/Home";
import ReferencePage from "./pages/ReferencePage";
import { get } from "./utils/useAxios";

function App() {
	const [articleList, setArticleList] = useState([]);
	const [referenceList, setReferenceList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await get("/article/");
				if (response.status === 200) {
					setArticleList(response.data.article);
				}
			} catch (error) {}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await get("/reference/");
				if (response.status === 200) {
					setReferenceList(response.data.references);
				}
			} catch (error) {}
		};

		fetchData();
	}, []);

	return (
		<Box textAlign="center">
			<Router>
				<Flex>
					<Box flex="4">
						<Link to="/">
							<StarIcon></StarIcon>Articles
						</Link>
					</Box>
					<Box flex="3">
						<Link to="/references">References</Link>
					</Box>
				</Flex>
				<Routes>
					<Route
						path="/reference/add/"
						element={
							<AddReference
								articleList={articleList}
								setReferenceList={setReferenceList}
							/>
						}
					/>
					<Route
						path="/reference/edit/:id"
						element={
							<EditReference
								articleList={articleList}
								setReferenceList={setReferenceList}
								referenceList={referenceList}
							/>
						}
					/>
					<Route
						path="/article/add/"
						element={<AddArticle setArticleList={setArticleList} />}
					/>
					<Route
						path="/article/edit/:id"
						element={
							<EditArticle
								articleList={articleList}
								setArticleList={setArticleList}
								canEdit={false}
							/>
						}
					/>
					<Route
						path="/references"
						element={
							<ReferencePage
								referenceList={referenceList}
								setReferenceList={setReferenceList}
								canEdit={true}
							/>
						}
					/>
					<Route
						path="/"
						element={
							<Home
								articleList={articleList}
								setArticleList={setArticleList}
							/>
						}
					/>
				</Routes>
			</Router>
		</Box>
	);
}

export default App;
