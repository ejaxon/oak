	<Toolbar appearance="inverted top attched" layout="flow">
		<a href="/" style={{ paddingLeft: 10, paddingRight: 20 }}>
			<Img path="/media/logos/logo-header.png"/>
		</a>
		<Menu appearance="pointing">
			<Item action="NAVIGATE" params="/explore" active={stack.id === "explore"} label="EXPLORE"/>
			<Item action="NAVIGATE" params="/models" active={stack.id === "models"} label="MODELS"/>
			<Item action="NAVIGATE" params="/photographers" active={stack.id === "photographers"}
				label="PHOTOGRAPHERS"
			/>
			<Item action="NAVIGATE" params="/artists" active={stack.id === "artists"} label="ARTISTS"/>
			<Item action="NAVIGATE" params="/magazine" active={stack.id === "magazine"} label="MAGAZINE"/>
		</Menu>
		<Spacer spring/>
		<Button icon="search" action="SHOW_SEARCH_OVERLAY"/>
		<LoginButton/>
	</Toolbar>
