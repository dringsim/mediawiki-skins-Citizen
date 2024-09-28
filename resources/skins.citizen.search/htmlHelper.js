/**
 * @typedef {Object} TypeaheadItemData
 * @property {string} id
 * @property {string} type
 * @property {string} link
 * @property {string} icon
 * @property {string} thumbnail
 * @property {string} title
 * @property {string} label
 * @property {string} desc
 */

/**
 * Return an object containing functions to handle HTML elements for a typeahead component.
 *
 * @return {Object} An object with functions for creating, updating, and removing HTML elements for a typeahead component.
 */
function htmlHelper() {
	return {
		/**
		 * Generate menu item HTML using the existing template
		 *
		 * @param {TypeaheadItemData} data
		 * @return {HTMLElement|void}
		 */
		getItemElement: function ( data ) {
			// TODO: Should we use template element or Mustache or just Javascript?
			const template = document.getElementById( 'citizen-typeahead-template' );

			// Shouldn't happen but just to be safe
			if ( !( template instanceof HTMLTemplateElement ) ) {
				return;
			}

			const
				fragment = template.content.cloneNode( true ),
				item = fragment.querySelector( '.citizen-typeahead__item' );

			this.updateItemElement( item, data );
			return fragment;
		},
		/**
		 * Update typeahead item element
		 *
		 * @param {HTMLElement} item
		 * @param {TypeaheadItemData} data
		 */
		updateItemElement: function ( item, data ) {
			if ( data.id ) {
				item.setAttribute( 'id', data.id );
			}
			if ( data.type ) {
				item.classList.add( `citizen-typeahead__item-${ data.type }` );

				if ( data.type !== 'placeholder' ) {
					item.setAttribute( 'role', 'option' );
				}
			}

			if ( data.size ) {
				item.classList.add( `citizen-typeahead__item-${ data.size }` );
			}
			if ( data.link ) {
				item.querySelector( '.citizen-typeahead__content' ).setAttribute( 'href', data.link );
			}
			if ( data.icon || data.thumbnail ) {
				const thumbnail = item.querySelector( '.citizen-typeahead__thumbnail' );
				if ( data.thumbnail ) {
					thumbnail.style.backgroundImage = `url('${ data.thumbnail }')`;
				} else {
					thumbnail.classList.add(
						'citizen-typeahead__thumbnail',
						'citizen-ui-icon',
						`mw-ui-icon-wikimedia-${ data.icon }`
					);
				}
			}
			if ( data.title ) {
				// Required to use innerHTML because of highlightText
				item.querySelector( '.citizen-typeahead__title' ).innerHTML = data.title;
			}
			if ( data.label ) {
				item.querySelector( '.citizen-typeahead__label' ).innerHTML = data.label;
			}
			if ( data.desc ) {
				item.querySelector( '.citizen-typeahead__description' ).textContent = data.desc;
			}
		}
	};
}

/** @module htmlHelper */
module.exports = htmlHelper;
