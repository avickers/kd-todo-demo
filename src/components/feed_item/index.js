import {Koc} from '@avickers/knockdown'
import Card from 'weightless/card'
import Checkbox from 'weightless/checkbox'

export default class Item extends Koc {
    constructor(data) {
        super()
        const ko = this.ko()

        this.vm = {
            checked: data.completed
            .watch(nv => this.vm.css.set(nv ? 'checked' : null)),
            remove: () => {
                this._remove()
            },
            css: ko.observable(data.completed.get() ? 'checked' : null)
        }
        
        this.html`
        <wl-card data-bind="css: css">
            <span>${data.todo}</span>
            <wl-checkbox class="check" data-bind="checked: checked"></wl-checkbox>
            <wl-button fab flat inverted data-bind="click: remove">
                <wl-icon>close</wl-icon>
            </wl-button>
        </wl-card>
        `

        ko.applyBindings(this.vm)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.css`
        .check {
            --primary-hue: 124;
            margin-left: auto;
            margin-right: 10px;
        }
        .checked {
            background-color: palegreen;
        }
        .checked span {
            text-decoration: line-through;
        }
        wl-card {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 0.5em;
            margin: 5px;
            min-width: 60vw;
        }
        `
    }
}
customElements.define("feed-item",Item)