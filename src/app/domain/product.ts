export interface Product{
    id: number;
    logo: string;
    name: string;
    description: string;

    // images for each variant
    image0: string;
    image1: string;
    image2: string;
    image3: string;
    oldPrice: number;
    discountedPrice: number;
    category: string;

    // stock for each variant
    stock0: number;
    stock1: number;
    stock2: number;

    rating: number;

    // used to determine what type of products is this
    type?: string; // determine if product is AR-enabled/Discounted/All


    // used in tech with additional features like higher storage
    price0: number; 
    price1: number;
    price2: number;
    variant0: string;
    variant1: string;
    variant2: string;

    sold: number;

    /// color variant
    color0: string;
    color1: string;
    color2: string;

    

}