import * as qiniu from 'qiniu-js'

export function qiniuUpload(blob,filekey,editor,selection,type){
  const options = editor.config.get('upload')
  const TOKEN = options.token
  const getPersent = options.getPersent

  return new Promise(resolve=>{
    var key = filekey
    var observer= {
        next(res){ //进度信息
          var present = res.total.percent.toFixed(1)*1
          getPersent&&getPersent(present)
          if(type == 'progress'){
              editor.model.change( writer => {
                  const placeholder = writer.createElement( 'videoPlaceholder',{persent:present});
                  editor.model.insertContent( placeholder,selection);
              } );
          }
        },
        error(err){ //错误
            console.log(err,2)
        }, 
        complete(res){ //完成
        // console.log(res,'finish')
          resolve(res)
        }
    }
    var putExtra = {
            // fname: "picture",
            // params: {},
            // mimeType: null
        };
    var config={
        // useCdnDomain: true,
        // region: null
    }
    var observable = qiniu.upload(blob, key, TOKEN, putExtra, config)
    var subscription = observable.subscribe(observer) // 上传开始

  })
}

export function dataURLtoFile (dataurl) {
  let arr = dataurl.split(',');
  let bstr = atob(arr[0]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: 'image/*'});
}

export function createPrecent(editor,selection,persent){
  editor.model.change( writer => {
    const placeholder = writer.createElement( 'videoPlaceholder',{persent});
    const text = writer.createText( persent );
    writer.append( text, placeholder );
    editor.model.insertContent( placeholder, selection);
    if(persent == 100){

    }
  } );
}