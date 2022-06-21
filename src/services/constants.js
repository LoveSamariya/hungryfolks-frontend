export const REGISTRATION = '/Registration';
export const LOGIN = '/Account/Login';
export const VERIFY_OTP = '/Registration/Confirm';
export const RESEND_OTP = '/Registration/Resend-Confirm';

export const MAIN_CATEGORY = '/MainCategory';
export const SUB_CATEGORY = '/SubCategory';
export const DISH_RECIPE = '/DishRecipe';
export const DISH_RECIPE_FROM_CODE = code => `/DishRecipe/${code}`;
export const UPDATE_RATINGS = id => `/DishRecipe/${id}/Update-Rating`;

export const INGREDIENT_MAIN_CATEGORY = '/IngredientMainCategory';
export const INGREDIENT_SUB_CATEGORY = '/IngredientSubCategory';
