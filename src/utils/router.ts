import Block from './Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

const render = (query: string, block: Block): Element => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);
  block.mounted();
  return root;
};

class Route {
  private block: Block | null = null;

  private pathname: string;

  private readonly BlockClass: typeof Block;

  private readonly query: string;

  constructor(
    pathname: string,
    BlockClass: typeof Block,
    query: string,
  ) {
    this.pathname = pathname;
    this.BlockClass = BlockClass;
    this.query = query;
  }

  leave(): void {
    this.block = null;
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this.pathname);
  }

  render(): void {
    if (!this.block) {
      this.block = new this.BlockClass({ propsWithChildren: {}, tagName: 'div' });

      render(this.query, this.block);
    }
  }
}

class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: typeof Block): this {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent): void => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  public go(pathname: string): void {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back(): void {
    this.history.back();
  }

  public forward(): void {
    this.history.forward();
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname)) ?? this.routes.find((route) => route.match('/404'));
  }
}

export default new Router('#app');
