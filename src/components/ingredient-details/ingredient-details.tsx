import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  const { id } = useParams<{ id: string }>();

  const ingredientData = ingredients.find((x) => x._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
