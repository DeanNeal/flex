import { Core } from './core';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const daysOfWeekShort = ['Mo', 'Tu', 'Wen', 'Th', 'Fr', 'Sat', 'Sun'];

export class Utils {
		static isCustomElement(element) {
		    if (element.tagName.indexOf("-") !== -1) {
		        return true;
		    }
		    let isAttribute = element.getAttribute("is");
		    if (isAttribute === null) {
		        return false;
		    }
		    return isAttribute.indexOf("-") !== -1;
		}

		static unwrap(wrapper) {
			// place childNodes in document fragment
			var docFrag = document.createDocumentFragment();
			while (wrapper.firstChild) {
				var child = wrapper.removeChild(wrapper.firstChild);
				docFrag.appendChild(child);
			}

			return docFrag;
		}

		static applyFormatter(r, params) {
		    let formatterData = params ? params.split(':') : null;
		    let formatter = params ? Utils.removeSpacesFromString(params) : null;
		    if (formatterData) {
		        formatter = formatterData[0].trim();
		        formatterData = formatterData[1] ? formatterData[1].trim() : null;
		    }


		    if (formatter && formatter === 'json') {
		        r = JSON.stringify(r);
		    } else if (formatter && formatter === 'date') {
		        r = Utils.getDateByFormat(r, formatterData || '');
		    } else if (formatter && formatter === 'html') {
		        // rowHtml = true;
		    } else if (formatter) {
		        throw new Error('Unknown formatter ' + formatter);
		    } else {
		        r = r;
		    }

		    if (!r && r !== 0) {
		        r = '';
		    }
		    return r;
		}

		static removeSpacesFromString(str) {
		    str = str || '';
		    return str.replace(/ +/g, "");
		}

		static getDateByFormat(date, format) {
	        let result = '';
	        date = new Date(date);
	        let year = date.getFullYear().toString();
	        let month = (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	        let day = date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate();
	        let hh = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
	        let mm = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
	        switch (format) {
	            case 'yyyy-mm-dd':
	                result = year + '-' + month + '-' + day;
	                break;
	            case 'yyyymmdd':
	                result = year + month + day;
	                break;
	            case 'yyyy/mm/dd':
	                result = year + '/' + month + '/' + day;
	                break;
	            case 'yyyy-mm-dd hh:mm':
	                result = year + '-' + month + '-' + day + ' ' + hh + ':' + mm;
	                break;
	            case 'hh:mm':
	                result = hh + ':' + mm;
	                break;
	            case 'dd.mm.yyyy':
	                result = day + '.' + month + '.' + year;
	                break;
	            case 'mmm dd, yyyy':
	                result = `${monthNamesShort[date.getMonth()]} ${day}, ${year}`;
	                break;
	            default:
	                result = year + '-' + month + '-' + day;
	                break;
	        }
	        return result;
	    }

	    // static setComponentVariable(string, value, loopParams, collectionName, data) {
	    //     let params = string.split('.'); /*data ? string.split('.') : ('props.' + string).split('.');*/
	    //     let lastProp = params[params.length - 1];


	    //     if(params[0] === loopParams) {
	    //         if(params.length > 1){
	    //             data[lastProp] = value;
	    //             this.props._callAll();
	    //         } 
	    //     } else {
	    //         let params = ('props.' + string).split('.');
	    //         if (params.length > 1) {
	    //             params.splice(-1, 1);
	    //         }

	    //        let target = params.reduce((o, i) => o[i], this);
	    //        if (target === this.props) { // use instanceof
	    //            // target._data[lastProp] = value;
	    //            this.props.set(lastProp, value);
	    //        } else {
	    //            target[lastProp] = value;
	    //            this.props.set(this.props.getData());
	    //        } 
	    //     }

	    // }
}