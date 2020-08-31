/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';


import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock';//代码块
import Font from '@ckeditor/ckeditor5-font/src/font';//字体和颜色
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';//水平线
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';


import uploadVideoButton from './uploadVideo/uploadVideoUi.js'
export default class ClassicEditor extends ClassicEditorBase {}
//https://ckeditor.com/docs/ckeditor5/latest/api/module_editor-classic_classiceditor-ClassicEditor.html
// Plugins to include in the build.

ClassicEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	TextTransformation,
	CodeBlock,
	Font,
	HorizontalLine,
	ImageResize,
	TableProperties,
	TableCellProperties,
	Alignment,
	uploadVideoButton,
	WordCount,
];

const customColorPalette = [
	{
			color: 'hsl(4, 90%, 58%)',
			label: 'Red'
	},
	{
			color: 'hsl(340, 82%, 52%)',
			label: 'Pink'
	},
	{
			color: 'hsl(291, 64%, 42%)',
			label: 'Purple'
	},
	{
			color: 'hsl(262, 52%, 47%)',
			label: 'Deep Purple'
	},
	{
			color: 'hsl(231, 48%, 48%)',
			label: 'Indigo'
	},
	{
			color: 'hsl(207, 90%, 54%)',
			label: 'Blue'
	},

];


// Editor configuration.
ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			// 'heading',//段落
			'bold', //加粗
			'italic',//斜体
			'link',//下划线
			'blockQuote',//引用
			'bulletedList',//无序索引
			'numberedList',//有序索引
			'|',
			'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
			'|',
			'HorizontalLine',//水平线
			'Alignment',
			'indent',//减少缩进
			'outdent',//增加缩进		
			// '|',
			// 'imageUpload',//上传图片
			// 'insertTable',//插入表格
			// 'mediaEmbed',//插入媒体
			'CodeBlock',
			// 'uploadVideo',
			'|',
			'undo',//撤回
			'redo',//前进
		]
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableProperties', 'tableCellProperties'
		],
		// Set the palettes for tables.
			tableProperties: {
				borderColors: customColorPalette,
				backgroundColors: customColorPalette
		},

		// Set the palettes for table cells.
		tableCellProperties: {
				borderColors: customColorPalette,
				backgroundColors: customColorPalette
		}
	},
	// heading: {
	// 	options: [
	// 			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
	// 			{ model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
	// 			{ model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
	// 			{
	// 					model: 'headingFancy',
	// 					view: {
	// 							name: 'h2',  //呈现的html节点
	// 							classes: 'fancy' //呈现的html节点class
	// 					},
	// 					title: 'Heading 2 (fancy)',  //菜单名称
	// 					class: 'ck-heading_heading2_fancy', //菜单节点class

	// 					// It needs to be converted before the standard 'heading2'.
	// 					converterPriority: 'high' // 样式优先级
	// 			}
	// 	]
	// },
	fontSize: {
			options: [
					9,
					11,
					13,
					'default',
					17,
					19,
					21
			]
	},
	fontColor: {
		colors: [
				{
						color: 'hsl(0, 0%, 0%)',
						label: 'Black'
				},
				{
						color: 'hsl(0, 0%, 30%)',
						label: 'Dim grey'
				},
				{
						color: 'hsl(0, 0%, 60%)',
						label: 'Grey'
				},
				{
						color: 'hsl(0, 0%, 90%)',
						label: 'Light grey'
				},
				{
						color: 'hsl(0, 0%, 100%)',
						label: 'White',
						hasBorder: true
				},
		]
},
	fontBackgroundColor: {
			colors: [
					{
							color: 'hsl(0, 75%, 60%)',
							label: 'Red'
					},
					{
							color: 'hsl(30, 75%, 60%)',
							label: 'Orange'
					},
					{
							color: 'hsl(60, 75%, 60%)',
							label: 'Yellow'
					},
					{
							color: 'hsl(90, 75%, 60%)',
							label: 'Light green'
					},
					{
							color: 'hsl(120, 75%, 60%)',
							label: 'Green'
					},

			]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'zh-cn'
};

