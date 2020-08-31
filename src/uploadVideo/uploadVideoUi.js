import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { addListToDropdown, createDropdown ,addToolbarToDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import  uploadEditing from './uploadEditing.js' //引入命令
import FileDialogButtonView from '@ckeditor/ckeditor5-upload/src/ui/filedialogbuttonview';
export default class uploadVideoButton extends Plugin {
  static get requires() {
      return [ uploadEditing ];
  }

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add( 'uploadVideo', locale => {
      const dropdownView = createDropdown( locale,); //创建可下拉视图
      dropdownView.buttonView.set( {  //设置下拉视图按钮样式
          withText: true, 
          label: '文件解析',
          tooltip: true,
          
      } );

      const uploadFile = new FileDialogButtonView( locale ); //上传文件button
      const uploadWord = new FileDialogButtonView( locale );
      const uploadPPT = new FileDialogButtonView( locale );
      function closeUI() {
        editor.editing.view.focus();
        dropdownView.isOpen = false;
      }
      uploadFile.set( {
				acceptedType: '*',
				allowMultipleFiles: false
			} );
      
      uploadWord.set( {
				acceptedType: '*',
				allowMultipleFiles: false
      } );
      uploadPPT.set( {
				acceptedType: '*',
				allowMultipleFiles: false
      } );
      

			uploadFile.buttonView.set( {
        withText: true,
        label: '上传视频文件',
        commandName:'uploadVideo',
				tooltip: true
      } );
      
      uploadWord.buttonView.set( {
        withText: true,
        label: '上传word文档',
        commandName:'uploadWord',
				tooltip: true
      } );
      uploadPPT.buttonView.set( {
        withText: true,
        label: '上传PPT文件',
        commandName:'uploadPPT',
				tooltip: true
      } );
      
      
      const beforeUpload = this.editor.config.get('upload').beforeUpload
      //video
			uploadFile.on( 'done', ( evt, files ) => {
        const types = ["video/mp4"]
        var file = files[0]
        var size =file.size / 1024 / 1024
        if(types.indexOf(file.type)==-1 && file.name.indexOf('.mp4')==-1){
          beforeUpload&&beforeUpload('请选择MP4格式文件')
          return
        }
        if(size>500){
          beforeUpload&&beforeUpload('mp4文件不能大于500M')
          return
        }
        editor.commands.get( 'uploadVideo' ).execute( { file: files[0] } )
        closeUI()
      } );
      //word
      uploadWord.on( 'done', ( evt, files ) => {
				const types = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
        var file = files[0]
        var size =file.size / 1024 / 1024
        if(types.indexOf(file.type)==-1 && file.name.indexOf('.docx')==-1){
          beforeUpload&&beforeUpload('请选择docx格式文件')
          return
        }
        if(size>50){
          beforeUpload&&beforeUpload('docx文件不能大于50M')
          return
        }
        editor.commands.get( 'uploadWord' ).execute( { file: files[0] } )
        closeUI()
      } );
      //ppt
      uploadPPT.on( 'done', ( evt, files ) => {
				const types = ["application/vnd.openxmlformats-officedocument.presentationml.presentation"]
        var file = files[0]
        var size =file.size / 1024 / 1024
        if(types.indexOf(file.type)==-1 && file.name.indexOf('.pptx')==-1){
          beforeUpload&&beforeUpload('请选择pptx格式文件')
          return
        }
        if(size>50){
          beforeUpload&&beforeUpload('ppt文件不能大于50M')
          return
        }
          editor.commands.get( 'uploadPPT' ).execute( { file: files[0] } )
          closeUI()
      } );
      // const items = new Collection(); //创建下拉菜单
      // const enterUrl = { //定义输入地址按钮
			// 	type: 'button',
      //   model: new Model( {
      //       withText: true,
      //       label: '上传word文档',
      //       commandName:'enterUrl'
      //   } )
      // };
      // this.listenTo( dropdownView, 'execute', evt => {
      //   editor.execute( 'uploadFile' )
      // } );
      

      addToolbarToDropdown( dropdownView, [uploadFile,uploadWord,uploadPPT] );
      dropdownView.toolbarView.isVertical = true;
      // items.add({
      //   type:'button',
      //   model:uploadFile
      // });  //将按钮放入列表中
      
      // items.add( {
      //   type:'button',
      //   model:uploadWord
      // } );

      // items.add( {
      //   type:'button',
      //   model:uploadPPT
      // } );

      // addListToDropdown(dropdownView,items)  //将列表放入下拉按钮中

      return dropdownView;
    } );
  }


}