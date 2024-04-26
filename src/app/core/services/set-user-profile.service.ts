import { Injectable } from '@angular/core';
import { LeftMenuCssModel, NavBarCssModel, RightPageCssModel, ShortCutCssModel, TableCssModel, UserDesignProfileCssModel  } from '../models/user-design-profile';


@Injectable({
  providedIn: 'root'
})
export class SetUserProfileService {

  private  userProfileCssModel:UserDesignProfileCssModel = new UserDesignProfileCssModel()

  constructor() { }

  GetModel():UserDesignProfileCssModel
  {
    return this.userProfileCssModel
  }

  GetTableCssModel():TableCssModel
  {
    return this.userProfileCssModel.tableCssModel
  }

  GetShortCutCssModel():ShortCutCssModel
  {
    return this.userProfileCssModel.shortCutCssModel
  }

  GetRightPageCssModel():RightPageCssModel
  {
    return this.userProfileCssModel.rightPageCssModel
  }

  GetLeftMenuCssModel():LeftMenuCssModel
  {
    return this.userProfileCssModel.leftMenuCssModel
  }

  GetNavBarCssModel():NavBarCssModel
  {
    return this.userProfileCssModel.navBarCssModel
  }
  Reset()
  {
    this.userProfileCssModel = new UserDesignProfileCssModel()
  }

  Read(){

    const data = localStorage.getItem('userProfile');
    if(data)
    {
      const obj :UserDesignProfileCssModel= JSON.parse(data)
      this.userProfileCssModel = JSON.parse(JSON.stringify(obj))
    }
   
  }
}
