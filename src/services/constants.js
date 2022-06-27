// endpoints
export const REGISTRATION = '/Registration';
export const LOGIN = '/Account/Login';
export const VERIFY_OTP = '/Registration/Confirm';
export const RESEND_OTP = '/Registration/Resend-Confirm';
export const EXTERNAL_LOGIN = '/Account/External-Login';

export const KEYWORD = '/Keyword';

export const MAIN_CATEGORY = '/MainCategory';
export const SUB_CATEGORY = '/SubCategory';
export const DISH_RECIPE = '/DishRecipe';
export const DISH_RECIPE_FROM_CODE = code => `/DishRecipe/${code}`;
export const UPDATE_RATINGS = id => `/DishRecipe/${id}/Update-Rating`;
export const GET_USER_RATINGS = id => `/DishRecipe/${id}/GetUser-Rating`;
export const INGREDIENT_MAIN_CATEGORY = '/IngredientMainCategory';
export const INGREDIENT_SUB_CATEGORY = '/IngredientSubCategory';
