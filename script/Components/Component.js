export default class Component {
    constructor(target) {
        this.target = target;
        this.state = {};
        this.setup();
        this.render();
    }
    setup() { }
    template() {
        return "";
    }
    setEvent() { }
    render() {
        this.target.innerHTML = this.template();
        this.setEvent();
    }
    setState(newState) {
        this.state = Object.assign(Object.assign({}, this.state), newState);
        this.render();
    }
}
