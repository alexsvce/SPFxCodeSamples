import * as React from 'react';
import styles from './GetLookupItems.module.scss';
import { IGetLookupItemsProps } from './IGetLookupItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
export interface IListItemsState{  
  items:[  
        {  
          "Title": "",  
          "ID": ""  ,   
          "TaskLookup":{
            Title:string;
          }
        }]  
} 

export default class GetLookupItems extends React.Component<IGetLookupItemsProps, IListItemsState> {
  constructor(props: IGetLookupItemsProps,state:IListItemsState) {  
    super(props);  
    this.state = {  
      items: [
        {
          "Title": "",  
          "ID": "",
          "TaskLookup":{
            Title:""
          }        
      }
      ]  
    };   
  }
  //test

  public componentDidMount(){  
    var reactHandler = this;  
    jquery.ajax({  
        url: this.props.siteurl+"/_api/web/lists/getbytitle('TestList')/items?$select=Id,Title,TaskLookup/Title&$expand=TaskLookup/Title",  
        type: "GET",          
        headers:{'Accept': 'application/json; odata=verbose;'},  
        success: function(resultData) {  
          reactHandler.setState({  
            items: resultData.d.results  
          });  
        },  
        error : function(jqXHR, textStatus, errorThrown) {  
        }  
    });
  }
 
  public render(): React.ReactElement<IGetLookupItemsProps> {
    return (
      <div>
        <br/>
        <br/>
        <div >
         <div> Demo : Retrieve SharePoint List Items using 
         SPFx , REST API  and React JS  
         </div> 
         <br/>
         <div className={ styles.headerCaptionStyle }>  TestList Details</div>
            <div className={ styles.tableStyle }></div>
                <div className={ styles.headerStyle }></div>
                <div className={ styles.CellStyle }>Title 
            </div>
            <div className={ styles.CellStyle }>ID
            </div>
            <div className={ styles.CellStyle }>TaskLookupTitle
            </div>
            {this.state.items.map(function(item,key){                  
                return (<div className={styles.rowStyle} >  
                    <div className={styles.CellStyle}>{item.Title}</div>  
                    <div className={styles.CellStyle}>{item.ID}</div>  
                    <div className={styles.CellStyle}>{item.TaskLookup.Title}</div>  
                  </div>);  
              })}         
          </div>        
          </div>
    );
  }
}
