import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import  uploadVideo from './uploadVidoeCommond.js' //引入命令
import uploadWord from './uploadWordCommond.js'
import uploadPPT from './uploadPPTCommond.js'
import { toWidget,viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';
export default class uploadEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

  init() {
    const editor = this.editor;
    const model = editor.model;
    this._defineSchema()
    this._defineConverters()
    this.editor.commands.add( 'uploadVideo', new uploadVideo( this.editor ) )
    this.editor.commands.add( 'uploadWord', new uploadWord( this.editor ) )
    this.editor.commands.add( 'uploadPPT', new uploadPPT( this.editor ) )
    
    
  }

  _defineSchema() {                                                          // ADDED
    const schema = this.editor.model.schema;
    schema.register( 'video', {
        isObject: true,
        isBlock: true,
        allowWhere: '$block',
        allowContentOf: '$root',
        allowAttributes: [ 'src' ]
    } );
    schema.register( 'source', {
        isObject: true,
        isBlock: true,
        allowWhere: '$block',
        allowAttributes: [ 'src' ]
    } );
    schema.register( 'videoPlaceholder', {
        isObject: true,
        // isBlock: true,
        allowWhere: '$block',
        // allowContentOf: '$root',
        allowAttributes: [ 'persent' ]
    } );
    schema.register( 'ppt', {
        isBlock: true,
        isObject: true, 
        allowWhere: '$block',
        // allowContentOf: '$root',
        allowAttributes: [ 'url' ]
    } );
  }

    _defineConverters() {                                                      // ADDED
        const conversion = this.editor.conversion;
        const officeConfig = this.editor.config.get('upload')


        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'video',
            },
            model: ( viewElement, modelWriter ) => {  
                var src = this.videoCopy =  viewElement.getAttribute('data-src')
                return modelWriter.createElement( 'video',{ src });
            }
        } );
        conversion.for( 'downcast' ).elementToElement( {
            model: 'video',
            view: ( modelElement, viewWriter ) => {
                const src = modelElement.getAttribute('src')||this.videoCopy
                this.videoCopy = src
                const video = viewWriter.createContainerElement( 'video', { class: 'simple-video',style:'margin:20px auto;display:block;width: 90%;', controls:"controls",'data-src':src } );
                const source = viewWriter.createContainerElement( 'source', {
                    src:src||this.videoCopy
                }, );
                viewWriter.insert( viewWriter.createPositionAt( video, 0 ), source );
                return toWidget( video, viewWriter );
            }
            
        } );


        conversion.for( 'upcast' ).elementToElement( {
            model: 'source',
            view: {
                name: 'source',
                classes: 'simple-source'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'source',
            view:  ( modelElement, viewWriter ) => {
                const src = modelElement.getAttribute('src')||this.videoCopy
                const video = viewWriter.createContainerElement( 'source', { class: 'simple-video-source',src:src||this.videoCopy } );
                return toWidget( video, viewWriter );
            },
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'source',
            view: ( modelElement, viewWriter ) => {
                const src = modelElement.getAttribute('src')||this.videoCopy
                const video = viewWriter.createContainerElement( 'source', { class: 'simple-video-source',src:src||this.videoCopy } );
                return toWidget( video, viewWriter );
            }
            
        } );


        // conversion.for( 'upcast' ).elementToElement( {
        //     view: {
        //         name:'div',
        //         model:'videoPlaceholder'
        //     },
        //     model: 'videoPlaceholder'
        // } );
        
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'videoPlaceholder',
            view: ( modelElement, viewWriter ) => {
                const persent = modelElement.getAttribute('persent')||0
                const placeholder = viewWriter.createContainerElement( 'div', { class: 'video-placeholder',style:`padding:0 15px;text-align:right;color:#fff;border-radius:20px;height:50px;background:#1890ff;line-height:50px;font-size:30px;width:${persent}%` } );
                const innerText = viewWriter.createText( `${persent}%` );
                viewWriter.insert( viewWriter.createPositionAt( placeholder, 0 ), innerText );
                return toWidget( placeholder, viewWriter );
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'videoPlaceholder',
            view: ( modelElement, viewWriter ) => {
                const persent = modelElement.getAttribute('persent')||0 
                const placeholder = viewWriter.createContainerElement( 'div', { class: 'video-placeholder',style:`padding:0 15px;text-align:right;color:#fff;border-radius:20px;height:50px;background:#1890ff;line-height:50px;font-size:30px;width:${persent}%` }  );
                const innerText = viewWriter.createText( `${persent}%` );
                viewWriter.insert( viewWriter.createPositionAt( placeholder, 0 ), innerText );
                return placeholder;
            }
            
        } );
        


        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name:'div',
                model:'ppt'
            },
            model: ( viewElement, modelWriter ) => {  
                var url = this.pptCopy =  viewElement.getChild(0).getAttribute('data-url')
                return modelWriter.createElement( 'ppt',{ url });
            }
        } );

        conversion.for( 'downcast' ).elementToElement({
            model: 'ppt',
            view: ( modelElement, viewWriter ) => {

                const url = modelElement.getAttribute('url')||this.pptCopy
                const pptContainer = viewWriter.createContainerElement( 'div',{ style: 'width:100%;max-width:1000px;margin:20px auto', });
                this.pptCopy = url
                const ppt = viewWriter.createUIElement( 'div', null, function( domDocument ) {
                    const domElement = this.toDomElement( domDocument );
                    domElement.style="width:100%;height:640px"
                    domElement.class="rich-ppt-container"
                    domElement.innerHTML = `<iframe src="${officeConfig.officeServer||'http://officeweb.terabits.cn/op/view.aspx'}?src=${url}" data-url='${url}' width='100%' height='100%' style="box-sizing: content-box;" frameborder='1'></iframe>`;
                    return domElement;
                } )
                viewWriter.insert( viewWriter.createPositionAt( pptContainer, 0), ppt );
                return toWidget( pptContainer, viewWriter )
            }
        })

        

        

    }



}