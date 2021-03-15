import {City,Area} from './../interfaces'
import { Category, Subcategory } from '../interfaces';

import{
    build,
    apertureOutline,
    tvOutline,
    book,
    briefcaseOutline,
    homeOutline,
    gitBranchOutline,
    pricetagsOutline,
    shirtOutline,
    busSharp,
    layersOutline,
    phonePortraitSharp,
    carSportOutline,
} from 'ionicons/icons'

export const cities: Array<City> = [
  {
    name: 'Karachi',
  },
];

export const areas: Array<Area> = [
  {
    name: 'Gulshan Iqbal',
    cityName: cities[0].name,
  },
  {
    name: 'Gulistan- e -Jauhar',
    cityName: cities[0].name,
  },
  {
    name: 'Federal B Area.',
    cityName: cities[0].name,
  },
  {
    name: 'PECHS',
    cityName: cities[0].name,
  },
  {
    name: 'Defence',
    cityName: cities[0].name,
  },
  {
    name: 'Kaneez Fatima',
    cityName: cities[0].name,
  },
  {
    name: 'Landhi',
    cityName: cities[0].name,
  },
  {
    name: 'Korangi',
    cityName: cities[0].name,
  },
  {
    name: 'Malir',
    cityName: cities[0].name,
  },
  {
    name: 'Shah Faisal',
    cityName: cities[0].name,
  },
  {
    name: 'Clifton',
    cityName: cities[0].name,
  },
  {
    name: 'Bufferzone',
    cityName: cities[0].name,
  },
  {
    name: 'Gulberg',
    cityName: cities[0].name,
  },
  {
    name: 'Ayesha Manzil',
    cityName: cities[0].name,
  },
  {
    name: 'Karimabad',
    cityName: cities[0].name,
  },
  {
    name: 'Waterpump',
    cityName: cities[0].name,
  },
  {
    name: 'Surjani',
    cityName: cities[0].name,
  },
  {
    name: '4k Chowrangi',
    cityName: cities[0].name,
  },
  {
    name: 'PowerHouse',
    cityName: cities[0].name,
  },
  {
    name: 'UP',
    cityName: cities[0].name,
  },
  {
    name: 'Nagan Chowrangi',
    cityName: cities[0].name,
  },
  {
    name: 'Shadman',
    cityName: cities[0].name,
  },
  {
    name: 'Nazimabad',
    cityName: cities[0].name,
  },
  {
    name: 'Lalokhait',
    cityName: cities[0].name,
  },
  {
    name: 'Golimaar',
    cityName: cities[0].name,
  },
  {
    name: 'Saddar',
    cityName: cities[0].name,
  },
  {
    name: 'Soldier Bazaar',
    cityName: cities[0].name,
  },
];

// {
//     id: 'mechanics',
//     title: 'Mechanics',
//     iconName: build,
//   },
//   {
//     id: 'beauticians',
//     title: 'Beauticians',
//     iconName: apertureOutline,
//   },
//   {
//     id: 'electronic-items',
//     title: 'Electronic Items',
//     iconName: tvOutline,
//   },

export const categories: Array<Category> = [
    {
      id: 'mechanics',
      title: 'Mechanics',
      iconName: build,
    },
    {
      id: 'beauticians',
      title: 'Beauticians',
      iconName: apertureOutline,
    },
    {
      id: 'electronic-items',
      title: 'Electronic Items',
      iconName: tvOutline,
    },
    {
      id: 'education',
      title: 'Education',
      iconName: book,
    },
    {
      id: 'professional-services',
      title: 'Professional Services',
      iconName: briefcaseOutline,
    },
    {
      id: 'real-estate',
      title: 'Real Estate',
      iconName: homeOutline,
    },
    {
      id: 'services',
      title: 'Services',
      iconName: gitBranchOutline,
    },
    {
      id: 'shops',
      title: 'Shops',
      iconName: pricetagsOutline,
    },
    {
      id: 'tailor',
      title: 'Tailor',
      iconName: shirtOutline,
    },
    {
      id: 'technology',
      title: 'Technology',
      iconName: phonePortraitSharp,
    },
    {
      id: 'transport',
      title: 'Transport',
      iconName: busSharp,
    },
    {
      id: 'wholesalers',
      title: 'Whole Salers',
      iconName: layersOutline,
    },
    {
      id: 'r-for-rider',
      title: 'R For Rider',
      iconName: carSportOutline,
    },
  ];

  export const subcategories: Array<Subcategory> = [
    {
      categoryId: categories[0].id,
      categoryName:categories[0].title,
      name: 'Car',
    },
    {
      categoryId: categories[0].id,
      categoryName:categories[0].title,
      name: 'Bike',
    },
    {
      categoryId: categories[0].id,
      categoryName:categories[0].title,
      name: 'Trucks',
    },
    {
      categoryId: categories[1].id,
      categoryName:categories[1].title,
      name: 'Men',
    },
    {
      categoryId: categories[1].id,
      categoryName:categories[1].title,
      name: 'Women',
    },
    {
      categoryId: categories[2].id,
      categoryName:categories[2].title,
      name: 'Home Accessories',
    },
    {
      categoryId: categories[2].id,
      categoryName:categories[2].title,
      name: 'Mobile',
    },
    {
      categoryId: categories[2].id,
      categoryName:categories[2].title,
      name: 'TV',
    },
    {
      categoryId: categories[2].id,
      categoryName:categories[2].title,
      name: 'Computer And Laptop',
    },
    {
      categoryId: categories[3].id,
      categoryName:categories[3].title,
      name: 'Tutors',
    },
    {
      categoryId: categories[3].id,
      categoryName:categories[3].title,
      name: 'Books And Accessories',
    },
    {
      categoryId: categories[4].id,
      categoryName:categories[4].title,
      name: 'Doctors',
    },
    {
      categoryId: categories[4].id,
      categoryName:categories[4].title,
      name: 'Lawyers',
    },
    {
      categoryId: categories[5].id,
      categoryName:categories[5].title,
      name: 'Buy And Sell',
    },
    {
      categoryId: categories[5].id,
      categoryName:categories[5].title,
      name: 'Rent',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Plumber',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Electrician',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Laundry',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Labour',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Builders',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Water Suppliers',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'AC',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Carpenter',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Welder',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Locksmith',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Fumigation',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Photographer & Movie Maker',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Travel Agents',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Decorations and Event Planners',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Maid And Housekeepers',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Matrimonial',
    },
    {
      categoryId: categories[6].id,
      categoryName:categories[6].title,
      name: 'Repair',
    },
    {
      categoryId: categories[7].id,
      categoryName:categories[7].title,
      name: 'Fruits and Vegetable',
    },
    {
      categoryId: categories[7].id,
      categoryName:categories[7].title,
      name: 'Milk Shop',
    },
    {
      categoryId: categories[7].id,
      categoryName:categories[7].title,
      name: 'Butchers',
    },
    {
      categoryId: categories[7].id,
      categoryName:categories[7].title,
      name: 'Tandoor',
    },
    {
      categoryId: categories[7].id,
      categoryName:categories[7].title,
      name: 'Ready Foods',
    },
    {
      categoryId: categories[7].id,
      categoryName:categories[7].title,
      name: 'Sweets and Bakers',
    },
    {
      categoryId: categories[8].id,
      categoryName:categories[8].title,
      name: 'Men',
    },
    {
      categoryId: categories[8].id,
      categoryName:categories[8].title,
      name: 'Women',
    },
    {
      categoryId: categories[9].id,
      categoryName:categories[9].title,
      name: 'Designing',
    },
    {
      categoryId: categories[9].id,
      categoryName:categories[9].title,
      name: 'App Development',
    },
    {
      categoryId: categories[9].id,
      categoryName:categories[9].title,
      name: 'Website Development',
    },
    {
      categoryId: categories[10].id,
      categoryName:categories[10].title,
      name: 'Rent A Car',
    },
    {
      categoryId: categories[10].id,
      categoryName:categories[10].title,
      name: 'Intercity Travel',
    },
    {
      categoryId: categories[10].id,
      categoryName:categories[10].title,
      name: 'Pick and Drop',
    },
    {
      categoryId: categories[11].id,
      categoryName:categories[11].title,
      name: 'Fruits',
    },
    {
      categoryId: categories[11].id,
      categoryName:categories[11].title,
      name: 'Electronics',
    },
    {
      categoryId: categories[11].id,
      categoryName:categories[11].title,
      name: 'Others',
    },
    {
      categoryId: categories[12].id,
      categoryName:categories[12].title,
      name: 'Car',
    },
    {
      categoryId: categories[12].id,
      categoryName:categories[12].title,
      name: 'Bike',
    },
    {
      categoryId: categories[12].id,
      categoryName:categories[12].title,
      name: 'Rikhsha',
    },
  ]