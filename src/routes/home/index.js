import {Koc} from '@avickers/knockdown'

import Empty from '/components/feed_empty'
import Item from '/components/feed_item'
import TextField from 'weightless/textfield'

export default class Home extends Koc {
    constructor() {
        const self = super()
        const ko = this.ko()
        
        this.html`
        <div class="container">
            <div class="content">
            <div style="display: inline-flex; align-items: center; margin: 1em auto; min-width: 60vw;">
                <wl-textfield style="flex-grow: 1; margin-right: 0.5em;" filled label="Todo..." data-bind="value: todo"></wl-textfield>
                <wl-button data-bind="click: addTodo"><wl-icon>add</wl-icon></wl-button>
            </div>
                <div class="list" data-bind="foreach: feed"></div>
           </div>
        </div>
        `

        this.vm = {
            feed: ko.observableArray([{ 
                todo: 'Step 1: Steal underwear',
                completed: ko.observable(true)
            }, {
                todo: 'Step 2:',
                completed: ko.observable(false)
            }, {
                todo: 'Step 3: Profit',
                completed: ko.observable(false)
            }])
            .emptyTemplate(Empty)
            .template(Item),
            todo: ko.observable('Step 4: IPO')
            .listenForKey("Enter",() => this.vm.addTodo()),
            addTodo: () => {
                if(this.vm.todo.get())
                this.vm.feed.push({
                    todo: this.vm.todo.get(),
                    completed: ko.observable(false)
                })
                this.vm.todo.set()
            }
        }

        ko.applyBindings(this.vm)
    }

    connectedCallback() {
        this.render()
    }

    render() {
        this.css`
        :host {
            margin: 0;
            padding: 0;
        }
        .card {
            padding: .5em;
        }
        .container {
            height: 100%;
            overflow: hidden;
            text-align: center;
        }
        .list {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-around;
            min-height: 30vh;
            width: 100%;
        }
        `
    }
}
customElements.define("rt-home",Home)