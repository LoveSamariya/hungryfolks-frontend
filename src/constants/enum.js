export const filtersEnum = Object.freeze({
  Vegetarian: 'Vegetarian',
  Vegan: 'Vegan',
  Glutenfree: 'Gluten free',
  Halal: 'Halal',
  Allergyfriendly: 'Allergy friendly',
});

export const loginWithEnum = Object.freeze({
  hungryFolks: 'HUNGRY_FOLKS',
  google: 'GOOGLE',
  guest: 'GUEST',
});

export const keywordTypes = Object.freeze({
  mainCategory: 'MainCategory',
  dishRecipe: 'DishRecipe',
});

export const keywordExplain = Object.freeze({
  [keywordTypes.mainCategory]: 'Explore all sub categories',
  [keywordTypes.dishRecipe]: `Let's make this dish`,
});
