// Component loader/wrapper thinger.
// DOWNSIDE:
//    - using this will create a wrapper element in the DOM output
//      even once the component has loaded.
//      That could mess up the html structure of, eg, a form etc.
export class Component extends React.Component {

  static defaultProps = {
    // Path to load component:
    //  - "foo/bar"               <- automagic lookup
    //  - "/project/foo"          <- explicit: projects/components/foo/
    //  - "http://..."            <- absolute path on the interwebs
    path: undefined,
  }

  render() {
    // Separate out path, pass down all other props
    const { path, props } = this.props;
    const { context } = this;

    const component = Component.loadComponent({ component:this, path, context });
    if (component === oak.NOT_FOUND) return <Error/>;
    if (component === oak.LOADING) return <Loading/>;
    if (!component) return <EmptyStub/>;

    return <component {...props}>{this.props.children}</component>
  }

  // Load the component using `API.loadComponent()`.
  // Returns:
  //   - a Component
  //   - oak.LOADING if we're loading the component
  //   -
  // `context` should have some of:   `{ card, template, stack, project }` available
  static loadComponent({ component, componentPath, context }) {

    // If they didn't specify a path, return undefined.
    // ????
    if (!componentPath) return;

    // Figure out where the <Component> fits in the heirarchy
    const contextIds = Component.getContextIds();

    // `API.loadComponent` returns:
    //  - a Component if it has already been loaded, or
    //  - a Promise which yields a Component if it hasn't been loaded, or
    //  - oak.NOT_FOUND if there was an error or no component was found.
    // NOTE: we assume that `loadComponent` intelligently caches the results
    //       and will reload automatically if it needs to.
    const result = API.loadComponent({ componentPath, contextIds });

    // If we got a promise back...
    if (result instanceof Promise) {
      // on success or failure, redraw the component if it is still in scope
      function redraw() { if (component.isStillMounted) component.forceUpdate() };
      result.then( redraw, redraw );
      // return the signal that we're loading
      return oak.LOADING;
    }

    // Otherwise return the result, which will be a Component or `oak.NOT_FOUND`.
    return result;
  }

  // Figure out where the <Component> fits in the heirarchy.
  // Returns a map of `{ level : id }`.
  static getContextIds(context) {
    const { project, stack, template, card } = context;
    const ids = {};
    if (project)  ids[project]  = project.props.id;
    if (stack)    ids[stack]    = stack.props.id;
    if (template) ids[template] = template.props.id;
    if (card)     ids[card]     = card.props.id;
    return ids;
  }

}
