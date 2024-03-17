interface inter {
  [key: string]: number[];
}

export default class Component {
  state: inter = {};
  constructor(public target: HTMLElement) {
    this.setup();
    this.render();
  }

  setup() {}

  template() {
    return "";
  }

  setEvent() {}

  render() {
    this.target.innerHTML = this.template();
    this.setEvent();
  }

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
}
