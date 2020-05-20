import {Knockdown, Koc} from '@avickers/knockdown'
import Button from 'weightless/button'
import Icon from 'weightless/icon'
import ListItem from 'weightless/list-item'
import Nav from 'weightless/nav'

const ko = new Knockdown(document)

const vm = {
    toggleSide() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }
}

ko.applyBindings(vm)

const routes = {
    '/': () => import('./routes/home'),
    '/about': () => import('./routes/about')
}

class App extends Koc {
    constructor() {
        const self = super()
        const ko = this.ko()

        this.routes = new Map()

        this.vm = {
            content: ko.observable(null),
            route: ko.observable(window.location.pathname).watch(nv => {
                history.pushState({}, '', nv)
                window.dispatchEvent(new Event('popstate'))
            })
        }
        ko.applyBindings(this.vm)

        window.addEventListener('popstate', ev => {
            this.render()
        })

        this.html`<div class="content" data-bind="html: content"></div>`
    }

    connectedCallback() {
        this.mapRoutes(routes)
        this.render()
    }

    mapRoutes(map) {
        if(Symbol.iterator in Object(map)) {
            map.forEach(element => {
               this.routes.set(element[0],element[1]) 
            })
        } else {
            Object.entries(map).forEach(element => this.routes.set(element[0],element[1]))
        }
    }

    render() {
        const navRect = document.querySelector('wl-nav').getBoundingClientRect()
        this.css`
        :host {
            margin: 0;
            padding: 0;
        }
        .content {
            height: calc(100vh - ${navRect.height}px);
        }
        `

        const route = window.location.pathname === '/home'
        ? '/'
        : window.location.pathname
        try {
            this.routes.get(route).call().then(res => {
                this.vm.content.set(new res.default())
            })
        } catch (error) {
            console.error(error)
        }
    }
}
customElements.define("ko-app",App)