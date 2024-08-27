

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

export interface NetworkBandsCreateType {
        country: string;
        content: any;
}