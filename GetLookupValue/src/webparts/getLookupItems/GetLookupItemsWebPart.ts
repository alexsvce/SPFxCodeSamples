import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'GetLookupItemsWebPartStrings';
import GetLookupItems from './components/GetLookupItems';
import { IGetLookupItemsProps } from './components/IGetLookupItemsProps';

export interface IGetLookupItemsWebPartProps {
  description: string;
}
//test
export default class GetLookupItemsWebPart extends BaseClientSideWebPart<IGetLookupItemsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGetLookupItemsProps > = React.createElement(
      GetLookupItems,
      {
        description: this.properties.description,
        //siteurl: this.context.pageContext.web.absoluteUrl
        siteurl:"https://myofficedevcloud.sharepoint.com/sites/DeveloperSite"
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
