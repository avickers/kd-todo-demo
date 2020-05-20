import {Koc} from '@avickers/knockdown'

import Icon from 'weightless/icon'

export default class Route extends Koc {
    constructor() {
        super()
        const ko = this.ko()
        this.html`
        <div class="container">
            <h2>You don't need to see our documentation.</h2>
            <wl-icon>android</wl-icon>
            <h3>This isn't the droid you're looking for. Move along.</h3>
        </div>
        `

        this.vm = {
        }

        ko.applyBindings(this.vm)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.css`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1em;
            --icon-size: 6em;
        }
        wl-icon {
            color: green;
        }
        `
    }
}
customElements.define("rt-about",Route)