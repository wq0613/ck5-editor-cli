import Command from '@ckeditor/ckeditor5-core/src/command';
import mammoth from 'mammoth';
import {qiniuUpload ,dataURLtoFile} from './utils.js'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
export default class uploadWord extends Command {
  execute( options  ) {
		const editor = this.editor;
    this.praseHtml(editor,options.file)
	}
  refresh() {
		const model = this.editor.model;
    this.value = model.document.selection.hasAttribute( this.attributeKey );
    this.isEnabled = true
  }
  praseHtml(editor,file){
    const options = this.editor.config.get('upload')
    const $imgAdd =options.$imgAdd
    const waiting = options.waiting
    const end = options.end
    
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e){
      let buffer = e.target.result  //此时是arraybuffer类型
      waiting&&waiting()
      mammoth
        .convertToHtml(
          { arrayBuffer: buffer},
          {
            convertImage: mammoth.images.imgElement(async function(image) {
              let res = await image.read('base64').then(function(imageBuffer) {
                let blob = dataURLtoFile(imageBuffer)
                return  qiniuUpload(blob,`pic_${Date.now()}${Math.floor(Math.random()*1000)}`,editor)
                
              })
              $imgAdd&&$imgAdd('http://shixun.terabits.cn/' + res.key)
              return {
                src: 'http://shixun.terabits.cn/' + res.key
              };
                
              
            })
          }
        )
        .then(function(result) {
          editor.data.set(result.value)
          end&&end()
        })
        .done();

      
    }
  }

  

  
}
