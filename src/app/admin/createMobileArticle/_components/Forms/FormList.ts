
export interface FirstTopFormListType {
    name: string;
    placeholder: string;
    gridXs: number;  // adjust the grid size according to your needs (1-12)
}

export const FirstTopFormList: FirstTopFormListType[] = [
    {
        name: "title",
        placeholder: "Title",
        gridXs: 3.5
    },

    {
        name: "market_status",
        placeholder: "Market Status",
        gridXs: 3
    },
    {
        name: "release_date",
        placeholder: "Release Date",
        gridXs: 3
    }
]
export const LastTopFormList: FirstTopFormListType[] = [
    {
        name: "thickness",
        placeholder: "Thickness",
        gridXs: 3
    }, {
        name: "os",
        placeholder: "Os",
        gridXs: 3
    },
    {
        name: "ram_storage",
        placeholder: "Storage",
        gridXs: 3
    },
    {
        name: "pixel",
        placeholder: "Pixel",
        gridXs: 3.5
    },
    {
        name: "camera",
        placeholder: "Camera",
        gridXs: 3.5
    },
    {
        name: "ram_chipset",
        placeholder: "Ram Chipset",
        gridXs: 4
    },
    {
        name: "battery",
        placeholder: "Battery",
        gridXs: 3.5
    },
]

