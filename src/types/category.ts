

export interface CategoryTypes {
    id: number;
    title: string;
    sub_categories: { title: string }[]
    updateAt: string;
    createdAt: string;
}

export interface BrandTypes {
    id: number;
    title: string;
    image: string;
    // updateAt: string;
    // createdAt: string;
    admin_detail: unknown;
    admin_detail_edit: unknown;
    createdAt: Date;
    updateAt: Date;
} 