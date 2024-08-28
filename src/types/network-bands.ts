

export interface NetworkBandsType {
    
        id: number;
        // name: text("name"),
        country: string;
        content: any;
        admin_detail: any,
        admin_detail_edit:any,
      
        createdAt: string,
        updatedAt: string,
      
}
export interface GlossaryType {
    
        id: number;
        // name: text("name"),
        display_name: string;
        content: any;
        route: string;
        
        admin_detail: any,
        admin_detail_edit:any,
      
        createdAt: string,
        updatedAt: string,
      
}

export interface NetworkBandsCreateType {
        country: string;
        content: any;
}
export interface GlossaryCreateType {
        route: string;
        display_name:string;
        content: any;
}


interface GlossaryItem {
  display_name: string;
  route:string
}

export interface GlossaryGroup {
  type: string;
  data: GlossaryItem[];
}