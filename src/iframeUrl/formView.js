/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module media-embed/ui/mediaformview
 */

import View from '@ckeditor/ckeditor5-ui/src/view';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';

import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import LabeledInputView from '@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview';
import InputTextView from '@ckeditor/ckeditor5-ui/src/inputtext/inputtextview';

import submitHandler from '@ckeditor/ckeditor5-ui/src/bindings/submithandler';
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';
import FocusCycler from '@ckeditor/ckeditor5-ui/src/focuscycler';
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';

import checkIcon from '@ckeditor/ckeditor5-core/theme/icons/check.svg';
import cancelIcon from '@ckeditor/ckeditor5-core/theme/icons/cancel.svg';



export default class iframeFormView extends View {


	constructor(  locale ) {
		super( locale );

		const t = locale.t;


		this.focusTracker = new FocusTracker();


		this.keystrokes = new KeystrokeHandler();


		this.urlInputView = this._createUrlInput();

    
    
		this.saveButtonView = this._createButton( t( 'Save' ), checkIcon, 'ck-button-save' );
		this.saveButtonView.type = 'submit';

    
    
		this.cancelButtonView = this._createButton( t( 'Cancel' ), cancelIcon, 'ck-button-cancel', 'cancel' );

		
		this._focusables = new ViewCollection();

    
    
		this._focusCycler = new FocusCycler( {
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				// Navigate form fields backwards using the Shift + Tab keystroke.
				focusPrevious: 'shift + tab',

				// Navigate form fields forwards using the Tab key.
				focusNext: 'tab'
			}
		} );

		
		// this._validators = validators;

		this.setTemplate( {
			tag: 'form',

			attributes: {
				class: [
					'ck',
					'ck-iframe-form'
				],

				tabindex: '-1'
			},

			children: [
				this.urlInputView,
				this.saveButtonView,
				this.cancelButtonView
			]
		} );

		/**
		 * The default info text for the {@link #urlInputView}.
		 *
		 * @private
		 * @member {String} #_urlInputViewInfoDefault
		 */

		/**
		 * The info text with an additional tip for the {@link #urlInputView},
		 * displayed when the input has some value.
		 *
		 * @private
		 * @member {String} #_urlInputViewInfoTip
		 */
	}

	/**
	 * @inheritDoc
	 */
	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		const childViews = [
			this.urlInputView,
			this.saveButtonView,
			this.cancelButtonView
		];

		childViews.forEach( v => {
			// Register the view as focusable.
			this._focusables.add( v );

			// Register the view in the focus tracker.
			this.focusTracker.add( v.element );
		} );

		// Start listening for the keystrokes coming from #element.
		this.keystrokes.listenTo( this.element );

		const stopPropagation = data => data.stopPropagation();

		// Since the form is in the dropdown panel which is a child of the toolbar, the toolbar's
		// keystroke handler would take over the key management in the URL input. We need to prevent
		// this ASAP. Otherwise, the basic caret movement using the arrow keys will be impossible.
		this.keystrokes.set( 'arrowright', stopPropagation );
		this.keystrokes.set( 'arrowleft', stopPropagation );
		this.keystrokes.set( 'arrowup', stopPropagation );
		this.keystrokes.set( 'arrowdown', stopPropagation );

		// Intercept the "selectstart" event, which is blocked by default because of the default behavior
		// of the DropdownView#panelView.
		// TODO: blocking "selectstart" in the #panelView should be configurable per–drop–down instance.
		this.listenTo( this.urlInputView.element, 'selectstart', ( evt, domEvt ) => {
			domEvt.stopPropagation();
		}, { priority: 'high' } );
	}

	/**
	 * Focuses the fist {@link #_focusables} in the form.
	 */
	focus() {
		// this._focusCycler.focusFirst();
	}

	/**
	 * The native DOM `value` of the {@link #urlInputView} element.
	 *
	 * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
	 * which works one way only and may not represent the actual state of the component in the DOM.
	 *
	 * @type {Number}
	 */
	get url() {
		return this.urlInputView.inputView.element.value.trim();
	}

	/**
	 * Sets the native DOM `value` of the {@link #urlInputView} element.
	 *
	 * **Note**: Do not confuse it with the {@link module:ui/inputtext/inputtextview~InputTextView#value}
	 * which works one way only and may not represent the actual state of the component in the DOM.
	 *
	 * @param {String} url
	 */
	set url( url ) {
		this.urlInputView.inputView.element.value = url.trim();
	}


	


	resetFormStatus() {
		this.urlInputView.errorText = null;
		this.urlInputView.infoText = this._urlInputViewInfoDefault;
	}

	/**
	 * Creates a labeled input view.
	 *
	 * @private
	 * @returns {module:ui/labeledinput/labeledinputview~LabeledInputView} Labeled input view instance.
	 */
	_createUrlInput() {
		const t = this.locale.t;

		const labeledInput = new LabeledInputView( this.locale, InputTextView );
		const inputView = labeledInput.inputView;

		this._urlInputViewInfoDefault = t( '请输入iframe代码' );
		this._urlInputViewInfoTip = t( '将媒体网站的iframe代码粘贴到输入框即可渲染' );

		labeledInput.label = t( 'iframe代码' );
		labeledInput.infoText = this._urlInputViewInfoDefault;
		inputView.placeholder = 'https://example.com';

		inputView.on( 'input', () => {
			// Display the tip text only when there's some value. Otherwise fall back to the default info text.
			labeledInput.infoText = inputView.element.value ? this._urlInputViewInfoTip : this._urlInputViewInfoDefault;
		} );

		return labeledInput;
	}

	/**
	 * Creates a button view.
	 *
	 * @private
	 * @param {String} label The button label.
	 * @param {String} icon The button icon.
	 * @param {String} className The additional button CSS class name.
	 * @param {String} [eventName] An event name that the `ButtonView#execute` event will be delegated to.
	 * @returns {module:ui/button/buttonview~ButtonView} The button view instance.
	 */
	_createButton( label, icon, className, eventName ) {
		const button = new ButtonView( this.locale );

		button.set( {
			label,
			icon,
			tooltip: true
		} );

		button.extendTemplate( {
			attributes: {
				class: className
			}
		} );

		if ( eventName ) {
			button.delegate( 'execute' ).to( this, eventName );
		}

		return button;
	}
}

/**
 * Fired when the form view is submitted (when one of the children triggered the submit event),
 * e.g. click on {@link #saveButtonView}.
 *
 * @event submit
 */

/**
 * Fired when the form view is canceled, e.g. click on {@link #cancelButtonView}.
 *
 * @event cancel
 */
