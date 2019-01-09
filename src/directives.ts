import { Core } from './core';
import { Utils } from './utils';

// export function _value(array, data, loopParams) {
export function _value(node, value) {
    // array.forEach(item => {
        let //params = item.attr.split('|'),
            r;
        let rowHtml = false;

        r = this.component[value];//this.getPropsByScope(params[0], data, loopParams);
        //Utils.applyFormatter(r, params[1]);

        if (Utils.isCustomElement(node) === false) {
            if (node.localName === 'input') {
                switch (node.type) {
                    case 'checkbox':
                        r ? node.setAttribute('checked', true) : node.removeAttribute('checked');
                        break;
                    case 'radio':
                        node.value == r ? node.setAttribute('checked', true) : node.removeAttribute('selected');
                        break;
                    default:
                        node.value = r;
                    break;

                }
            } else {
                rowHtml ? (node.innerHTML = r) : (node.textContent = r);
            }
        } else {
            // node.COMPONENT._onModelChange(r);
        }
}


export function _model(node, value) {//array, loopParams, collectionName, data) {
    // array.forEach(item => {

        // if (item.attr === loopParams) {
        //     throw new Error('Cannot assign to a reference or variable; ' + this.constructor.name + '; ' + collectionName);
        // }
        if (node.localName === 'input') {

            switch (node.type) {
                case 'checkbox':
                    node.addEventListener('change', (e) => {
                        // this.setComponentVariable(item.attr, e.currentTarget.checked ? true : false);
                        this.component[value] = e.currentTarget.checked ? true : false;
                    }, false);
                    break;
                case 'radio':
                    node.addEventListener('change', (e) => {
                        // this.setComponentVariable(item.attr, e.currentTarget.value);
                        this.component[value] =  e.currentTarget.value;
                    }, false);
                    break;
                case 'text':
                case 'email':
                case 'password':
                    node.addEventListener('input', (e) => {
                        this.component[value] =  e.currentTarget.value;
                        // this.setComponentVariable(item.attr, e.currentTarget.value, loopParams, collectionName, data);
                    }, false);
                    break;
            }

        }

        if (Utils.isCustomElement(node)) {
            node.addEventListener('modelChange', (e) => {
                // this.setComponentVariable(item.attr, e.detail);
            }, false);
        }
    // });
}

export function _class(node, value) {//array, data, loopParams) {

    let a = value.replace(/ +/g, "").split(',');
    let params = a[0].replace(/ +/g, "").split(':');
    let className = params[0];
    let r =   this.component[params[1]];
    r ? (node.classList.add(className)) : (node.classList.remove(className));
    
    // array.forEach((item) => {
        // let array = item.attr.replace(/ +/g, "").split(',');
        // let attr = item.attr;
        // let root = item.elem;

        // array.forEach(prop => {
        //     try {
        //         if (prop[0] === '@') {
        //             let params = prop.split('@');
        //             let r;

        //             if (item.prev) {
        //                 root.classList.remove(item.prev)
        //             }

        //             // inside ac-for
        //             r = this.getPropsByScope(params[1], data, loopParams);

        //             //remove previous class
        //             item.prev = r;

        //             if (r) {
        //                 root.classList.add(r)
        //             }
        //         } else {
        //             let params = prop.replace(/ +/g, "").split(':');
        //             let className = params[0];
        //             let r;

        //             // inside ac-for
        //             r = this.getPropsByScope(params[1], data, loopParams);

        //             r ? (root.classList.add(className)) : (root.classList.remove(className));
        //         }
        //     } catch (err) {
        //         throw new Error(this.constructor.name + '; ' + err);
        //     }
        // });
    // });
}