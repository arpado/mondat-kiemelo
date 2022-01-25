class Input {
    constructor(name, node) {
        this.name = name,
        this.node = document.querySelector(node)
    }

    intoLS() {
        localStorage.setItem(this.name, this.node.value);
    }

    fromLS() {
        return localStorage.getItem(this.name);
    }

    setValue() {
        this.node.value = localStorage.getItem(this.name);
    }

}
