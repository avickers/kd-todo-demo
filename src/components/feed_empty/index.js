import {Koc} from '@avickers/knockdown'

import img from './undraw_no_data_qbuo.svg'

export default class Empty extends Koc {
    constructor(data) {
        const self = super()
        const ko = this.ko()
        this.html`
        <div class="container">
            <h2>You have nothing to do.</h2>
            <div class="filler"></div>
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
            display: inline-block;
            height: 100%;
        }
        .filler {
            background: center / contain no-repeat url(${img});
            height: 20em;
        }
        `
    }
}
customElements.define("feed-empty",Empty)