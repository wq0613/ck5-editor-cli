import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {  createDropdown ,addToolbarToDropdown} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import iframeFormView from './formView';
export default class iframeUrl extends Plugin {
  static get requires() {
      return [ ];
  }

  init() {
    const editor = this.editor;
    editor.ui.componentFactory.add( 'iframeUrl', locale => {
      const dropdownView = createDropdown( locale,); //创建可下拉视图
      
      this.form = new iframeFormView(  editor.locale );
      dropdownView.panelView.children.add( this.form  );

      dropdownView.buttonView.set( {  //设置下拉视图按钮样式
        withText: true, 
        label: 'iframe',
        tooltip: true,
        
    } );
      function closeUI() {
        editor.editing.view.focus();
        dropdownView.isOpen = false;
      }


 

      // addListToDropdown(dropdownView,items)  //将列表放入下拉按钮中

      return dropdownView;
    } );
  }
  


}

