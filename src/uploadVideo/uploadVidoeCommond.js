import Command from '@ckeditor/ckeditor5-core/src/command';
import {qiniuUpload } from './utils.js'
export default class uploadVideo extends Command {
  execute( options  ) {
		const editor = this.editor;
		const model = editor.model;
		const insertAtSelection = model.createSelection( model.document.selection ) 
		const persentSelection  = model.createSelection( model.document.selection ) 
		this.upload(options.file,persentSelection)
		.then(src=>{
			editor.model.deleteContent (persentSelection) //删除区域
			editor.model.change( writer => {
				const video = writer.createElement( 'video',{
					src
				},);
				model.insertContent( video, insertAtSelection);
				writer.setSelection( video, 'on' );
			} );

		})
		
	}
  refresh() {
		const model = this.editor.model;
    const selection = model.document.selection;
		this.isEnabled = true;
	}
	
	upload(file,selection){
		const options = this.editor.config.get('upload')
		const videoAdd = options.$videoAdd
	 return qiniuUpload(file,`${file.name.replace(/(.+)(\..+)/,function(c1,c2,c3){
		return `${c2}${new Date().getTime()}${Math.floor(Math.random()*1000)}${c3}`})}`,this.editor,selection,'progress')
		.then(res=>{
			videoAdd&&videoAdd('http://shixun.terabits.cn/' + res.key	)
			return 'http://shixun.terabits.cn/' + res.key		
		})
	}
}
