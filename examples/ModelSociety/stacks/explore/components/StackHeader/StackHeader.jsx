<Toolbar name="StackHeader" layout="flow" appearance="top attached hiding">
  <Header label="Explore"/>
  <Menu appearance="pointing">
    <Item action="NAVIGATE" params="/explore/images" active={card.id === "images"} label="Images"/>
    <Item action="NAVIGATE" params="/explore/people" active={card.id === "people"} label="People"/>
    <Item action="NAVIGATE" params="/explore/collaborations" active={card.id === "collaborations"}
      label="Collaborations"
    />
    <Item action="NAVIGATE" params="/explore/galleries" active={card.id === "galleries"}
      label="Galleries"
    />
  </Menu>
</Toolbar>
