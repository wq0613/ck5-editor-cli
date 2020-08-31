import Command from '@ckeditor/ckeditor5-core/src/command';
import {qiniuUpload } from './utils.js'
export default class uploadPPT extends Command {
  execute( options  ) {
    const editor = this.editor;
    const model = this.editor.model;
    const insertAtSelection = model.createSelection( model.document.selection ) 
    const persentSelection  = model.createSelection( model.document.selection ) 
    const officeConfig = this.editor.config.get('upload')
    this.upload(options.file,persentSelection)
    .then(url=>{
      officeConfig.$pptAdd&&officeConfig.$pptAdd(url)
      editor.model.deleteContent (persentSelection) //删除区域
      if(url){
        editor.model.change( writer => {
          const ppt = writer.createElement( 'ppt',{
            url
          });
          model.insertContent( ppt, insertAtSelection);
          writer.setSelection( ppt, 'on' );
        } );
      }
      
    })
    .catch(err=>{
      console.log(err)
      console.log('解析失败')
    })
    
    
	}
  refresh() {
		const model = this.editor.model;
    this.value = model.document.selection.hasAttribute( this.attributeKey );
    this.isEnabled = true
  }
  upload(file,selection){
    return qiniuUpload(file,
      `${file.name.replace(/(.+)(\..+)/,function(c1,c2,c3){
        return `pptx${new Date().getTime()}${Math.floor(Math.random()*1000)}${c3}`})}`,
      this.editor,selection,'progress')
		.then(res=>{
			return 'http://shixun.terabits.cn/' + res.key		
		})
	}
  // uploadPPTFile(editor,file){
  //   const options = this.editor.config.get('upload')
  //   const waiting = options.waiting
  //   const end = options.end
  //   const pptUpload = options.pptUpload
  //   if(pptUpload){
  //     waiting&&waiting()
  //     return pptUpload(file)
  //     .then(msg=>{
  //       end&&end()
  //       return msg
  //     })

  //   }else{
  //     console.log('未支持上传ppt')
  //   }
    
  // }

  

  
}
