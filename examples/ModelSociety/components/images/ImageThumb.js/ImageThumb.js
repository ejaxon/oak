export class ImageThumb extends oak.ListViewer {

  static presets = {
    // properties which apply to all
    default: {
      imageId: undefined,
    },

    medium: {},
    horizontalStrip: {},
  };

  // Select the data for the listviewer.
  // Called during `componentDidMount` and `onPropsChanged`
  getData({ props, state, card, template, stack, project }) {
    const fetcher = state.image || new Meteor.Image.ItemFetcher({ delegate: this });
    fetcher.set({ imageId: props.imageId });
    this.setState({ image: fetcher });
  }

  onComponentWillUnmount() {
    if (this.state && this.state.data) this.state.data.unmount();
  }

  renderWith({ props, state, card, template, stack, project }) {
    const { image } = state;
    if (!image) return <EmptyStub/>;
    if (image.isLoading) return <Loader/>;

    return (
      <Panel {...props}>
        {this.renderImage()}
        {this.renderContent()}
      </Panel>
    )
  }

}
