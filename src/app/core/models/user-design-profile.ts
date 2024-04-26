
export class UserDesignProfileCssModel 
{
    navBarCssModel:NavBarCssModel = new NavBarCssModel()
    leftMenuCssModel:LeftMenuCssModel = new LeftMenuCssModel()
    rightPageCssModel:RightPageCssModel = new RightPageCssModel()
    tableCssModel:TableCssModel= new TableCssModel()
    shortCutCssModel:ShortCutCssModel=new ShortCutCssModel()
}


export class NavBarCssModel {
    'background-color': string = '#376abb'
    'color': string = '#ffffff'
}

export class LeftMenuCssModel {
    'background-color': string = '#376abb'
    'color': string = '#ffffff'
}

export class RightPageCssModel {
    'background-color': string = '#376abb'
    'color': string = '#ffffff'
}

export class TableCssModel {
    'font': string = "'Courier New', Courier, monospace"
}

export class ShortCutCssModel {
    'background-color': string = '#376abb'
    'color': string = '#ffffff'
    'width': string = '250px'
    'height': string = '250px'
    'margin': string = '5px'
    'transition': string = 'transform 0.25s linear'
    'letter-spacing': string = '5px'
    'transform_mouse_in': string = '0.95'
    'transform_mouse_out': string = '1'
}