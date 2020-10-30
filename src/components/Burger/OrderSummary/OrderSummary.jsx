import React from 'react';
import Aux from '../../../hoc/Aux.js';
import Button from '../../UI/Button/Button';

const orderSummary = ({ingredients, ...otherProps})=>{
    const ingredientSummary=Object.keys(ingredients)
    .map(igKey=><li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>:{ingredients[igKey]}</li>);

  return(
      <Aux>
          <h3> Your Order </h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price:{otherProps.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout?</p>
          <Button btnType='Danger' clicked={otherProps.purchaseCancelled}>CANCEL</Button>
          <Button btnType='Success' clicked={otherProps.purchaseContinued}>CONTINUE</Button>
      </Aux>
  )
}

export default orderSummary;